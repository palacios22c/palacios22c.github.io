// ---------------------------
//  IDIOMAS (con localStorage)
// ---------------------------

const translations = {
  es: {
    title: "Saúl Palacios info",
    metaDescription: "Perfil académico y profesional de Saúl Palacios",

    char1: "Curioso",
    char2: "Profesor e investigador",
    char3: "Ingeniero Industrial + Biomédico",

    toggleTheme: "Cambiar tema",

    ariaX: "Perfil en X de Saúl Palacios",
    ariaLinkedIn: "Perfil de LinkedIn de Saúl Palacios",
    ariaResearchGate: "Perfil de ResearchGate de Saúl Palacios",
    ariaORCID: "Perfil ORCID de Saúl Palacios",
    ariaGitHub: "Perfil de GitHub de Saúl Palacios",
    ariaScholar: "Perfil en Google Scholar de Saúl Palacios",
    ariaMail: "Correo electrónico de Saúl Palacios"
  },
  en: {
    title: "Saul Palacios info",
    metaDescription: "Academic and professional profile of Saul Palacios",

    char1: "Curious",
    char2: "Professor and researcher",
    char3: "Industrial + Biomedical Engineer",

    toggleTheme: "Toggle theme",

    ariaX: "Saul Palacios on X",
    ariaLinkedIn: "Saul Palacios on LinkedIn",
    ariaResearchGate: "Saul Palacios on ResearchGate",
    ariaORCID: "Saul Palacios ORCID profile",
    ariaGitHub: "Saul Palacios on GitHub",
    ariaScholar: "Saul Palacios on Google Scholar",
    ariaMail: "Saul Palacios mail"
  }
};

const supported = ["es", "en"];

function detectLanguage() {
  const saved = localStorage.getItem("lang");
  if (saved && supported.includes(saved)) return saved;

  const browser = navigator.language.slice(0, 2);
  return supported.includes(browser) ? browser : "en";
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  const textNodes = document.querySelectorAll("[data-i18n]");
  textNodes.forEach(el => el.classList.add("fade-out"));

  setTimeout(() => {
    textNodes.forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
      el.classList.remove("fade-out");
    });
  }, 150);

  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.dataset.i18nAria;
    if (translations[lang][key]) {
      el.setAttribute("aria-label", translations[lang][key]);
    }
  });

  document.title = translations[lang].title;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && translations[lang].metaDescription) {
    metaDesc.setAttribute("content", translations[lang].metaDescription);
  }

  localStorage.setItem("lang", lang);

  const status = document.getElementById("i18n-status");
  status.textContent =
    lang === "es"
      ? "Idioma cambiado a español"
      : "Language changed to English";
}

const lang = detectLanguage();
applyLanguage(lang);

// Selector manual
const selector = document.getElementById("langSwitcher");
selector.value = lang;
selector.addEventListener("change", e => {
  applyLanguage(e.target.value);
});
