const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Static folder serve karo (HTML, CSS, JS sab root me hain)
app.use(express.static(path.join(__dirname)));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"));
});

// Fallback (agar koi galat URL likhe to index dikhado)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});