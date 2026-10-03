document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".embroidery-filter");
  const showcaseItems = document.querySelectorAll(".showcase-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;

        filterButton.classList.toggle("embroidery-filter--active", isActive);

        filterButton.setAttribute("aria-selected", String(isActive));
      });

      showcaseItems.forEach((item) => {
        const itemCategory = item.dataset.category;
        const shouldShow =
          selectedFilter === "all" || itemCategory === selectedFilter;

        item.classList.toggle("is-hidden", !shouldShow);

        if (shouldShow) {
          item.style.animation = "none";
          item.offsetHeight;
          item.style.animation = "";
        }
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const customIdeaForm = document.getElementById("customIdeaForm");

  if (!customIdeaForm) return;

  const panels = customIdeaForm.querySelectorAll("[data-form-panel]");
  const formSteps = customIdeaForm.querySelectorAll(
    ".craft-process__form-step",
  );
  const progressBar = document.getElementById("formProgressBar");
  const successMessage = document.getElementById("formSuccessMessage");
  const productError = document.getElementById("productError");
  const designFile = document.getElementById("designFile");
  const fileName = document.getElementById("fileName");

  const totalSteps = panels.length;
  let currentStep = 1;
  let successTimeout;

  function goToStep(step) {
    currentStep = step;

    panels.forEach((panel) => {
      const panelStep = Number(panel.dataset.formPanel);

      panel.classList.toggle("is-active", panelStep === currentStep);
    });

    formSteps.forEach((stepItem, index) => {
      stepItem.classList.toggle("is-active", index + 1 <= currentStep);
    });

    progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;

    productError.classList.remove("is-visible");
  }

  function validateCurrentStep() {
    const activePanel = customIdeaForm.querySelector(
      `.craft-process__form-panel[data-form-panel="${currentStep}"]`,
    );

    if (currentStep === 1) {
      const selectedProduct = customIdeaForm.querySelector(
        'input[name="product"]:checked',
      );

      productError.classList.toggle("is-visible", !selectedProduct);

      return Boolean(selectedProduct);
    }

    const requiredFields = activePanel.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      const isEmpty = !field.value.trim();

      field.classList.toggle("is-invalid", isEmpty);

      if (isEmpty) {
        isValid = false;
      }
    });

    return isValid;
  }

  customIdeaForm.querySelectorAll("[data-next-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const isValid = validateCurrentStep();

      if (!isValid) return;

      goToStep(Number(button.dataset.nextStep));
    });
  });

  customIdeaForm.querySelectorAll("[data-prev-step]").forEach((button) => {
    button.addEventListener("click", () => {
      goToStep(Number(button.dataset.prevStep));
    });
  });

  customIdeaForm
    .querySelectorAll("input, select, textarea")
    .forEach((field) => {
      field.addEventListener("input", () => {
        field.classList.remove("is-invalid");

        if (field.name === "product") {
          productError.classList.remove("is-visible");
        }
      });

      field.addEventListener("change", () => {
        field.classList.remove("is-invalid");

        if (field.name === "product") {
          productError.classList.remove("is-visible");
        }
      });
    });

  designFile.addEventListener("change", () => {
    if (designFile.files && designFile.files.length > 0) {
      fileName.textContent = designFile.files[0].name;
    } else {
      fileName.textContent = "Choose file";
    }
  });

  customIdeaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = validateCurrentStep();

    if (!isValid) return;

    clearTimeout(successTimeout);

    successMessage.hidden = false;
    successMessage.classList.add("is-visible");

    customIdeaForm.reset();
    fileName.textContent = "Choose file";

    goToStep(1);

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    successMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });

    successTimeout = setTimeout(() => {
      successMessage.classList.remove("is-visible");
      successMessage.hidden = true;
    }, 6000);
  });

  goToStep(1);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
