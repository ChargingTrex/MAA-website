// src/lib/data.js
// Site-wide constants and mock data — will be replaced by API calls in production

export const SITE_CONFIG = {
  name: 'MAA Saraswati Veterinary Hospital',
  shortName: 'MAA',
  tagline: 'Free Veterinary Care',
  phone: '+91 XXX XXX XXXX',
  emergencyPhone: '+91 XXX XXX XXXX',
  email: 'info@maasaraswativethospital.org',
  address: 'Hyderabad, Telangana, India',
  mapUrl: 'https://share.google/vebYxs9s8ZWRaMA8q',
  establishedDate: 'July 2024',
  upiId: 'maa@upi',
  socialLinks: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
    whatsapp: 'https://wa.me/91XXXXXXXXXX',
  },
}

export const STATS = [
  { id: 'animals-treated', value: 5000, suffix: '+', label: 'Animals Treated' },
  { id: 'doctors',         value: 15,   suffix: '+', label: 'Doctors & Staff' },
  { id: 'coverage',        value: 100,  suffix: 'km', label: 'Coverage Radius' },
  { id: 'cost',            value: 0,    prefix: '₹',  label: 'Cost to Owners' },
]

export const SERVICES = [
  {
    id: 'cattle',
    icon: '🐄',
    title: 'Cattle & Livestock',
    description: 'Complete care for cattle, buffaloes, sheep, and goats — from routine checks to emergency treatment.',
  },
  {
    id: 'dogs',
    icon: '🐕',
    title: 'Canine Care',
    description: 'Specialised treatment for dogs including surgery, vaccinations, and post-operative care.',
  },
  {
    id: 'poultry',
    icon: '🐔',
    title: 'Poultry & Birds',
    description: 'Expert care for poultry, backyard birds, and exotic birds with disease prevention programmes.',
  },
  {
    id: 'surgery',
    icon: '⚕️',
    title: 'Surgery',
    description: 'Advanced surgical capabilities in our modern operation theatre with full anaesthesia support.',
  },
  {
    id: 'ambulance',
    icon: '🚑',
    title: 'Ambulance Service',
    description: 'Free 24/7 emergency ambulance covering twin cities and up to 100 km from Hyderabad.',
  },
  {
    id: 'lab',
    icon: '🔬',
    title: 'Lab Diagnostics',
    description: 'On-site laboratory for blood tests, cultures, biopsies, and rapid diagnostic results.',
  },
]

export const MISSION_VISION = {
  mission: {
    title: 'Our Mission',
    description:
      'To provide compassionate, professional, and absolutely free veterinary care to every animal in need — regardless of the owner\'s financial situation — ensuring that no animal suffers due to lack of funds.',
  },
  vision: {
    title: 'Our Vision',
    description:
      'A Hyderabad where every animal has access to world-class medical care, supported by modern infrastructure, skilled professionals, and a caring community committed to animal welfare.',
  },
}

export const CSR_ACTIVITIES = [
  {
    id: 1,
    title: 'Free Vaccination Camp — Rangareddy District',
    date: '2025-04-15',
    description:
      'Organised a free vaccination camp vaccinating over 500 cattle and 200 dogs against rabies and foot-and-mouth disease.',
    category: 'Vaccination',
  },
  {
    id: 2,
    title: 'Rural Animal Health Awareness Programme',
    date: '2025-03-10',
    description:
      'Conducted awareness sessions in 5 villages on animal nutrition, disease prevention, and when to seek veterinary care.',
    category: 'Awareness',
  },
  {
    id: 3,
    title: 'Emergency Flood Rescue — Medchal',
    date: '2024-11-22',
    description:
      'Our ambulance team rescued 30 stranded animals during the Medchal floods, providing emergency first aid and shelter.',
    category: 'Rescue',
  },
]

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Dr. [Name]',
    designation: 'Chief Veterinary Surgeon',
    qualification: 'BVSc & AH, MVSc',
    photo: null,
    displayOrder: 1,
  },
  {
    id: 2,
    name: 'Dr. [Name]',
    designation: 'Senior Veterinarian',
    qualification: 'BVSc & AH',
    photo: null,
    displayOrder: 2,
  },
  {
    id: 3,
    name: '[Name]',
    designation: 'Veterinary Technician',
    qualification: 'Diploma in Veterinary Science',
    photo: null,
    displayOrder: 3,
  },
  {
    id: 4,
    name: '[Name]',
    designation: 'Hospital Administrator',
    qualification: 'MBA Healthcare',
    photo: null,
    displayOrder: 4,
  },
]

export const SPONSOR_NEEDS = [
  {
    id: 1,
    title: 'Digital X-Ray Machine',
    description: 'A digital radiography system for fast, accurate bone and soft-tissue imaging.',
    targetAmount: 500000,
    raisedAmount: 125000,
    priority: 'high',
  },
  {
    id: 2,
    title: 'Portable Ultrasound Scanner',
    description: 'For field-level pregnancy detection and abdominal diagnostics.',
    targetAmount: 300000,
    raisedAmount: 0,
    priority: 'high',
  },
  {
    id: 3,
    title: 'Autoclave (Steriliser)',
    description: 'To sterilise surgical instruments — critical for infection control.',
    targetAmount: 150000,
    raisedAmount: 90000,
    priority: 'medium',
  },
  {
    id: 4,
    title: 'Monthly Medicine Stock',
    description: 'Antibiotics, anti-inflammatory drugs, vitamins, and wound care supplies.',
    targetAmount: 50000,
    raisedAmount: 15000,
    priority: 'medium',
  },
  {
    id: 5,
    title: 'Ambulance Maintenance & Fuel',
    description: 'Monthly fuel, servicing, and maintenance costs for our ambulance.',
    targetAmount: 25000,
    raisedAmount: 5000,
    priority: 'low',
  },
]

export const BANK_DETAILS = {
  accountName: '[Update with real details]',
  bankName: '[Update with real details]',
  branch: '[Update with real details]',
  accountNo: '[Update with real details]',
  ifsc: '[Update with real details]',
}

export const NAV_LINKS = [
  { href: '/',                  label: 'Home',           key: 'home' },
  { href: '/about',             label: 'About Us',       key: 'about' },
  { href: '/infrastructure',    label: 'Infrastructure', key: 'infrastructure' },
  { href: '/medical-facilities',label: 'Medical',        key: 'medicalFacilities' },
  { href: '/our-team',          label: 'Our Team',       key: 'ourTeam' },
  { href: '/gallery',           label: 'Gallery',        key: 'gallery' },
  { href: '/csr-activities',    label: 'CSR',            key: 'csr' },
  { href: '/donate',            label: 'Donate',         key: 'donate' },
  { href: '/sponsor',           label: 'Sponsor',        key: 'sponsor' },
  { href: '/contact',           label: 'Contact',        key: 'contact' },
]
