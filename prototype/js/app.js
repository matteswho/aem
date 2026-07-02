(function () {
  const heroRoot = document.getElementById("heroRoot");

  const defaultsByVariant = {
    product: {
      variant: "product",
      disturberText: "Disturber line",
      showDisturber: true,
      headline: "Headline",
      subline: "Subline",
      showSubline: true,
      copy: "Copy",
      showCopy: true,
      showList: true,
      listItems: ["List Item", "List Item", "List Item"],
      showAdditionalRow: true,
      showAuthor: true, author: "David Bläsing",
      showUpdate: true, updateDate: "02.01. 2024",
      showReadingTime: true, readingTime: "5 Min Lesezeit",
      showButtonRow: true,
      showPrimary: true, primaryLabel: "Action", primaryLink: "",
      showSecondary: true, secondaryLabel: "Action", secondaryLink: "",
      imageUrl: "", imageAlt: "",
    },
    article: {
      variant: "article",
      disturberText: "Disturber line",
      showDisturber: true,
      headline: "Headline",
      subline: "Subline",
      showSubline: true,
      copy: "Copy",
      showCopy: true,
      showList: true,
      listItems: ["List Item", "List Item", "List Item"],
      showAdditionalRow: true,
      showAuthor: true, author: "David Bläsing",
      showUpdate: true, updateDate: "02.01. 2024",
      showReadingTime: true, readingTime: "5 Min Lesezeit",
      showButtonRow: true,
      showPrimary: true, primaryLabel: "Action", primaryLink: "",
      showSecondary: true, secondaryLabel: "Action", secondaryLink: "",
      imageUrl: "", imageAlt: "",
    },
    adp: {
      variant: "adp",
      disturberText: "Disturber",
      showDisturber: true,
      headline: "Headline",
      subline: "Subline",
      showSubline: true,
      copy: "Copy",
      showCopy: true,
      showList: true,
      listItems: ["List Item", "List Item", "List Item"],
      showAdditionalRow: true,
      showAuthor: true, author: "David Bläsing",
      showUpdate: true, updateDate: "02.01. 2024",
      showReadingTime: true, readingTime: "5 Min Lesezeit",
      showButtonRow: true,
      showPrimary: true, primaryLabel: "Action", primaryLink: "",
      showSecondary: true, secondaryLabel: "Action", secondaryLink: "",
      imageUrl: "", imageAlt: "",
    },
  };

  let state = structuredClone(defaultsByVariant.product);

  const fields = {
    variant: document.getElementById("fieldVariant"),
    disturberText: document.getElementById("fieldDisturberText"),
    showDisturber: document.getElementById("fieldShowDisturber"),
    headline: document.getElementById("fieldHeadline"),
    subline: document.getElementById("fieldSubline"),
    showSubline: document.getElementById("fieldShowSubline"),
    copy: document.getElementById("fieldCopy"),
    showCopy: document.getElementById("fieldShowCopy"),
    showList: document.getElementById("fieldShowList"),
    showAdditionalRow: document.getElementById("fieldShowAdditionalRow"),
    showAuthor: document.getElementById("fieldShowAuthor"),
    author: document.getElementById("fieldAuthor"),
    showUpdate: document.getElementById("fieldShowUpdate"),
    updateDate: document.getElementById("fieldUpdateDate"),
    showReadingTime: document.getElementById("fieldShowReadingTime"),
    readingTime: document.getElementById("fieldReadingTime"),
    showButtonRow: document.getElementById("fieldShowButtonRow"),
    showPrimary: document.getElementById("fieldShowPrimary"),
    primaryLabel: document.getElementById("fieldPrimaryLabel"),
    primaryLink: document.getElementById("fieldPrimaryLink"),
    showSecondary: document.getElementById("fieldShowSecondary"),
    secondaryLabel: document.getElementById("fieldSecondaryLabel"),
    secondaryLink: document.getElementById("fieldSecondaryLink"),
    imageUrl: document.getElementById("fieldImageUrl"),
    imageAlt: document.getElementById("fieldImageAlt"),
  };

  const listItemsContainer = document.getElementById("listItemsContainer");
  const btnAddListItem = document.getElementById("btnAddListItem");

  function syncFieldsFromState() {
    fields.variant.value = state.variant;
    fields.disturberText.value = state.disturberText;
    fields.showDisturber.checked = state.showDisturber;
    fields.headline.value = state.headline;
    fields.subline.value = state.subline;
    fields.showSubline.checked = state.showSubline;
    fields.copy.value = state.copy;
    fields.showCopy.checked = state.showCopy;
    fields.showList.checked = state.showList;
    fields.showAdditionalRow.checked = state.showAdditionalRow;
    fields.showAuthor.checked = state.showAuthor;
    fields.author.value = state.author;
    fields.showUpdate.checked = state.showUpdate;
    fields.updateDate.value = state.updateDate;
    fields.showReadingTime.checked = state.showReadingTime;
    fields.readingTime.value = state.readingTime;
    fields.showButtonRow.checked = state.showButtonRow;
    fields.showPrimary.checked = state.showPrimary;
    fields.primaryLabel.value = state.primaryLabel;
    fields.primaryLink.value = state.primaryLink;
    fields.showSecondary.checked = state.showSecondary;
    fields.secondaryLabel.value = state.secondaryLabel;
    fields.secondaryLink.value = state.secondaryLink;
    fields.imageUrl.value = state.imageUrl;
    fields.imageAlt.value = state.imageAlt;

    document.getElementById("secondaryLabelText").textContent =
      state.variant === "product" ? "Tertiär-Button anzeigen" : "Sekundär-Button anzeigen";

    renderListEditor();
    render();
  }

  function renderListEditor() {
    listItemsContainer.innerHTML = "";
    state.listItems.forEach((value, idx) => {
      const row = document.createElement("div");
      row.className = "aem-list-editor__row";
      row.innerHTML = `
        <input type="text" class="aem-input" value="${value.replace(/"/g, "&quot;")}" data-idx="${idx}" />
        <button type="button" class="aem-list-editor__remove" data-idx="${idx}" title="Entfernen">✕</button>
      `;
      listItemsContainer.appendChild(row);
    });

    listItemsContainer.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", (e) => {
        state.listItems[Number(e.target.dataset.idx)] = e.target.value;
        render();
      });
    });
    listItemsContainer.querySelectorAll(".aem-list-editor__remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        state.listItems.splice(Number(e.target.dataset.idx), 1);
        renderListEditor();
        render();
      });
    });
  }

  btnAddListItem.addEventListener("click", () => {
    state.listItems.push("List Item");
    renderListEditor();
    render();
  });

  function render() {
    renderHero(state, heroRoot);
  }

  // Bind simple fields declaratively
  const bindings = [
    ["disturberText", "value"], ["showDisturber", "checked"],
    ["headline", "value"], ["subline", "value"], ["showSubline", "checked"],
    ["copy", "value"], ["showCopy", "checked"],
    ["showList", "checked"], ["showAdditionalRow", "checked"],
    ["showAuthor", "checked"], ["author", "value"],
    ["showUpdate", "checked"], ["updateDate", "value"],
    ["showReadingTime", "checked"], ["readingTime", "value"],
    ["showButtonRow", "checked"],
    ["showPrimary", "checked"], ["primaryLabel", "value"], ["primaryLink", "value"],
    ["showSecondary", "checked"], ["secondaryLabel", "value"], ["secondaryLink", "value"],
    ["imageUrl", "value"], ["imageAlt", "value"],
  ];

  bindings.forEach(([key, prop]) => {
    const el = fields[key];
    const evt = prop === "checked" ? "change" : "input";
    el.addEventListener(evt, () => {
      state[key] = prop === "checked" ? el.checked : el.value;
      render();
    });
  });

  fields.variant.addEventListener("change", () => {
    const preserved = {
      headline: state.headline, subline: state.subline, copy: state.copy,
      listItems: state.listItems, author: state.author, updateDate: state.updateDate,
      readingTime: state.readingTime, primaryLabel: state.primaryLabel,
      secondaryLabel: state.secondaryLabel, imageUrl: state.imageUrl, imageAlt: state.imageAlt,
    };
    state = { ...structuredClone(defaultsByVariant[fields.variant.value]), ...preserved, variant: fields.variant.value };
    syncFieldsFromState();
  });

  // ---- Tabs ----
  document.querySelectorAll(".aem-dialog__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".aem-dialog__tab").forEach((t) => t.classList.remove("is-active"));
      document.querySelectorAll(".aem-dialog__panel").forEach((p) => p.classList.remove("is-active"));
      tab.classList.add("is-active");
      document.querySelector(`.aem-dialog__panel[data-panel="${tab.dataset.tab}"]`).classList.add("is-active");
    });
  });

  // ---- Component overlay -> open dialog focus ----
  const heroWrapper = document.getElementById("heroWrapper");
  const aemDialog = document.getElementById("aemDialog");
  document.getElementById("btnEditHero").addEventListener("click", () => {
    heroWrapper.classList.add("is-active");
    aemDialog.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ---- Reset ----
  document.getElementById("btnReset").addEventListener("click", () => {
    state = structuredClone(defaultsByVariant[state.variant]);
    syncFieldsFromState();
  });

  document.getElementById("btnApply").addEventListener("click", () => {
    heroWrapper.classList.remove("is-active");
    render();
  });

  // ---- Preview mode: hide overlays & dialog ----
  const btnPreview = document.getElementById("btnPreview");
  let previewMode = false;
  btnPreview.addEventListener("click", () => {
    previewMode = !previewMode;
    document.body.classList.toggle("is-preview", previewMode);
    btnPreview.textContent = previewMode ? "Zurück zum Editor" : "Vorschau";
    aemDialog.classList.toggle("is-hidden", previewMode);
  });

  syncFieldsFromState();
})();
