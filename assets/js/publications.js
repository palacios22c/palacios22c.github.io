async function loadPublications() {
  const container = document.getElementById("publications-list");

  if (!container) return;

  try {
    console.log("Loading ORCID publications...");

    const orcidId = "0000-0001-5935-9454";

    const response = await fetch(
      `https://pub.orcid.org/v3.0/${orcidId}/works`,
      {
        headers: {
          "Accept": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error("ORCID API error: " + response.status);
    }

    const data = await response.json();

    const works = data.group || [];

    if (works.length === 0) {
      container.innerHTML =
        "<p>No publications found in ORCID.</p>";
      return;
    }

    container.innerHTML = "";

    works.forEach(item => {

      const summary =
        item["work-summary"] &&
        item["work-summary"][0]
          ? item["work-summary"][0]
          : {};

      const title =
        summary.title &&
        summary.title.title &&
        summary.title.title.value
          ? summary.title.title.value
          : "Untitled";

      const journal =
        summary["journal-title"] &&
        summary["journal-title"].value
          ? summary["journal-title"].value
          : "";

      const year =
        summary["publication-date"] &&
        summary["publication-date"].year &&
        summary["publication-date"].year.value
          ? summary["publication-date"].year.value
          : "";

      // 🔧 FIX CRÍTICO (sin optional chaining roto)
      let doi = "";

      const externalIds =
        summary["external-ids"];

      if (
        externalIds &&
        externalIds["external-id"]
      ) {
        const doiObj =
          externalIds["external-id"].find(
            id =>
              id["external-id-type"] === "doi"
          );

        if (doiObj &&
            doiObj["external-id-value"]) {
          doi =
            doiObj["external-id-value"];
        }
      }

      const link =
        doi ? `https://doi.org/${doi}` : "";

      const article =
        document.createElement("article");

      article.className =
        "publication-item";

      article.innerHTML = `
        <h3>${title}</h3>

        ${journal ? `
          <p class="publication-journal">
            <em>${journal}</em>
            ${year ? `(${year})` : ""}
          </p>
        ` : ""}

        <div class="publication-links">
          ${link ? `
            <a href="${link}"
               target="_blank"
               rel="noopener noreferrer">
               DOI
            </a>
          ` : ""}
        </div>
      `;

      container.appendChild(article);
    });

  } catch (err) {

    console.error("Error loading ORCID:", err);

    container.innerHTML = `
      <p class="publication-error">
        Error loading publications from ORCID.
      </p>
    `;
  }
}

document.addEventListener(
  "DOMContentLoaded",
  loadPublications
);