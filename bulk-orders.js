document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("threadmarkBulkQuoteForm");
  const quantityInput = document.getElementById("bulkQuantity");
  const decreaseButton = document.getElementById("bulkQuantityDecrease");
  const increaseButton = document.getElementById("bulkQuantityIncrease");
  const productSelect = document.getElementById("bulkProductType");

  const orderTypeInputs = document.querySelectorAll('input[name="orderType"]');

  const uploadInput = document.getElementById("bulkDesignUpload");
  const uploadedFile = document.getElementById("bulkUploadedFile");
  const uploadedFileName = document.getElementById("bulkUploadedFileName");
  const uploadedFileSize = document.getElementById("bulkUploadedFileSize");
  const removeUploadedFile = document.getElementById("bulkRemoveUploadedFile");

  const requirements = document.getElementById("bulkRequirements");
  const requirementsCount = document.getElementById("bulkRequirementsCount");

  const summaryOrderType = document.getElementById("bulkSummaryOrderType");
  const summaryProduct = document.getElementById("bulkSummaryProduct");
  const summaryQuantity = document.getElementById("bulkSummaryQuantity");
  const summaryArtwork = document.getElementById("bulkSummaryArtwork");

  const submitButton = document.getElementById("bulkQuoteSubmit");

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const updateQuantitySummary = () => {
    let quantity = Number.parseInt(quantityInput.value, 10);

    if (Number.isNaN(quantity) || quantity < 10) {
      quantity = 10;
    }

    quantityInput.value = quantity;
    summaryQuantity.textContent = `${quantity} pieces`;
  };

  const updateOrderTypeSummary = () => {
    const selectedType = document.querySelector(
      'input[name="orderType"]:checked',
    );

    summaryOrderType.textContent = selectedType
      ? selectedType.value
      : "Not selected";
  };

  const updateProductSummary = () => {
    summaryProduct.textContent = productSelect.value || "Not selected";
  };

  decreaseButton.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value, 10) || 10;

    quantityInput.value = Math.max(10, currentValue - 10);

    updateQuantitySummary();
  });

  increaseButton.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value, 10) || 10;

    quantityInput.value = currentValue + 10;

    updateQuantitySummary();
  });

  quantityInput.addEventListener("input", updateQuantitySummary);

  quantityInput.addEventListener("blur", () => {
    let quantity = Number.parseInt(quantityInput.value, 10);

    if (Number.isNaN(quantity) || quantity < 10) {
      quantity = 10;
    }

    quantityInput.value = quantity;
    updateQuantitySummary();
  });

  orderTypeInputs.forEach((input) => {
    input.addEventListener("change", updateOrderTypeSummary);
  });

  productSelect.addEventListener("change", updateProductSummary);

  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];

    if (!file) {
      return;
    }

    const allowedExtensions = [
      "image/png",
      "image/jpeg",
      "image/svg+xml",
      "application/pdf",
    ];

    const maxFileSize = 10 * 1024 * 1024;

    if (!allowedExtensions.includes(file.type)) {
      uploadInput.value = "";
      uploadedFile.hidden = true;
      summaryArtwork.textContent = "Not uploaded";

      alert("Please upload a PNG, JPG, SVG or PDF file.");

      return;
    }

    if (file.size > maxFileSize) {
      uploadInput.value = "";
      uploadedFile.hidden = true;
      summaryArtwork.textContent = "Not uploaded";

      alert("The uploaded file must be smaller than 10 MB.");

      return;
    }

    uploadedFileName.textContent = file.name;
    uploadedFileSize.textContent = formatFileSize(file.size);
    uploadedFile.hidden = false;
    summaryArtwork.textContent = file.name;

    if (window.lucide) {
      lucide.createIcons();
    }
  });

  removeUploadedFile.addEventListener("click", () => {
    uploadInput.value = "";
    uploadedFile.hidden = true;
    uploadedFileName.textContent = "";
    uploadedFileSize.textContent = "";
    summaryArtwork.textContent = "Not uploaded";
  });

  requirements.addEventListener("input", () => {
    requirementsCount.textContent = requirements.value.length;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitButton.innerHTML = `
      <i data-lucide="check" aria-hidden="true"></i>
      Request Ready
    `;

    submitButton.disabled = true;

    if (window.lucide) {
      lucide.createIcons();
    }
  });

  updateQuantitySummary();
  updateOrderTypeSummary();
  updateProductSummary();

  if (window.lucide) {
    lucide.createIcons();
  }
});
