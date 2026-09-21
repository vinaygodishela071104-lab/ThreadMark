document.addEventListener("DOMContentLoaded", () => {
  const designCards = document.querySelectorAll(
    ".threadmark-design-type__card",
  );

  const productCards = document.querySelectorAll(
    ".threadmark-design-products__card",
  );

  const productButtons = document.querySelectorAll(
    ".threadmark-design-products__select",
  );

  const selectedDesignType = document.getElementById(
    "threadmarkSelectedDesignType",
  );

  const recommendationDesign = document.getElementById(
    "threadmarkRecommendationDesign",
  );

  const designTypeInput = document.getElementById("threadmarkDesignTypeInput");

  const selectedProductBox = document.getElementById(
    "threadmarkSelectedProduct",
  );

  const selectedProductName = document.getElementById(
    "threadmarkSelectedProductName",
  );

  const productInput = document.getElementById("threadmarkProductInput");

  function refreshIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function getSupportedDesigns(productCard) {
    const designs = productCard.dataset.designs || "";

    return designs
      .split(",")
      .map((design) => design.trim())
      .filter(Boolean);
  }

  function highlightRecommendedProducts(designType) {
    productCards.forEach((productCard) => {
      const supportedDesigns = getSupportedDesigns(productCard);

      const isRecommended = supportedDesigns.includes(designType);

      productCard.classList.toggle("is-recommended", isRecommended);
    });

    if (recommendationDesign) {
      recommendationDesign.textContent = designType;
    }

    refreshIcons();
  }

  function selectDesign(card) {
    designCards.forEach((item) => {
      item.classList.remove("is-selected");
      item.setAttribute("aria-checked", "false");
    });

    card.classList.add("is-selected");
    card.setAttribute("aria-checked", "true");

    const designType = card.dataset.designType;

    if (selectedDesignType) {
      selectedDesignType.textContent = designType;
    }

    if (designTypeInput) {
      designTypeInput.value = designType;
    }

    highlightRecommendedProducts(designType);
  }

  designCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectDesign(card);
    });

    card.addEventListener("keydown", (event) => {
      const navigationKeys = [
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
        "ArrowUp",
      ];

      if (!navigationKeys.includes(event.key)) {
        return;
      }

      event.preventDefault();

      const cards = Array.from(designCards);
      const currentIndex = cards.indexOf(card);

      const moveForward =
        event.key === "ArrowRight" || event.key === "ArrowDown";

      const nextIndex = moveForward
        ? (currentIndex + 1) % cards.length
        : (currentIndex - 1 + cards.length) % cards.length;

      cards[nextIndex].focus();
      selectDesign(cards[nextIndex]);
    });
  });

  productButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCard = button.closest(".threadmark-design-products__card");

      if (!selectedCard) {
        return;
      }

      productCards.forEach((card) => {
        card.classList.remove("is-selected");

        const cardButton = card.querySelector(
          ".threadmark-design-products__select",
        );

        if (!cardButton) {
          return;
        }

        const buttonText = cardButton.querySelector("span");

        if (buttonText) {
          buttonText.textContent = "Select Product";
        }

        const icon = cardButton.querySelector("[data-lucide]");

        if (icon) {
          icon.setAttribute("data-lucide", "arrow-right");
        }

        cardButton.setAttribute("aria-pressed", "false");
      });

      selectedCard.classList.add("is-selected");

      const buttonText = button.querySelector("span");

      if (buttonText) {
        buttonText.textContent = "Selected";
      }

      const icon = button.querySelector("[data-lucide]");

      if (icon) {
        icon.setAttribute("data-lucide", "check");
      }

      button.setAttribute("aria-pressed", "true");

      const productName = selectedCard.dataset.product;

      if (selectedProductName) {
        selectedProductName.textContent = productName;
      }

      if (productInput) {
        productInput.value = productName;
      }

      if (selectedProductBox) {
        selectedProductBox.hidden = false;
      }

      refreshIcons();
    });
  });

  const initialDesign = document.querySelector(
    ".threadmark-design-type__card.is-selected",
  );

  if (initialDesign) {
    const initialDesignType = initialDesign.dataset.designType;

    if (selectedDesignType) {
      selectedDesignType.textContent = initialDesignType;
    }

    if (designTypeInput) {
      designTypeInput.value = initialDesignType;
    }

    highlightRecommendedProducts(initialDesignType);
  }

  refreshIcons();
});
document.addEventListener("DOMContentLoaded", () => {
  const customizerSection = document.getElementById("custom-design-form");

  const orderReviewSection = document.getElementById("order-review");

  const customizerProductTitle = document.getElementById(
    "customizerProductTitle",
  );

  const customizerDesignName = document.getElementById("customizerDesignName");

  const customizerProductName = document.getElementById(
    "customizerProductName",
  );

  const personalizationHelp = document.getElementById("personalizationHelp");

  const dynamicGroups = document.querySelectorAll(
    ".threadmark-customizer__dynamic-group",
  );

  const designUpload = document.getElementById("designUpload");

  const uploadTitle = document.getElementById("uploadTitle");

  const uploadDescription = document.getElementById("uploadDescription");

  const uploadedFile = document.getElementById("uploadedFile");

  const uploadedFileName = document.getElementById("uploadedFileName");

  const uploadedFileSize = document.getElementById("uploadedFileSize");

  const removeUploadedFile = document.getElementById("removeUploadedFile");

  const specialInstructions = document.getElementById("specialInstructions");

  const instructionCount = document.getElementById("instructionCount");

  const continueToOrder = document.getElementById("continueToOrder");

  const personalizedText = document.getElementById("personalizedText");

  const monogramInitials = document.getElementById("monogramInitials");

  const eventText = document.getElementById("eventText");

  const organizationName = document.getElementById("organizationName");

  const embroideryPlacement = document.getElementById("embroideryPlacement");

  const embroiderySize = document.getElementById("embroiderySize");

  const orderQuantity = document.getElementById("orderQuantity");

  const decreaseQuantity = document.getElementById("decreaseQuantity");

  const increaseQuantity = document.getElementById("increaseQuantity");

  const reviewDesignType = document.getElementById("reviewDesignType");

  const reviewProduct = document.getElementById("reviewProduct");

  const reviewPersonalization = document.getElementById(
    "reviewPersonalization",
  );

  const reviewThreadColor = document.getElementById("reviewThreadColor");

  const reviewPlacement = document.getElementById("reviewPlacement");

  const reviewSize = document.getElementById("reviewSize");

  const reviewFile = document.getElementById("reviewFile");

  const reviewQuantity = document.getElementById("reviewQuantity");

  const reviewOrderType = document.getElementById("reviewOrderType");

  const quoteDesignType = document.getElementById("quoteDesignType");

  const quoteProduct = document.getElementById("quoteProduct");

  const quoteForm = document.getElementById("threadmarkQuoteForm");

  function refreshLucide() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function getSelectedDesign() {
    const selectedDesignCard = document.querySelector(
      ".threadmark-design-type__card.is-selected",
    );

    return selectedDesignCard
      ? selectedDesignCard.dataset.designType
      : "Name or Initials";
  }

  function getSelectedProduct() {
    const selectedProductCard = document.querySelector(
      ".threadmark-design-products__card.is-selected",
    );

    return selectedProductCard ? selectedProductCard.dataset.product : "";
  }

  function setDynamicGroup(groupName) {
    dynamicGroups.forEach((group) => {
      group.hidden = group.dataset.fieldGroup !== groupName;
    });
  }

  function configurePersonalization(designType) {
    if (designType === "Monogram") {
      setDynamicGroup("monogram");

      personalizationHelp.textContent =
        "Add your initials and choose the monogram style you prefer.";

      uploadTitle.textContent = "Have a monogram reference?";

      uploadDescription.textContent =
        "Upload an optional reference showing your preferred layout.";

      return;
    }

    if (designType === "Logo Embroidery" || designType === "Custom Artwork") {
      dynamicGroups.forEach((group) => {
        group.hidden = true;
      });

      personalizationHelp.textContent =
        designType === "Logo Embroidery"
          ? "Upload the logo you would like converted into embroidery."
          : "Upload the artwork or illustration you would like embroidered.";

      uploadTitle.textContent =
        designType === "Logo Embroidery"
          ? "Upload Your Logo"
          : "Upload Your Artwork";

      uploadDescription.textContent =
        designType === "Logo Embroidery"
          ? "A clear PNG, SVG or PDF gives our team the best reference."
          : "Upload a clear image, vector file, illustration, or PDF.";

      return;
    }

    if (designType === "Event or Wedding Design") {
      setDynamicGroup("event");

      personalizationHelp.textContent =
        "Add the names, event text, and date you would like embroidered.";

      uploadTitle.textContent = "Have an event design reference?";

      uploadDescription.textContent =
        "Upload an optional motif, invitation style, crest, or reference.";

      return;
    }

    if (designType === "Team or Corporate Design") {
      setDynamicGroup("corporate");

      personalizationHelp.textContent =
        "Add your company or team information and upload branding if available.";

      uploadTitle.textContent = "Upload Your Logo or Team Mark";

      uploadDescription.textContent =
        "Upload your company logo, team crest, or branding artwork.";

      return;
    }

    setDynamicGroup("text");

    personalizationHelp.textContent =
      "Enter the name, initials, or text you would like embroidered.";

    uploadTitle.textContent = "Have a design reference?";

    uploadDescription.textContent =
      "Upload an optional image showing the style you have in mind.";
  }

  function updateCustomizerContext() {
    const designType = getSelectedDesign();
    const product = getSelectedProduct();

    customizerDesignName.textContent = designType;

    if (product) {
      customizerProductName.textContent = product;

      customizerProductTitle.textContent = product;
    }

    configurePersonalization(designType);

    refreshLucide();
  }

  function getPersonalizationValue() {
    const designType = getSelectedDesign();

    if (designType === "Monogram") {
      return monogramInitials.value.trim() || "Not added";
    }

    if (designType === "Logo Embroidery" || designType === "Custom Artwork") {
      return designUpload.files.length
        ? designUpload.files[0].name
        : "Design upload";
    }

    if (designType === "Event or Wedding Design") {
      return eventText.value.trim() || "Not added";
    }

    if (designType === "Team or Corporate Design") {
      return organizationName.value.trim() || "Not added";
    }

    return personalizedText.value.trim() || "Not added";
  }

  function updateReview() {
    const designType = getSelectedDesign();
    const product = getSelectedProduct();

    const selectedThread = document.querySelector(
      'input[name="threadColor"]:checked',
    );

    const selectedOrderType = document.querySelector(
      'input[name="orderType"]:checked',
    );

    reviewDesignType.textContent = designType;

    reviewProduct.textContent = product || "Not selected";

    reviewPersonalization.textContent = getPersonalizationValue();

    reviewThreadColor.textContent = selectedThread
      ? selectedThread.value
      : "Not selected";

    reviewPlacement.textContent = embroideryPlacement.value;

    reviewSize.textContent = embroiderySize.value;

    reviewFile.textContent = designUpload.files.length
      ? designUpload.files[0].name
      : "No file";

    const quantity = Math.max(1, Number(orderQuantity.value) || 1);

    reviewQuantity.textContent = `${quantity} ${
      quantity === 1 ? "Piece" : "Pieces"
    }`;

    reviewOrderType.textContent = selectedOrderType
      ? selectedOrderType.value
      : "Individual";

    quoteDesignType.value = designType;

    quoteProduct.value = product;
  }

  document
    .querySelectorAll(".threadmark-design-products__select")
    .forEach((button) => {
      button.addEventListener("click", () => {
        window.setTimeout(() => {
          updateCustomizerContext();

          customizerSection.hidden = false;

          customizerSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          updateReview();
        }, 50);
      });
    });

  document.querySelectorAll(".threadmark-design-type__card").forEach((card) => {
    card.addEventListener("click", () => {
      window.setTimeout(() => {
        if (!customizerSection.hidden) {
          updateCustomizerContext();
          updateReview();
        }
      }, 20);
    });
  });

  designUpload.addEventListener("change", () => {
    const file = designUpload.files[0];

    if (!file) {
      uploadedFile.hidden = true;
      updateReview();
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      designUpload.value = "";
      uploadedFile.hidden = true;

      alert("Please choose a file smaller than 10 MB.");

      updateReview();
      return;
    }

    uploadedFileName.textContent = file.name;

    const sizeInMB = file.size / (1024 * 1024);

    uploadedFileSize.textContent =
      sizeInMB >= 1
        ? `${sizeInMB.toFixed(2)} MB`
        : `${Math.ceil(file.size / 1024)} KB`;

    uploadedFile.hidden = false;

    updateReview();
    refreshLucide();
  });

  removeUploadedFile.addEventListener("click", () => {
    designUpload.value = "";
    uploadedFile.hidden = true;

    uploadedFileName.textContent = "";
    uploadedFileSize.textContent = "";

    updateReview();
  });

  specialInstructions.addEventListener("input", () => {
    instructionCount.textContent = specialInstructions.value.length;
  });

  continueToOrder.addEventListener("click", () => {
    updateReview();

    orderReviewSection.hidden = false;

    orderReviewSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    refreshLucide();
  });

  decreaseQuantity.addEventListener("click", () => {
    const current = Math.max(1, Number(orderQuantity.value) || 1);

    orderQuantity.value = Math.max(1, current - 1);

    updateReview();
  });

  increaseQuantity.addEventListener("click", () => {
    const current = Math.max(1, Number(orderQuantity.value) || 1);

    orderQuantity.value = Math.min(10000, current + 1);

    updateReview();
  });

  orderQuantity.addEventListener("input", () => {
    if (Number(orderQuantity.value) < 1) {
      orderQuantity.value = 1;
    }

    updateReview();
  });

  [
    personalizedText,
    monogramInitials,
    eventText,
    organizationName,
    embroideryPlacement,
    embroiderySize,
  ].forEach((element) => {
    element.addEventListener("input", updateReview);

    element.addEventListener("change", updateReview);
  });

  document.querySelectorAll('input[name="threadColor"]').forEach((input) => {
    input.addEventListener("change", updateReview);
  });

  document.querySelectorAll('input[name="orderType"]').forEach((input) => {
    input.addEventListener("change", updateReview);
  });

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    updateReview();

    if (!quoteForm.checkValidity()) {
      quoteForm.reportValidity();
      return;
    }

    const product = getSelectedProduct();

    if (!product) {
      document.getElementById("product-selection").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    const submitButton = quoteForm.querySelector(
      ".threadmark-order-review__submit",
    );

    submitButton.innerHTML = `
        Request Received
        <i
          data-lucide="check"
          aria-hidden="true"
        ></i>
      `;

    submitButton.disabled = true;

    refreshLucide();
  });

  updateCustomizerContext();
  updateReview();
  refreshLucide();
});
