const express = require("express");
const path = require("path");
const session = require("express-session");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(session({
    secret: "secretkey123",
    resave: false,
    saveUninitialized: true
}));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Admin login POST
app.post("/admin-login", (req, res) => {
    const { username, password } = req.body;
    if(username === "admin" && password === "1234") {
        req.session.authenticated = true; // mark logged in
        res.redirect("/admin");
    } else {
        res.send("❌ Invalid username or password");
    }
});

// Admin dashboard
app.get("/admin", (req, res) => {
    if(req.session.authenticated) {
        res.sendFile(path.join(__dirname, "admin.html"));
    } else {
        res.redirect("/");
    }
});

// Upload page
app.get("/upload", (req, res) => {
    if(req.session.authenticated) {
        res.sendFile(path.join(__dirname, "upload.html"));
    } else {
        res.redirect("/");
    }
});

// Upload handler
app.post("/upload-file", (req, res) => {
    if(!req.session.authenticated) return res.send("❌ Not authorized");
    upload.single("file")(req, res, function(err){
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

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
