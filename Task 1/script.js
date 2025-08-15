const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
  mainContent.classList.toggle("closed");
});
