// ---------------------------
//  IDIOMAS (con localStorage)
// ---------------------------

const translations = {
  es: {
    title: "Saúl Palacios info",
    meta_description: "Perfil académico y profesional de Saúl Palacios",
    name: "Saúl Palacios",
    char1: "Curioso",
    char2: "Profesor e investigador",
    char3: "Ingeniero Industrial + Biomédico",
    toggle_theme: "Cambiar tema",
    x: "Perfil en X (se abre en nueva pestaña)",
    bluesky: "Perfil en Bluesky (se abre en nueva pestaña)",
    linkedin: "Perfil en LinkedIn (se abre en nueva pestaña)",
    researchgate: "Perfil en ResearchGate (se abre en nueva pestaña)",
    orcid: "Perfil ORCID (se abre en nueva pestaña)",
    github: "Perfil en GitHub (se abre en nueva pestaña)",
    scholar: "Perfil en Google Scholar (se abre en nueva pestaña)",
    mail: "Correo electrónico",
    publications_title: "Publicaciones científicas"
  },
  en: {
    title: "Saul Palacios info",
    meta_description: "Academic and professional profile of Saul Palacios",
    name: "Saul Palacios",
    char1: "Curious",
    char2: "Professor and researcher",
    char3: "Industrial + Biomedical Engineer",
    toggle_theme: "Toggle theme",
    x: "X profile (opens in new tab)",
    bluesky: "Bluesky profile (opens in new tab)",
    linkedin: "LinkedIn Profile (opens in new tab)",
    researchgate: "ResearchGate profile (opens in new tab)",
    orcid: "ORCID profile (opens in new tab)",
    github: "GitHub profile (opens in new tab)",
    scholar: "Google Scholar profile (opens in new tab)",
    mail: "E-mail",
    publications_title: "Scientific Publications"
  }
};

const supported = ["es", "en"];
const browserLang = navigator.language.slice(0, 2);

const lang =
  localStorage.getItem("lang") ||
  (supported.includes(browserLang) ? browserLang : "en");

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    el.setAttribute(
      "aria-label",
      translations[lang][el.dataset.i18nAria]
    );
  });

  document.querySelectorAll("[data-i18n-content]").forEach(el => {
    const key = el.dataset.i18nContent;
    el.setAttribute("content", translations[lang][key]);
  });

  document.title = translations[lang].title;
  localStorage.setItem("lang", lang);

  const status = document.getElementById("status");
  if (status) {
    status.textContent =
    lang === "es" ? "Idioma cambiado a español" : "Language changed to English";
  }
}

const selector = document.getElementById("langSwitcher");
selector.value = lang;
applyLanguage(lang);

// Selector manual
selector.addEventListener("change", e => applyLanguage(e.target.value));
