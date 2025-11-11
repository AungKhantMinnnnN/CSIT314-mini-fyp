const cors = require("cors");
const express = require('express');
const supabase = require('./src/config/supabase_client');
const authBoundary = require('./src/boundaries/auth/auth.boundary');
const userBoundary = require('./src/boundaries/useradmin/user.boundary');
const platformBoundary = require('./src/boundaries/platform_mgmt/platform.boundary');

const requestBoundary = require('./src/boundaries/csr_pin/request.boundary');
const shortlistBoundary = require('./src/boundaries/csr_pin/request.shortlist.boundary');
const completedRequestBoundary = require('./src/boundaries/csr_pin/request.completed.boundary');

require('dotenv').config();

const app = express();

// Middleware injection
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors({ origin: "https://your-frontend.vercel.app" }));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Routes (Boundaries)
app.use('/api/auth', authBoundary);
app.use('/api/user', userBoundary);
app.use('/api/request', requestBoundary);
app.use('/api/platform', platformBoundary);
app.use('/api/shortlist', shortlistBoundary);
app.use('/api/completedRequest', completedRequestBoundary);

// api health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    req.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

const checkSupabaseConnection = async () => {
    try {
        const { data, error } = await supabase.auth.getSession();
        console.log('✅ Supabase connection successful');
        console.log(`📍 Supabase URL: ${process.env.SUPABASE_URL}`);
    } catch (error) {
        console.error('❌ Supabase connection failed:', error.message);
    }
};


// App config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
    checkSupabaseConnection();
});

module.exports = app;