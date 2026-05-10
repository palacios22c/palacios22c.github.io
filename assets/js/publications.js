async function loadPublications() {
  const container =
    document.getElementById("publications-list");

  if (!container) return;

  try {
    console.log("Loading publications JSON...");

    const response =
      await fetch("data/publications.json");

    if (!response.ok) {
      throw new Error(
        "HTTP error: " + response.status
      );
    }

    const publications =
      await response.json();

    if (!Array.isArray(publications) ||
        publications.length === 0) {
      container.innerHTML =
        "<p>No publications available.</p>";
      return;
    }

    // Ordenar por año (descendente)
    publications.sort((a, b) =>
      (b.year || 0) - (a.year || 0)
    );

    container.innerHTML = "";

    publications.forEach(pub => {

      const article =
        document.createElement("article");

      article.className =
        "publication-item";

      const doiLink =
        pub.doi
          ? `https://doi.org/${pub.doi}`
          : "";

      article.innerHTML = `
        <h3>${pub.title || "Untitled"}</h3>

        ${
          pub.authors
            ? `<p class="publication-authors">
                 ${pub.authors}
               </p>`
            : ""
        }

        ${
          pub.journal || pub.year
            ? `<p class="publication-journal">
                 <em>${pub.journal || ""}</em>
                 ${pub.year ? `(${pub.year})` : ""}
               </p>`
            : ""
        }

        <div class="publication-links">

          ${
            doiLink
              ? `<a href="${doiLink}"
                   target="_blank"
                   rel="noopener noreferrer">
                   DOI
                 </a>`
              : ""
          }
          <!-- No se muestra el enlace al PDF
          ${
            pub.pdf
              ? `<a href="${pub.pdf}"
                   target="_blank"
                   rel="noopener noreferrer">
                   PDF
                 </a>`
              : ""
          }
          -->
        </div>
      `;

      container.appendChild(article);
    });

  } catch (err) {

    console.error(
      "Error loading publications:",
      err
    );

    container.innerHTML = `
      <p class="publication-error">
        Error loading publications.
      </p>
    `;
  }
}

document.addEventListener(
  "DOMContentLoaded",
  loadPublications
);