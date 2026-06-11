#!/bin/bash
# ============================================================================
# COMPREHENSIVE API TEST SUITE — MAA Saraswati Veterinary Hospital Backend
# ============================================================================

BASE="http://localhost:5000"
PASS=0
FAIL=0
TOKEN=""

# Colours
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

assert_status() {
  local test_name="$1"
  local expected="$2"
  local actual="$3"
  if [ "$actual" -eq "$expected" ]; then
    echo -e "  ${GREEN}✅ PASS${NC} — $test_name (HTTP $actual)"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}❌ FAIL${NC} — $test_name (expected $expected, got $actual)"
    FAIL=$((FAIL + 1))
  fi
}

assert_json_field() {
  local test_name="$1"
  local body="$2"
  local field="$3"
  if echo "$body" | grep -q "\"$field\""; then
    echo -e "  ${GREEN}✅ PASS${NC} — $test_name (field '$field' present)"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}❌ FAIL${NC} — $test_name (field '$field' MISSING)"
    FAIL=$((FAIL + 1))
  fi
}

# ============================================================================
echo -e "\n${CYAN}══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  MAA Backend — Complete API Test Suite${NC}"
echo -e "${CYAN}══════════════════════════════════════════════════════════════${NC}\n"

# ── 1. HEALTH CHECK ──────────────────────────────────────────────────────────
echo -e "${YELLOW}▸ 1. HEALTH CHECK${NC}"
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/health")
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "GET /api/health" 200 "$STATUS"
assert_json_field "Health response has 'status'" "$BODY" "status"

# ── 2. AUTH — LOGIN ──────────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 2. AUTHENTICATION${NC}"

# 2a. Login with WRONG credentials
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"wrong@wrong.com","password":"wrong"}')
STATUS=$(echo "$RESP" | tail -1)
assert_status "POST /api/auth/login — wrong creds → 401" 401 "$STATUS"

# 2b. Login with MISSING fields
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@maa.com"}')
STATUS=$(echo "$RESP" | tail -1)
assert_status "POST /api/auth/login — missing password → 400" 400 "$STATUS"

# 2c. Login with CORRECT credentials
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@maa.com","password":"admin123"}')
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "POST /api/auth/login — correct creds → 200" 200 "$STATUS"
assert_json_field "Login returns 'token'" "$BODY" "token"
TOKEN=$(echo "$BODY" | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "  ${RED}❌ FATAL: Could not extract JWT. Aborting protected tests.${NC}"
  exit 1
fi
echo -e "  ${GREEN}🔑 JWT acquired (${#TOKEN} chars)${NC}"

# 2d. Logout
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/auth/logout")
STATUS=$(echo "$RESP" | tail -1)
assert_status "POST /api/auth/logout → 200" 200 "$STATUS"

# ── 3. ADMIN STATS ───────────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 3. ADMIN DASHBOARD${NC}"

# 3a. Without auth → 401
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/admin/stats")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/admin/stats — no auth → 401" 401 "$STATUS"

# 3b. With auth → 200
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/admin/stats" \
  -H "Authorization: Bearer $TOKEN")
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "GET /api/admin/stats — with auth → 200" 200 "$STATUS"
assert_json_field "Stats has 'photos'" "$BODY" "photos"
assert_json_field "Stats has 'videos'" "$BODY" "videos"
assert_json_field "Stats has 'team'" "$BODY" "team"
assert_json_field "Stats has 'csr'" "$BODY" "csr"

# ── 4. GALLERY PHOTOS ───────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 4. GALLERY PHOTOS${NC}"

# 4a. GET photos (public)
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/gallery/photos")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/gallery/photos — public → 200" 200 "$STATUS"

# 4b. POST photo without auth → 401
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/gallery/photos" \
  -F "caption=test")
STATUS=$(echo "$RESP" | tail -1)
assert_status "POST /api/gallery/photos — no auth → 401" 401 "$STATUS"

# 4c. POST photo with auth (create a tiny test image)
dd if=/dev/zero bs=1 count=100 2>/dev/null | convert -size 10x10 xc:red /tmp/test_photo.jpg 2>/dev/null || \
  printf '\xFF\xD8\xFF\xE0' > /tmp/test_photo.jpg  # minimal JPEG header fallback
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/gallery/photos" \
  -H "Authorization: Bearer $TOKEN" \
  -F "image=@/tmp/test_photo.jpg;type=image/jpeg" \
  -F "caption=Test Photo" \
  -F "category=general")
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "POST /api/gallery/photos — upload → 201" 201 "$STATUS"
PHOTO_ID=$(echo "$BODY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
echo -e "  📸 Created photo ID: $PHOTO_ID"

# 4d. DELETE photo
if [ -n "$PHOTO_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE/api/gallery/photos/$PHOTO_ID" \
    -H "Authorization: Bearer $TOKEN")
  STATUS=$(echo "$RESP" | tail -1)
  assert_status "DELETE /api/gallery/photos/$PHOTO_ID → 200" 200 "$STATUS"
fi

# ── 5. GALLERY VIDEOS ───────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 5. GALLERY VIDEOS${NC}"

RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/gallery/videos")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/gallery/videos — public → 200" 200 "$STATUS"

# ── 6. TEAM MEMBERS ─────────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 6. TEAM MEMBERS${NC}"

# 6a. GET (public)
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/team")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/team — public → 200" 200 "$STATUS"

# 6b. POST team member
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/team" \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Dr. Test Vet" \
  -F "designation=Surgeon" \
  -F "qualification=BVSc & AH")
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "POST /api/team — create → 201" 201 "$STATUS"
TEAM_ID=$(echo "$BODY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
echo -e "  👤 Created team member ID: $TEAM_ID"

# 6c. PUT team member
if [ -n "$TEAM_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/team/$TEAM_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -F "name=Dr. Updated Vet" \
    -F "designation=Chief Surgeon")
  STATUS=$(echo "$RESP" | tail -1)
  BODY=$(echo "$RESP" | sed '$d')
  assert_status "PUT /api/team/$TEAM_ID — update → 200" 200 "$STATUS"
  assert_json_field "Updated name present" "$BODY" "Dr. Updated Vet"
fi

# 6d. DELETE team member
if [ -n "$TEAM_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE/api/team/$TEAM_ID" \
    -H "Authorization: Bearer $TOKEN")
  STATUS=$(echo "$RESP" | tail -1)
  assert_status "DELETE /api/team/$TEAM_ID → 200" 200 "$STATUS"
fi

# ── 7. CSR ACTIVITIES ────────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 7. CSR ACTIVITIES${NC}"

# 7a. GET (public)
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/csr")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/csr — public → 200" 200 "$STATUS"

# 7b. POST CSR activity
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/csr" \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Free Vaccination Camp" \
  -F "description=Free rabies vaccination for stray dogs" \
  -F "date=2026-06-01")
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "POST /api/csr — create → 201" 201 "$STATUS"
CSR_ID=$(echo "$BODY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
echo -e "  🎗️  Created CSR activity ID: $CSR_ID"

# 7c. GET single CSR
if [ -n "$CSR_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/csr/$CSR_ID")
  STATUS=$(echo "$RESP" | tail -1)
  assert_status "GET /api/csr/$CSR_ID — single → 200" 200 "$STATUS"
fi

# 7d. PUT CSR
if [ -n "$CSR_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/csr/$CSR_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -F "title=Updated Vaccination Camp")
  STATUS=$(echo "$RESP" | tail -1)
  assert_status "PUT /api/csr/$CSR_ID — update → 200" 200 "$STATUS"
fi

# 7e. DELETE CSR
if [ -n "$CSR_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE/api/csr/$CSR_ID" \
    -H "Authorization: Bearer $TOKEN")
  STATUS=$(echo "$RESP" | tail -1)
  assert_status "DELETE /api/csr/$CSR_ID → 200" 200 "$STATUS"
fi

# ── 8. PAGE CONTENT ──────────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 8. PAGE CONTENT${NC}"

# 8a. GET all content (public)
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/content")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/content — all content → 200" 200 "$STATUS"

# 8b. GET content for a specific page
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/content/home")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/content/home — page content → 200" 200 "$STATUS"

# 8c. PUT content (upsert single block)
RESP=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/content/home" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"block_key":"hero_title","content_en":"Welcome to MAA Hospital","content_te":"MAA ఆసుపత్రికి స్వాగతం"}')
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "PUT /api/content/home — upsert block → 200" 200 "$STATUS"
assert_json_field "Content has 'content_en'" "$BODY" "content_en"

# 8d. PUT content without block_key → 400
RESP=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/content/home" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content_en":"No block key"}')
STATUS=$(echo "$RESP" | tail -1)
assert_status "PUT /api/content/home — missing block_key → 400" 400 "$STATUS"

# 8e. PUT batch
RESP=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/content/home/batch" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"blocks":[{"block_key":"subtitle","content_en":"Caring for animals"},{"block_key":"cta","content_en":"Donate Now"}]}')
STATUS=$(echo "$RESP" | tail -1)
assert_status "PUT /api/content/home/batch — batch upsert → 200" 200 "$STATUS"

# ── 9. CONTACT FORM ─────────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 9. CONTACT FORM${NC}"

# 9a. Valid contact submission
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"9876543210","subject":"Inquiry","message":"This is a test message for the MAA hospital contact form."}')
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "POST /api/contact — valid submission → 200" 200 "$STATUS"
assert_json_field "Contact returns 'success'" "$BODY" "success"

# 9b. Missing fields
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User"}')
STATUS=$(echo "$RESP" | tail -1)
assert_status "POST /api/contact — missing fields → 400" 400 "$STATUS"

# 9c. Invalid email
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"not-an-email","subject":"Test","message":"This is a test message for validation."}')
STATUS=$(echo "$RESP" | tail -1)
assert_status "POST /api/contact — invalid email → 400" 400 "$STATUS"

# 9d. Short message
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"a@b.com","subject":"Test","message":"Hi"}')
STATUS=$(echo "$RESP" | tail -1)
assert_status "POST /api/contact — short message → 400" 400 "$STATUS"

# ── 10. FACILITIES ───────────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 10. FACILITIES${NC}"

# 10a. GET (public)
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/facilities")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/facilities — public → 200" 200 "$STATUS"

# 10b. POST facility
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/facilities" \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=X-Ray Machine" \
  -F "description=Digital X-Ray for veterinary diagnostics" \
  -F "category=general")
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "POST /api/facilities — create → 201" 201 "$STATUS"
FAC_ID=$(echo "$BODY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
echo -e "  🏥 Created facility ID: $FAC_ID"

# 10c. PUT facility
if [ -n "$FAC_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/facilities/$FAC_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -F "title=Digital X-Ray Machine" \
    -F "category=cattle")
  STATUS=$(echo "$RESP" | tail -1)
  assert_status "PUT /api/facilities/$FAC_ID — update → 200" 200 "$STATUS"
fi

# 10d. GET with category filter
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/facilities?category=cattle")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/facilities?category=cattle — filter → 200" 200 "$STATUS"

# 10e. DELETE facility
if [ -n "$FAC_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE/api/facilities/$FAC_ID" \
    -H "Authorization: Bearer $TOKEN")
  STATUS=$(echo "$RESP" | tail -1)
  assert_status "DELETE /api/facilities/$FAC_ID → 200" 200 "$STATUS"
fi

# ── 11. SPONSORS ─────────────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 11. SPONSORS${NC}"

# 11a. GET (public)
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/sponsors")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/sponsors — public → 200" 200 "$STATUS"

# 11b. POST sponsor
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/sponsors" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Ambulance Van","cost":"₹8,00,000","status":"Needed","description":"Emergency animal ambulance"}')
STATUS=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
assert_status "POST /api/sponsors — create → 201" 201 "$STATUS"
SPON_ID=$(echo "$BODY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
echo -e "  💰 Created sponsor need ID: $SPON_ID"

# 11c. PUT sponsor
if [ -n "$SPON_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/sponsors/$SPON_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"status":"Funded"}')
  STATUS=$(echo "$RESP" | tail -1)
  assert_status "PUT /api/sponsors/$SPON_ID — update → 200" 200 "$STATUS"
fi

# 11d. DELETE sponsor
if [ -n "$SPON_ID" ]; then
  RESP=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE/api/sponsors/$SPON_ID" \
    -H "Authorization: Bearer $TOKEN")
  STATUS=$(echo "$RESP" | tail -1)
  assert_status "DELETE /api/sponsors/$SPON_ID → 200" 200 "$STATUS"
fi

# ── 12. EDGE CASES ──────────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 12. EDGE CASES${NC}"

# 12a. 404 on non-existent resource
RESP=$(curl -s -w "\n%{http_code}" "$BASE/api/csr/99999")
STATUS=$(echo "$RESP" | tail -1)
assert_status "GET /api/csr/99999 — not found → 404" 404 "$STATUS"

RESP=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE/api/team/99999" \
  -H "Authorization: Bearer $TOKEN")
STATUS=$(echo "$RESP" | tail -1)
assert_status "DELETE /api/team/99999 — not found → 404" 404 "$STATUS"

RESP=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/facilities/99999" \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=nope")
STATUS=$(echo "$RESP" | tail -1)
assert_status "PUT /api/facilities/99999 — not found → 404" 404 "$STATUS"

RESP=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE/api/sponsors/99999" \
  -H "Authorization: Bearer $TOKEN")
STATUS=$(echo "$RESP" | tail -1)
assert_status "DELETE /api/sponsors/99999 — not found → 404" 404 "$STATUS"

# ── 13. FRONTEND CHECK ──────────────────────────────────────────────────────
echo -e "\n${YELLOW}▸ 13. FRONTEND AVAILABILITY${NC}"
RESP=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173)
assert_status "GET http://localhost:5173 — frontend → 200" 200 "$RESP"

# ============================================================================
# SUMMARY
# ============================================================================
TOTAL=$((PASS + FAIL))
echo -e "\n${CYAN}══════════════════════════════════════════════════════════════${NC}"
if [ "$FAIL" -eq 0 ]; then
  echo -e "${GREEN}  ✅ ALL $TOTAL TESTS PASSED ($PASS/$TOTAL)${NC}"
else
  echo -e "${RED}  ⚠️  $FAIL FAILED out of $TOTAL tests ($PASS passed)${NC}"
fi
echo -e "${CYAN}══════════════════════════════════════════════════════════════${NC}\n"

# Cleanup test data from page_content
curl -s -X PUT "$BASE/api/content/home" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"block_key":"hero_title","content_en":"","content_te":""}' > /dev/null 2>&1

rm -f /tmp/test_photo.jpg

exit $FAIL
