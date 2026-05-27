// src/data/mockData.js
// Mock data for development — will be replaced by API calls

export const SITE_CONFIG = {
  name: 'MAA Saraswati Veterinary Hospital',
  shortName: 'MAA Vet Hospital',
  phone: '[UPDATE WITH REAL DETAILS]',
  emergencyPhone: '[UPDATE WITH REAL DETAILS]',
  email: 'info@maasaraswativethospital.org',
  address: '[UPDATE WITH REAL DETAILS], Hyderabad, Telangana, India',
  mapUrl: 'https://share.google/vebYxs9s8ZWRaMA8q',
  establishedDate: 'July 2024',
  socialLinks: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
    whatsapp: 'https://wa.me/91XXXXXXXXXX',
  },
}

export const STATS = [
  { id: 'animals-treated', value: 5000, suffix: '+', labelKey: 'home.stats.animalsTreated' },
  { id: 'doctors',         value: 15,   suffix: '+', labelKey: 'home.stats.doctors' },
  { id: 'coverage',        value: 100,  suffix: 'km', labelKey: 'home.stats.coverage' },
  { id: 'cost',            value: 0,    prefix: '₹',  labelKey: 'home.stats.cost' },
]

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Dr. [UPDATE NAME]',
    designation: 'Chief Veterinary Surgeon',
    qualification: 'BVSc & AH, MVSc',
    photo: null,
    displayOrder: 1,
  },
  {
    id: 2,
    name: 'Dr. [UPDATE NAME]',
    designation: 'Senior Veterinarian',
    qualification: 'BVSc & AH',
    photo: null,
    displayOrder: 2,
  },
  {
    id: 3,
    name: '[UPDATE NAME]',
    designation: 'Veterinary Technician',
    qualification: 'Diploma in Veterinary Science',
    photo: null,
    displayOrder: 3,
  },
  {
    id: 4,
    name: '[UPDATE NAME]',
    designation: 'Hospital Administrator',
    qualification: 'MBA Healthcare',
    photo: null,
    displayOrder: 4,
  },
]

export const GALLERY_PHOTOS = [
  { id: 1,  src: null, category: 'general',   caption: 'Hospital entrance and reception area' },
  { id: 2,  src: null, category: 'surgery',   caption: 'Surgery in progress — orthopaedic procedure' },
  { id: 3,  src: null, category: 'ambulance', caption: 'Our ambulance on an emergency rescue mission' },
  { id: 4,  src: null, category: 'wards',     caption: 'Post-operative care ward' },
  { id: 5,  src: null, category: 'general',   caption: 'Our dedicated veterinary team' },
  { id: 6,  src: null, category: 'surgery',   caption: 'Laboratory diagnostic equipment' },
  { id: 7,  src: null, category: 'csr',       caption: 'Animal health camp in rural village' },
  { id: 8,  src: null, category: 'general',   caption: 'Cattle examination and treatment' },
  { id: 9,  src: null, category: 'wards',     caption: 'ICU monitoring system' },
  { id: 10, src: null, category: 'csr',       caption: 'Free vaccination drive' },
  { id: 11, src: null, category: 'ambulance', caption: 'Ambulance equipped with medical supplies' },
  { id: 12, src: null, category: 'surgery',   caption: 'Modern operation theatre' },
]

export const GALLERY_VIDEOS = [
  { id: 1, url: null, title: 'Hospital Tour — MAA Saraswati Veterinary Hospital' },
  { id: 2, url: null, title: 'Day in the Life of a Veterinarian at MAA' },
]

export const CSR_ACTIVITIES = [
  {
    id: 1,
    title: 'Free Vaccination Camp — Rangareddy District',
    date: '2025-04-15',
    description: 'Organised a free vaccination camp in Rangareddy district, vaccinating over 500 cattle and 200 dogs against rabies and foot-and-mouth disease.',
    images: [],
  },
  {
    id: 2,
    title: 'Rural Animal Health Awareness Programme',
    date: '2025-03-10',
    description: 'Conducted awareness sessions in 5 villages on animal nutrition, disease prevention, and when to seek veterinary care.',
    images: [],
  },
  {
    id: 3,
    title: 'Emergency Flood Rescue — Medchal',
    date: '2024-11-22',
    description: 'Our ambulance team rescued 30 stranded animals during the Medchal floods, providing emergency first aid and shelter.',
    images: [],
  },
  {
    id: 4,
    title: 'Free Deworming Drive — Hyderabad Slums',
    date: '2024-09-05',
    description: 'Dewormed over 300 stray dogs across 10 slum areas in Hyderabad in collaboration with local animal welfare groups.',
    images: [],
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
    description: 'Antibiotics, anti-inflammatory drugs, vitamins, and wound care supplies for a month.',
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
  accountName: '[UPDATE WITH REAL DETAILS]',
  bankName: '[UPDATE WITH REAL DETAILS]',
  branch: '[UPDATE WITH REAL DETAILS]',
  accountNo: '[UPDATE WITH REAL DETAILS]',
  ifsc: '[UPDATE WITH REAL DETAILS]',
}
