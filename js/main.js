/* ================= ثبت نام ================= */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("همه فیلدها الزامی هستند");
      return;
    }

    const adminEmails = ["admin@gmail.com"];
    const role = adminEmails.includes(email) ? "admin" : "customer";

    const user = { email, password, role };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "dashboard.html";
  });
}

/* ================= ورود ================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("کاربری ثبت نشده");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("ایمیل یا رمز عبور اشتباه است");
    }
  });
}

/* ================= خروج ================= */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "login.html";
  });
}

