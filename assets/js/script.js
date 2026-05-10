// -------------------------------
//  MODO OSCURO (con localStorage)
// -------------------------------

const root = document.documentElement;
const btn = document.getElementById("themeToggle");
const icon = btn.querySelector("i");
const saved = localStorage.getItem("theme");

// Aplicar preferencia guardada o detectar la del sistema
if (saved === "dark" ||
   (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  root.classList.add("dark");
}

function updateIcon(announce = false) {
  const isDark = root.classList.contains("dark");

  icon.className = isDark
    ? "fa-regular fa-sun"
    : "fa-regular fa-moon";

  btn.setAttribute("aria-checked", root.classList.contains("dark"));

  const status = document.getElementById("status");
  if (status && announce) {
    status.textContent = isDark ? "Modo oscuro activado" : "Modo claro activado";
  }
}

updateIcon(false);

// Evento del botón
btn.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  updateIcon(true);
});
