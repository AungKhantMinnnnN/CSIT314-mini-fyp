const express = require('express');

const app = express();

// Middleware injection
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

// Database connection


// API endpoints initialization



// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    req.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

// App config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});

module.exports = app;