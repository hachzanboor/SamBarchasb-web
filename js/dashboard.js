import {
  findBestGear,
  calculateGap,
  calculateMaterialWidth,
  calculateLabelCount
} from "./pricing.js";

/* ========= چک لاگین ========= */
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html";
}

/* ========= نمایش اطلاعات کاربر ========= */
const adminPanel = document.getElementById("adminPanel");
const customerPanel = document.getElementById("customerPanel");
const userEmail = document.getElementById("userEmail");
const userRole = document.getElementById("userRole");

adminPanel.style.display = "none";
customerPanel.style.display = "none";

userEmail.textContent = `ایمیل: ${user.email}`;
userRole.textContent = `نقش: ${user.role}`;

/* ========= پنل مشتری ========= */
if (user.role === "customer") {
  customerPanel.style.display = "block";

  const orderForm = document.getElementById("orderForm");

  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const length = Number(document.getElementById("length").value);
    const height = Number(document.getElementById("height").value);
    const stretch = Number(document.getElementById("stretchCount").value);
    const widthCount = Number(document.getElementById("widthCount").value);

    const bestGear = findBestGear(length, stretch);
    const gap = calculateGap(bestGear.gear, stretch, length);
    const materialWidth = calculateMaterialWidth(height, widthCount);
    const labelCount = calculateLabelCount(
      bestGear.gear,
      materialWidth,
      stretch,
      widthCount
    );

    document.getElementById("orderResult").innerHTML = `
      <p>دنده: ${bestGear.gear}</p>
      <p>گپ: ${gap.toFixed(2)} میلی‌متر</p>
      <p>عرض متریال: ${materialWidth.toFixed(1)} سانت</p>
      <p>تعداد لیبل: ${Math.floor(labelCount)}</p>
    `;

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({
      length,
      height,
      gear: bestGear.gear,
      materialWidth,
      gap
    });

    localStorage.setItem("orders", JSON.stringify(orders));
  });
}

/* ========= پنل ادمین ========= */
if (user.role === "admin") {
  adminPanel.style.display = "block";

  const ordersTable = document.getElementById("ordersTable");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.forEach(o => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${o.length}</td>
      <td>${o.height}</td>
      <td>${o.gear}</td>
      <td>${o.materialWidth}</td>
      <td>${o.gap.toFixed(2)}</td>
    `;
    ordersTable.appendChild(tr);
  });
}


