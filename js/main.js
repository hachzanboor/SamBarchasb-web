const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("کاربری ثبت نشده");
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("ایمیل یا رمز عبور اشتباه است");
    }
  });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("همه فیلدها الزامی هستند");
      return;
    }

    const user = {
      email: email,
      password: password
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("ثبت نام موفق");
    window.location.href = "login.html";
  });
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });
}
