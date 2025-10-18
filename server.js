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
// Admin page
app.get("/admin", (req, res) => {
    if(req.session.authenticated) {
        res.sendFile(path.join(__dirname, "admin.html"));
    } else {
        res.redirect("/"); // not logged in → go to home
    }
});

// Upload page
app.get("/upload", (req, res) => {
    if(req.session.authenticated) {
        res.sendFile(path.join(__dirname, "upload.html"));
    } else {
        res.redirect("/"); // not logged in → go to home
    }
});

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Handle file upload
app.post("/upload-file", (req, res) => {
    if(!req.session.authenticated) return res.send("❌ Not authorized");
    upload.single("file")(req, res, function(err) {
        if(err) return res.send("❌ Upload error");
        if(!req.file) return res.send("❌ No file uploaded");
        res.send("✅ File uploaded: " + req.file.filename);
    });
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

// Fallback
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));


---

3️⃣ Admin form (HTML) reminder

<form action="/admin-login" method="POST">
    <h2>Admin Login</h2>
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Login</button>
</form>


