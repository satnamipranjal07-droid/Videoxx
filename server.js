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
 // For parsing POST requests
app.use(express.urlencoded({ extended: true }));

// Admin login check
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;

  // Simple static username/password
  if(username === "admin" && password === "1234") {
    // Redirect to admin page
    res.redirect("/admin");
  } else {
    res.send("❌ Invalid username or password");
  }
});
