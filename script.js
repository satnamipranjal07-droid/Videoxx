document.addEventListener('DOMContentLoaded', () => {
  // Admin panel show/hide based on isAdmin
  const isAdmin = false; // change to true to show admin button
  const adminBtn = document.querySelector('.admin-btn');

  if (isAdmin) {
    adminBtn.style.display = 'inline-block';
  } else {
    adminBtn.style.display = 'none';
  }

  // Bottom nav button active toggle
  const navButtons = document.querySelectorAll('.nav-button');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});const isAdmin = true; // set true to show
const adminBtn = document.querySelector('.admin-btn');

if(isAdmin){
  adminBtn.style.display = 'inline-block';
} else {
  adminBtn.style.display = 'none';
}
// Example navigation logic
document.querySelector('.upload-btn').addEventListener('click', () => {
  window.location.href = 'upload.html';
});

document.querySelector('.manage-btn').addEventListener('click', () => {
  window.location.href = 'manage.html';
});
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('adminLoginForm');

  loginForm.addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === "pranjalx" && password === "8761"){
      alert("Login Successful!");

      // Show buttons (optional)
      document.querySelectorAll('.upload-btn, .manage-btn, .logout-btn')
              .forEach(btn => btn.style.display = 'block');

      // Hide login form
      loginForm.style.display = 'none';

      // Redirect to upload.html
      window.location.href = "upload.html";
    } else {
      alert("Invalid Username or Password!");
    }
  });

  // Button click redirects
  document.querySelector('.upload-btn').addEventListener('click', () => {
    window.location.href = 'upload.html';
  });

  document.querySelector('.manage-btn').addEventListener('click', () => {
    window.location.href = 'manage.html';
  });
});
document.getElementById('adminLoginForm').addEventListener('submit', function(e){
  e.preventDefault(); // page reload prevent

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if(username === "pranjalx" && password === "8761"){
    alert("Login Successful!");           // 🔹 Alert dikhega
    window.location.href = "upload.html"; // 🔹 Redirect karega
  } else {
    alert("Invalid Username or Password!");
  }
});