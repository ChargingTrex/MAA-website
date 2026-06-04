/**
 * Seed script — run with: node scripts/seed.js
 *
 * Creates:
 *  - Default admin account (admin@maa.com / admin123)
 *  - Default page_content rows for all translatable sections
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const { sequelize, Admin, PageContent } = require('../models');

const defaultContent = [
  // HOME PAGE
  { page_key: 'home', block_key: 'hero_heading', content_en: 'Compassionate Care for Every Animal', content_te: 'ప్రతి జంతువుకు కరుణతో కూడిన సేవ', content_hi: 'हर जानवर के लिए करुणामय देखभाल', content_ta: 'ஒவ்வொரு விலங்குக்கும் இரக்கமான பராமரிப்பு' },
  { page_key: 'home', block_key: 'hero_subheading', content_en: 'Free veterinary services for rural and tribal communities', content_te: 'గ్రామీణ మరియు గిరిజన సముదాయాలకు ఉచిత పశు వైద్య సేవలు', content_hi: 'ग्रामीण और आदिवासी समुदायों के लिए निःशुल्क पशु चिकित्सा सेवाएं', content_ta: 'கிராமப்புற மற்றும் பழங்குடி சமூகங்களுக்கு இலவச கால்நடை சேவைகள்' },
  { page_key: 'home', block_key: 'mission_text', content_en: 'To provide compassionate, professional, and free veterinary care to animals belonging to underprivileged communities, regardless of the owner\'s ability to pay.', content_te: 'సేవ చెల్లించే సామర్థ్యతో సంబంధం లేకుండా అట్టడుగు వర్గాలకు చెందిన జంతువులకు కరుణతో, వృత్తిపరంగా మరియు ఉచితంగా పశు వైద్య సేవలు అందించడం.', content_hi: 'मालिक की भुगतान क्षमता की परवाह किए बिना वंचित समुदायों के जानवरों को दयालु, पेशेवर और निःशुल्क पशु चिकित्सा देखभाल प्रदान करना।', content_ta: 'உரிமையாளரின் செலுத்தும் திறன் பொருட்படுத்தாமல், பின்தங்கிய சமூகங்களைச் சேர்ந்த விலங்குகளுக்கு இரக்கமான, தொழில்முறை மற்றும் இலவச கால்நடை பராமரிப்பை வழங்குதல்.' },
  { page_key: 'home', block_key: 'vision_text', content_en: 'A world where every animal, regardless of its owner\'s economic background, has access to modern, compassionate veterinary care.', content_te: 'యజమాని యొక్క ఆర్థిక నేపథ్యంతో సంబంధం లేకుండా ప్రతి జంతువు ఆధునిక, కరుణతో కూడిన పశు వైద్య సేవలను పొందగలిగే ప్రపంచం.', content_hi: 'एक ऐसी दुनिया जहां हर जानवर, चाहे उसके मालिक की आर्थिक पृष्ठभूमि कुछ भी हो, आधुनिक और करुणामय पशु चिकित्सा देखभाल तक पहुंच सके।', content_ta: 'உரிமையாளரின் பொருளாதார பின்னணி பொருட்படுத்தாமல், ஒவ்வொரு விலங்கும் நவீன, இரக்கமான கால்நடை பராமரிப்பை அணுகக்கூடிய உலகம்.' },

  // ABOUT PAGE
  { page_key: 'about', block_key: 'story_paragraph_1', content_en: 'MAA Saraswati Veterinary Hospital was inaugurated in July 2024 with a mission to provide free, high-quality veterinary care to animals in rural and tribal communities across Telangana and beyond.', content_te: '', content_hi: '', content_ta: '' },
  { page_key: 'about', block_key: 'story_paragraph_2', content_en: 'Our facility is equipped with a modern operation theatre, fully-functional laboratory, ICU/observation wards, and a 24/7 ambulance service that covers the twin cities and up to 100 km from Hyderabad.', content_te: '', content_hi: '', content_ta: '' },

  // CONTACT PAGE
  { page_key: 'contact', block_key: 'address', content_en: 'MAA Saraswati Veterinary Hospital, Hyderabad, Telangana, India', content_te: 'MAA సరస్వతి పశు వైద్యశాల, హైదరాబాద్, తెలంగాణ, భారతదేశం', content_hi: 'MAA सरस्वती पशु चिकित्सालय, हैदराबाद, तेलंगाना, भारत', content_ta: 'MAA சரஸ்வதி கால்நடை மருத்துவமனை, ஹைதராபாத், தெலங்கானா, இந்தியா' },
  { page_key: 'contact', block_key: 'phone', content_en: '+91 99999 99999', content_te: '+91 99999 99999', content_hi: '+91 99999 99999', content_ta: '+91 99999 99999' },
  { page_key: 'contact', block_key: 'email', content_en: 'info@maasaraswativet.com', content_te: 'info@maasaraswativet.com', content_hi: 'info@maasaraswativet.com', content_ta: 'info@maasaraswativet.com' },
];

const seed = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Database synced');

    // Admin
    const adminCount = await Admin.count();
    if (adminCount === 0) {
      const hashed = await bcrypt.hash('admin123', 12);
      await Admin.create({ email: 'admin@maa.com', password: hashed });
      console.log('🌱 Admin seeded: admin@maa.com / admin123');
    } else {
      console.log('ℹ️  Admin already exists, skipping.');
    }

    // Page content
    for (const block of defaultContent) {
      const [, created] = await PageContent.findOrCreate({
        where: { page_key: block.page_key, block_key: block.block_key },
        defaults: block,
      });
      if (created) console.log(`  + Created content block: [${block.page_key}] ${block.block_key}`);
    }

    console.log('✅ Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seed();
