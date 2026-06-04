const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'admins',
  createdAt: 'created_at',
  updatedAt: false,
});

const GalleryPhoto = sequelize.define('GalleryPhoto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  filename: { type: DataTypes.STRING, allowNull: false },
  filepath: { type: DataTypes.STRING(512), allowNull: false },
  caption: { type: DataTypes.STRING(500) },
  category: { type: DataTypes.ENUM('general', 'surgery', 'ambulance', 'wards', 'csr') },
}, {
  tableName: 'gallery_photos',
  createdAt: 'created_at',
  updatedAt: false,
});

const GalleryVideo = sequelize.define('GalleryVideo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  filename: { type: DataTypes.STRING, allowNull: false },
  filepath: { type: DataTypes.STRING(512), allowNull: false },
  thumbnail: { type: DataTypes.STRING(512) },
  title: { type: DataTypes.STRING },
}, {
  tableName: 'gallery_videos',
  createdAt: 'created_at',
  updatedAt: false,
});

const TeamMember = sequelize.define('TeamMember', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  designation: { type: DataTypes.STRING, allowNull: false },
  qualification: { type: DataTypes.STRING },
  photo_path: { type: DataTypes.STRING(512) },
  display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'team_members',
  createdAt: 'created_at',
  updatedAt: false,
});

const CSRActivity = sequelize.define('CSRActivity', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATEONLY },
  images: { type: DataTypes.JSON }, // SQLite stores JSON as string, Sequelize handles serialization
}, {
  tableName: 'csr_activities',
  createdAt: 'created_at',
  updatedAt: false,
});

const PageContent = sequelize.define('PageContent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  page_key: { type: DataTypes.STRING(100), allowNull: false },
  block_key: { type: DataTypes.STRING(100), allowNull: false },
  content_en: { type: DataTypes.TEXT },
  content_te: { type: DataTypes.TEXT },
  content_hi: { type: DataTypes.TEXT },
  content_ta: { type: DataTypes.TEXT },
}, {
  tableName: 'page_content',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at',
  indexes: [
    { unique: true, fields: ['page_key', 'block_key'] }
  ]
});

// Medical Facilities — admin-uploaded photo cards
const FacilityItem = sequelize.define('FacilityItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'general',
    // cattle | dogs | sheep | poultry | general
  },
  image_path: { type: DataTypes.STRING(512) },
  display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'facility_items',
  createdAt: 'created_at',
  updatedAt: false,
});

const SponsorNeed = sequelize.define('SponsorNeed', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  cost: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('Needed', 'Funded'), defaultValue: 'Needed' },
  description: { type: DataTypes.TEXT },
  display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'sponsor_needs',
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = {
  sequelize,
  Admin,
  GalleryPhoto,
  GalleryVideo,
  TeamMember,
  CSRActivity,
  PageContent,
  FacilityItem,
  SponsorNeed,
};
