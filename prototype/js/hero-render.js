/**
 * Rendert die Hero-Komponente aus einem Konfigurationsobjekt.
 * Das Objekt entspricht in Form/Feldern dem, was in AEM ein Sling Model
 * (aus den Dialog-Properties) an das HTL-Template liefern würde.
 */
function renderHero(config, targetEl) {
  const variantClass = {
    product: "hero--product",
    article: "hero--article",
    adp: "hero--adp",
  }[config.variant];

  const escape = (str) =>
    String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const metaItems = [];
  if (config.showAdditionalRow) {
    if (config.showAuthor) {
      metaItems.push(`<span class="hero__meta-item">👤 ${escape(config.author)}</span>`);
    }
    if (config.showUpdate) {
      metaItems.push(`<span class="hero__meta-item">✎ ${escape(config.updateDate)}</span>`);
    }
    if (config.showReadingTime) {
      metaItems.push(`<span class="hero__meta-item">👁 ${escape(config.readingTime)}</span>`);
    }
  }

  const listHtml = config.showList && config.listItems.length
    ? `<ul class="hero__list">${config.listItems.map(
        (item) => `<li class="hero__list-item">${escape(item)}</li>`
      ).join("")}</ul>`
    : "";

  const secondaryButtonClass = config.variant === "article"
    ? "hero__btn--secondary-filled"
    : "hero__btn--tertiary-outline";

  const buttonsHtml = config.showButtonRow
    ? `<div class="hero__button-row">
        ${config.showPrimary ? `<a class="hero__btn hero__btn--primary" href="${escape(config.primaryLink || '#')}">${escape(config.primaryLabel)}</a>` : ""}
        ${config.showSecondary ? `<a class="hero__btn ${secondaryButtonClass}" href="${escape(config.secondaryLink || '#')}">${escape(config.secondaryLabel)}</a>` : ""}
      </div>`
    : "";

  const disturberBadge = (config.variant === "product" && config.showDisturber)
    ? `<div class="hero__disturber-badge">${escape(config.disturberText)}</div>`
    : "";

  const disturberInline = (config.variant !== "product" && config.showDisturber)
    ? `<p class="hero__disturber-line">${escape(config.disturberText)}</p>`
    : "";

  const imageHtml = config.imageUrl
    ? `<img class="hero__image" src="${escape(config.imageUrl)}" alt="${escape(config.imageAlt)}" />`
    : `<div class="hero__image-placeholder" role="img" aria-label="${escape(config.imageAlt || 'Platzhalterbild')}"></div>`;

  targetEl.innerHTML = `
    <div class="hero ${variantClass}">
      <div class="hero__left">
        <div class="hero__content-col">
          <div class="hero__content-area">
            <div class="hero__title-area">
              ${disturberInline}
              <p class="hero__headline">${escape(config.headline)}</p>
              ${config.showSubline ? `<p class="hero__subline">${escape(config.subline)}</p>` : ""}
            </div>
            ${config.showCopy ? `
              <div class="hero__description-area">
                <p class="hero__copy">${escape(config.copy)}</p>
                ${listHtml}
              </div>` : ""
            }
            ${metaItems.length ? `<div class="hero__meta-row">${metaItems.join("")}</div>` : ""}
          </div>
          ${buttonsHtml}
        </div>
      </div>
      <div class="hero__image-col">${imageHtml}</div>
      ${disturberBadge}
      <div class="hero__bridge"><div class="hero__bridge-inner"></div></div>
    </div>
  `;
}
