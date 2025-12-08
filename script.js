// ------------------------------
//  MODO OSCURO (con localStorage)
// ------------------------------

const root = document.documentElement;
const btn = document.getElementById("themeToggle");
const icon = btn.querySelector("i");
const saved = localStorage.getItem("theme");

// Aplicar preferencia guardada o detectar la del sistema
if (saved) {
  if (saved === "dark") root.classList.add("dark");
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.classList.add("dark");
}

function updateIcon() {
  icon.className = root.classList.contains("dark")
    ? "fa-regular fa-sun"
    : "fa-regular fa-moon";
}
updateIcon();

// Evento del botón
btn.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    root.classList.contains("dark") ? "dark" : "light"
  );
  updateIcon();
});
