require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path'); // <--- NEW IMPORT
const connectDB = require('./config/db.js');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const sermonRoutes = require('./routes/sermonRoutes'); 
const ministryRoutes = require('./routes/ministryRoutes');
const prayerRoutes = require('./routes/prayerRoutes');
const liveRoutes = require('./routes/liveRoutes'); 
const galleryRoutes = require('./routes/galleryRoutes'); 
const volunteerRoutes = require('./routes/volunteerRoutes');

const app = express();
connectDB();

app.use(express.json()); 
app.use(cors()); 
// Note: We need to relax helmet for image cross-origin resources slightly, 
// but for now default is fine.
app.use(helmet({ crossOriginResourcePolicy: false })); 
app.use(morgan('dev')); 

// --- NEW: Make the 'uploads' folder accessible to the public ---
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/sermons', sermonRoutes);
app.use('/api/ministries', ministryRoutes);
app.use('/api/prayers', prayerRoutes);
app.use('/api/live', liveRoutes); 
app.use('/api/gallery', galleryRoutes);
app.use('/api/volunteers', volunteerRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});