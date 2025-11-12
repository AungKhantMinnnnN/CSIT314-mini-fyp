const express = require("express");
const cors = require("cors");
const supabase = require("./src/config/supabase_client");

// Boundaries
const authBoundary = require("./src/boundaries/auth/auth.boundary");
const userBoundary = require("./src/boundaries/useradmin/user.boundary");
const platformBoundary = require("./src/boundaries/platform_mgmt/platform.boundary");
const requestBoundary = require("./src/boundaries/csr_pin/request.boundary");
const shortlistBoundary = require("./src/boundaries/csr_pin/request.shortlist.boundary");
const completedRequestBoundary = require("./src/boundaries/csr_pin/request.completed.boundary");

require("dotenv").config();

const app = express();

// ✅ Allowed origins for both environments
const allowedOrigins = [
  "https://csit-314-mini-fyp.vercel.app", // Production
  "http://localhost:5173",                // Local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true, // allow cookies / credentials
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API routes
app.use("/api/auth", authBoundary);
app.use("/api/user", userBoundary);
app.use("/api/request", requestBoundary);
app.use("/api/platform", platformBoundary);
app.use("/api/shortlist", shortlistBoundary);
app.use("/api/completedRequest", completedRequestBoundary);

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ✅ Supabase connectivity check
const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log("✅ Supabase connection successful");
    console.log(`📍 Supabase URL: ${process.env.SUPABASE_URL}`);
  } catch (error) {
    console.error("❌ Supabase connection failed:", error.message);
  }
};

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
  checkSupabaseConnection();
});

module.exports = app;
