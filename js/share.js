// ========= PRELOADER =========
const preloader = document.querySelector(".preloader");

window.onload = () => preloader.classList.add("hide");

// ========= NAVIGATION SIDEBAR ==========
const sidebar = document.querySelector(".navigation"),
  navLinks = sidebar.querySelectorAll(".navigation li:not(.logo, .profile)");

function activeLink() {
  navLinks.forEach((link) => link.classList.remove("hovered"));
  this.classList.add("hovered");
}

navLinks.forEach((link) => {
  link.addEventListener("mouseover", activeLink);
});

// ========= MAIN CONTENT ==========
// --------- HEADER ------------
const toggleBtns = document.querySelectorAll(".toggle"),
  dateHolder = document.querySelector(".topbar .date"),
  searchBtn = document.querySelector(".topbar .search-icon"),
  userBtn = document.querySelector(".topbar .user-icon"),
  modeBtn = document.querySelector(".mode-icon");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  { name: "January", count: 31 },
  { name: "February", count: 28 },
  { name: "March", count: 31 },
  { name: "April", count: 30 },
  { name: "May", count: 31 },
  { name: "Juin", count: 30 },
  { name: "July", count: 31 },
  { name: "August", count: 31 },
  { name: "September", count: 30 },
  { name: "October", count: 31 },
  { name: "November", count: 30 },
  { name: "December", count: 31 },
];
let today = new Date();

// Toggle Menu
toggleBtns.forEach((btn) =>
  btn.addEventListener("click", () => sidebar.classList.toggle("active"))
);

// Update Date
dateHolder.textContent = `Today is ${
  days[today.getDay()]
}, ${today.getDate()} ${months[today.getMonth()].name} ${today.getFullYear()}`;

// Show Search Box
searchBtn.addEventListener("click", function () {
  this.nextElementSibling.classList.toggle("show");
  this.classList.toggle("bx-search-alt-2");
  this.classList.toggle("bx-x-circle");
});

// Show User Navigation List
userBtn.addEventListener("click", () => userBtn.classList.toggle("show-list"));

// Toggle Dark/Light Mode
if (localStorage.mode) {
  document.body.className = localStorage.mode;
}

modeBtn.className = document.body.classList.contains("dark")
  ? "bx bx-sun mode-icon"
  : "bx bx-moon mode-icon";
modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeBtn.classList.toggle("bx-moon");
  modeBtn.classList.toggle("bx-sun");
  localStorage.setItem("mode", document.body.className);
});

// =============== LOGOUT POPUP ==========
const logoutPopup = document.querySelector(".logout-pop"),
  confirmBtn = logoutPopup.querySelector(".confirm"),
  cancelBtns = logoutPopup.querySelectorAll(".close-pop"),
  logoutBtn = document.querySelector(".logout-btn");

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logoutPopup.classList.add("show");
});
confirmBtn.addEventListener("click", () => window.close());
cancelBtns.forEach((btn) =>
  btn.addEventListener("click", () => logoutPopup.classList.remove("show"))
);
