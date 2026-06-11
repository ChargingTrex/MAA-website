require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

// ============================================================================
// SECTION 1: IMPORTS & CONFIGURATIONS
// ============================================================================

const app = express();

const JWT_SECRET = process.env.JWT_SECRET || 'INSECURE_FALLBACK_DO_NOT_USE_IN_PRODUCTION';
if (!process.env.JWT_SECRET) {
  console.error('⚠️  WARNING: JWT_SECRET not set in environment. Using insecure fallback. Set it in .env before deploying!');
}

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, please try again later.' }
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV !== 'production' && /^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, true);
    }
    const allowed = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
    if (origin === allowed) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/images/general';
    if (req.originalUrl.includes('gallery')) {
      folder = file.mimetype.startsWith('video') ? 'uploads/videos/gallery' : 'uploads/images/gallery';
    } else if (req.originalUrl.includes('team')) {
      folder = 'uploads/images/team';
    } else if (req.originalUrl.includes('csr')) {
      folder = 'uploads/images/csr';
    } else if (req.originalUrl.includes('facilities')) {
      folder = 'uploads/images/facilities';
    }
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${crypto.randomUUID()}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImages = /jpeg|jpg|png|gif|webp/;
  const allowedVideos = /mp4|webm|mov|avi/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  if (file.mimetype.startsWith('image/') && allowedImages.test(ext)) {
    return cb(null, true);
  }
  if (file.mimetype.startsWith('video/') && allowedVideos.test(ext)) {
    return cb(null, true);
  }
  cb(new Error(`Unsupported file type: ${file.originalname}`));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 }
});

// Nodemailer Configuration
const createTransporter = () => {
  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your_email@gmail.com') {
    console.warn('⚠️  SMTP not configured. Contact form emails will not be sent.');
    return null;
  }
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// ============================================================================
// SECTION 2: INLINE MIDDLEWARE
// ============================================================================

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum size is 200MB for videos and 5MB for images.' });
  }
  if (err.message && err.message.startsWith('Unsupported file type')) {
    return res.status(415).json({ error: err.message });
  }
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(422).json({
      error: 'Validation failed',
      details: err.errors?.map(e => e.message)
    });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired, please log in again' });
  }
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    error: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message || 'Internal Server Error'
  });
};

// ============================================================================
// SECTION 3: DATABASE CONNECTION INITIALIZATION
// ============================================================================

const sequelize = new Sequelize(
  process.env.DB_NAME || 'maa_hospital',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'admins', createdAt: 'created_at', updatedAt: false });

const GalleryPhoto = sequelize.define('GalleryPhoto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  filename: { type: DataTypes.STRING, allowNull: false },
  filepath: { type: DataTypes.STRING(512), allowNull: false },
  caption: { type: DataTypes.STRING(500) },
  category: { type: DataTypes.ENUM('general', 'surgery', 'ambulance', 'wards', 'csr') },
}, { tableName: 'gallery_photos', createdAt: 'created_at', updatedAt: false });

const GalleryVideo = sequelize.define('GalleryVideo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  filename: { type: DataTypes.STRING, allowNull: false },
  filepath: { type: DataTypes.STRING(512), allowNull: false },
  thumbnail: { type: DataTypes.STRING(512) },
  title: { type: DataTypes.STRING },
}, { tableName: 'gallery_videos', createdAt: 'created_at', updatedAt: false });

const TeamMember = sequelize.define('TeamMember', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  designation: { type: DataTypes.STRING, allowNull: false },
  qualification: { type: DataTypes.STRING },
  photo_path: { type: DataTypes.STRING(512) },
  display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'team_members', createdAt: 'created_at', updatedAt: false });

const CSRActivity = sequelize.define('CSRActivity', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATEONLY },
  images: { type: DataTypes.JSON },
}, { tableName: 'csr_activities', createdAt: 'created_at', updatedAt: false });

const PageContent = sequelize.define('PageContent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  page_key: { type: DataTypes.STRING(100), allowNull: false },
  block_key: { type: DataTypes.STRING(100), allowNull: false },
  content_en: { type: DataTypes.TEXT },
  content_te: { type: DataTypes.TEXT },
  content_hi: { type: DataTypes.TEXT },
  content_ta: { type: DataTypes.TEXT },
}, {
  tableName: 'page_content', timestamps: true, createdAt: false, updatedAt: 'updated_at',
  indexes: [{ unique: true, fields: ['page_key', 'block_key'] }]
});

const FacilityItem = sequelize.define('FacilityItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING(50), defaultValue: 'general' },
  image_path: { type: DataTypes.STRING(512) },
  display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'facility_items', createdAt: 'created_at', updatedAt: false });

const SponsorNeed = sequelize.define('SponsorNeed', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  cost: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('Needed', 'Funded'), defaultValue: 'Needed' },
  description: { type: DataTypes.TEXT },
  display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'sponsor_needs', createdAt: 'created_at', updatedAt: false });


// ============================================================================
// SECTION 4: INLINE API ROUTES
// ============================================================================

// ─── AUTHENTICATION ─────────────────────────────────────────────────────────
app.post('/api/auth/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    const admin = await Admin.findOne({ where: { email: email.toLowerCase().trim() } });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '8h' });
    res.cookie('adminToken', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 8 * 60 * 60 * 1000,
    });
    res.json({ token, user: { id: admin.id, email: admin.email } });
  } catch (err) { next(err); }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ message: 'Logged out successfully' });
});

// ─── ADMIN DASHBOARD ────────────────────────────────────────────────────────
app.get('/api/admin/stats', requireAuth, async (req, res, next) => {
  try {
    const [photos, videos, team, csr] = await Promise.all([
      GalleryPhoto.count(), GalleryVideo.count(), TeamMember.count(), CSRActivity.count(),
    ]);
    res.json({ photos, videos, team, csr });
  } catch (err) { next(err); }
});

// ─── GALLERY ────────────────────────────────────────────────────────────────
app.get('/api/gallery/photos', async (req, res, next) => {
  try {
    const where = req.query.category ? { category: req.query.category } : {};
    const photos = await GalleryPhoto.findAll({ where, order: [['id', 'DESC']] });
    res.json(photos);
  } catch (err) { next(err); }
});

app.post('/api/gallery/photos', requireAuth, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    const photo = await GalleryPhoto.create({
      filename: req.file.filename, filepath: `/uploads/images/gallery/${req.file.filename}`,
      caption: req.body.caption || '', category: req.body.category || 'general',
    });
    res.status(201).json(photo);
  } catch (err) { next(err); }
});

app.delete('/api/gallery/photos/:id', requireAuth, async (req, res, next) => {
  try {
    const photo = await GalleryPhoto.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    const fullPath = path.join(__dirname, photo.filepath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    await photo.destroy();
    res.json({ success: true });
  } catch (err) { next(err); }
});

app.get('/api/gallery/videos', async (req, res, next) => {
  try {
    const videos = await GalleryVideo.findAll({ order: [['id', 'DESC']] });
    res.json(videos);
  } catch (err) { next(err); }
});

app.post('/api/gallery/videos', requireAuth, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), async (req, res, next) => {
  try {
    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];
    if (!videoFile) return res.status(400).json({ error: 'No video file uploaded' });
    const video = await GalleryVideo.create({
      filename: videoFile.filename, filepath: `/uploads/videos/gallery/${videoFile.filename}`,
      thumbnail: thumbnailFile ? `/uploads/images/gallery/${thumbnailFile.filename}` : null, title: req.body.title || 'Untitled Video',
    });
    res.status(201).json(video);
  } catch (err) { next(err); }
});

app.delete('/api/gallery/videos/:id', requireAuth, async (req, res, next) => {
  try {
    const video = await GalleryVideo.findByPk(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    const videoPath = path.join(__dirname, video.filepath);
    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    if (video.thumbnail) {
      const thumbPath = path.join(__dirname, video.thumbnail);
      if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
    }
    await video.destroy();
    res.json({ success: true });
  } catch (err) { next(err); }
});

// ─── TEAM ───────────────────────────────────────────────────────────────────
app.get('/api/team', async (req, res, next) => {
  try {
    const team = await TeamMember.findAll({ order: [['display_order', 'ASC'], ['id', 'ASC']] });
    res.json(team);
  } catch (err) { next(err); }
});

app.post('/api/team', requireAuth, upload.single('photo'), async (req, res, next) => {
  try {
    const { name, designation, qualification, display_order } = req.body;
    if (!name || !designation) return res.status(400).json({ error: 'Name and designation are required' });
    let photo_path = null;
    if (req.file) photo_path = `/uploads/images/team/${req.file.filename}`;
    const member = await TeamMember.create({
      name: name.trim(), designation: designation.trim(), qualification: qualification?.trim() || null,
      photo_path, display_order: parseInt(display_order) || 0,
    });
    res.status(201).json(member);
  } catch (err) { next(err); }
});

app.put('/api/team/:id', requireAuth, upload.single('photo'), async (req, res, next) => {
  try {
    const member = await TeamMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Team member not found' });
    const { name, designation, qualification, display_order } = req.body;
    if (req.file) {
      if (member.photo_path) {
        const oldPath = path.join(__dirname, member.photo_path);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      member.photo_path = `/uploads/images/team/${req.file.filename}`;
    }
    if (name) member.name = name.trim();
    if (designation) member.designation = designation.trim();
    if (qualification !== undefined) member.qualification = qualification?.trim() || null;
    if (display_order !== undefined) member.display_order = parseInt(display_order) || 0;
    await member.save();
    res.json(member);
  } catch (err) { next(err); }
});

app.delete('/api/team/:id', requireAuth, async (req, res, next) => {
  try {
    const member = await TeamMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Team member not found' });
    if (member.photo_path) {
      const fullPath = path.join(__dirname, member.photo_path);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }
    await member.destroy();
    res.json({ success: true });
  } catch (err) { next(err); }
});

// ─── CSR ACTIVITIES ─────────────────────────────────────────────────────────
app.get('/api/csr', async (req, res, next) => {
  try {
    const activities = await CSRActivity.findAll({ order: [['date', 'DESC'], ['id', 'DESC']] });
    res.json(activities);
  } catch (err) { next(err); }
});

app.get('/api/csr/:id', async (req, res, next) => {
  try {
    const activity = await CSRActivity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  } catch (err) { next(err); }
});

app.post('/api/csr', requireAuth, upload.array('images', 5), async (req, res, next) => {
  try {
    const { title, description, date } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    let imagePaths = [];
    if (req.files && req.files.length > 0) imagePaths = req.files.map(f => `/uploads/images/csr/${f.filename}`);
    const activity = await CSRActivity.create({
      title: title.trim(), description: description?.trim() || null, date: date || null, images: imagePaths,
    });
    res.status(201).json(activity);
  } catch (err) { next(err); }
});

app.put('/api/csr/:id', requireAuth, upload.array('images', 5), async (req, res, next) => {
  try {
    const activity = await CSRActivity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    const { title, description, date } = req.body;
    if (title) activity.title = title.trim();
    if (description !== undefined) activity.description = description?.trim() || null;
    if (date !== undefined) activity.date = date || null;
    if (req.files && req.files.length > 0) {
      const newPaths = req.files.map(f => `/uploads/images/csr/${f.filename}`);
      const existingImages = Array.isArray(activity.images) ? activity.images : [];
      activity.images = [...existingImages, ...newPaths];
    }
    await activity.save();
    res.json(activity);
  } catch (err) { next(err); }
});

app.delete('/api/csr/:id', requireAuth, async (req, res, next) => {
  try {
    const activity = await CSRActivity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (Array.isArray(activity.images)) {
      activity.images.forEach(imgPath => {
        const fullPath = path.join(__dirname, imgPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      });
    }
    await activity.destroy();
    res.json({ success: true });
  } catch (err) { next(err); }
});

// ─── PAGE CONTENT ───────────────────────────────────────────────────────────
app.get('/api/content', async (req, res, next) => {
  try {
    const all = await PageContent.findAll({ order: [['page_key', 'ASC'], ['id', 'ASC']] });
    const grouped = all.reduce((acc, block) => {
      if (!acc[block.page_key]) acc[block.page_key] = [];
      acc[block.page_key].push(block);
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) { next(err); }
});

app.get('/api/content/:page', async (req, res, next) => {
  try {
    const contents = await PageContent.findAll({ where: { page_key: req.params.page }, order: [['id', 'ASC']] });
    res.json(contents);
  } catch (err) { next(err); }
});

app.put('/api/content/:page', requireAuth, async (req, res, next) => {
  try {
    const { block_key, content_en, content_te, content_hi, content_ta } = req.body;
    if (!block_key) return res.status(400).json({ error: 'block_key is required' });
    const [block, created] = await PageContent.findOrCreate({
      where: { page_key: req.params.page, block_key },
      defaults: { content_en, content_te, content_hi, content_ta },
    });
    if (!created) {
      if (content_en !== undefined) block.content_en = content_en;
      if (content_te !== undefined) block.content_te = content_te;
      if (content_hi !== undefined) block.content_hi = content_hi;
      if (content_ta !== undefined) block.content_ta = content_ta;
      await block.save();
    }
    res.json(block);
  } catch (err) { next(err); }
});

app.put('/api/content/:page/batch', requireAuth, async (req, res, next) => {
  try {
    const { blocks } = req.body;
    if (!Array.isArray(blocks) || blocks.length === 0) return res.status(400).json({ error: 'blocks array is required' });
    const results = await Promise.all(blocks.map(async ({ block_key, content_en, content_te, content_hi, content_ta }) => {
      const [block, created] = await PageContent.findOrCreate({
        where: { page_key: req.params.page, block_key },
        defaults: { content_en, content_te, content_hi, content_ta },
      });
      if (!created) {
        if (content_en !== undefined) block.content_en = content_en;
        if (content_te !== undefined) block.content_te = content_te;
        if (content_hi !== undefined) block.content_hi = content_hi;
        if (content_ta !== undefined) block.content_ta = content_ta;
        await block.save();
      }
      return block;
    }));
    res.json(results);
  } catch (err) { next(err); }
});

// ─── CONTACT ────────────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message || !subject) return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email address.' });
    if (message.length < 10) return res.status(400).json({ error: 'Message must be at least 10 characters.' });
    
    const transporter = createTransporter();
    if (!transporter) {
      console.log('📩 Contact form submission (email not sent):', { name, email, phone, subject, message });
      return res.json({ success: true, message: 'Your message has been received. We will contact you shortly.' });
    }
    
    const mailOptions = {
      from: `"MAA Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `[MAA Website] ${subject} — from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2C5F2D; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0 0;">MAA Saraswati Veterinary Hospital Website</p>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td><td style="padding: 8px 0; color: #2D2D2D;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #F4830F;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0; color: #2D2D2D;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td><td style="padding: 8px 0; color: #2D2D2D;">${subject}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;">
            <h3 style="color: #2C5F2D; margin-top: 0;">Message:</h3>
            <p style="color: #2D2D2D; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 16px;">
            Sent via the MAA Saraswati Veterinary Hospital website contact form.
          </p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log(`✉️  Contact form email sent from ${email} [${subject}]`);
    res.json({ success: true, message: 'Your message has been sent! We will get back to you soon.' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again or call us directly.' });
  }
});

// ─── FACILITIES ─────────────────────────────────────────────────────────────
app.get('/api/facilities', async (req, res, next) => {
  try {
    const where = req.query.category ? { category: req.query.category } : {};
    const items = await FacilityItem.findAll({ where, order: [['display_order', 'ASC'], ['id', 'ASC']] });
    res.json(items);
  } catch (err) { next(err); }
});

app.post('/api/facilities', requireAuth, upload.single('image'), async (req, res, next) => {
  try {
    const { title, description, category, display_order } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    let image_path = null;
    if (req.file) image_path = `/uploads/images/facilities/${req.file.filename}`;
    const item = await FacilityItem.create({
      title: title.trim(), description: description?.trim() || null, category: category || 'general',
      image_path, display_order: parseInt(display_order) || 0,
    });
    res.status(201).json(item);
  } catch (err) { next(err); }
});

app.put('/api/facilities/:id', requireAuth, upload.single('image'), async (req, res, next) => {
  try {
    const item = await FacilityItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Facility item not found' });
    const { title, description, category, display_order } = req.body;
    if (req.file) {
      if (item.image_path) {
        const old = path.join(__dirname, item.image_path);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      item.image_path = `/uploads/images/facilities/${req.file.filename}`;
    }
    if (title) item.title = title.trim();
    if (description !== undefined) item.description = description?.trim() || null;
    if (category) item.category = category;
    if (display_order !== undefined) item.display_order = parseInt(display_order) || 0;
    await item.save();
    res.json(item);
  } catch (err) { next(err); }
});

app.delete('/api/facilities/:id', requireAuth, async (req, res, next) => {
  try {
    const item = await FacilityItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Facility item not found' });
    if (item.image_path) {
      const full = path.join(__dirname, item.image_path);
      if (fs.existsSync(full)) fs.unlinkSync(full);
    }
    await item.destroy();
    res.json({ success: true });
  } catch (err) { next(err); }
});

// ─── SPONSORS ───────────────────────────────────────────────────────────────
app.get('/api/sponsors', async (req, res, next) => {
  try {
    const needs = await SponsorNeed.findAll({ order: [['display_order', 'ASC'], ['id', 'DESC']] });
    res.json(needs);
  } catch (err) { next(err); }
});

app.post('/api/sponsors', requireAuth, async (req, res, next) => {
  try {
    const { name, cost, status, description, display_order } = req.body;
    if (!name || !cost) return res.status(400).json({ error: 'Name and cost are required' });
    const need = await SponsorNeed.create({
      name: name.trim(), cost: cost.trim(), status: status || 'Needed',
      description: description?.trim() || null, display_order: parseInt(display_order) || 0,
    });
    res.status(201).json(need);
  } catch (err) { next(err); }
});

app.put('/api/sponsors/:id', requireAuth, async (req, res, next) => {
  try {
    const need = await SponsorNeed.findByPk(req.params.id);
    if (!need) return res.status(404).json({ error: 'Sponsor need not found' });
    const { name, cost, status, description, display_order } = req.body;
    if (name) need.name = name.trim();
    if (cost) need.cost = cost.trim();
    if (status) need.status = status;
    if (description !== undefined) need.description = description?.trim() || null;
    if (display_order !== undefined) need.display_order = parseInt(display_order) || 0;
    await need.save();
    res.json(need);
  } catch (err) { next(err); }
});

app.delete('/api/sponsors/:id', requireAuth, async (req, res, next) => {
  try {
    const need = await SponsorNeed.findByPk(req.params.id);
    if (!need) return res.status(404).json({ error: 'Sponsor need not found' });
    await need.destroy();
    res.json({ success: true });
  } catch (err) { next(err); }
});

// ─── HEALTH CHECK ───────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Register Error Handler as the last middleware
app.use(errorHandler);

// ============================================================================
// SECTION 5: SERVER LISTEN INITIALIZATION
// ============================================================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Database synced');

    const adminCount = await Admin.count();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await Admin.create({ email: 'admin@maa.com', password: hashedPassword });
      console.log('🌱 Default admin seeded: admin@maa.com / admin123');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
