document.addEventListener("DOMContentLoaded", function () {
  const wizard = document.querySelector(".quote-wizard");

  if (!wizard) return;

  const steps = Array.from(wizard.querySelectorAll(".quote-wizard__step"));
  const indicators = Array.from(
    wizard.querySelectorAll(".quote-wizard__step-indicator"),
  );
  const progressFill = wizard.querySelector(".quote-wizard__progress-fill");
  let currentStep = 1;
  let furthestStep = 1;

  function getStepElement(stepNumber) {
    return wizard.querySelector(
      '.quote-wizard__step[data-step="' + stepNumber + '"]',
    );
  }

  function validateStep(stepNumber) {
    const step = getStepElement(stepNumber);
    const requiredFields = Array.from(step.querySelectorAll("[required]"));

    for (const field of requiredFields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }

    return true;
  }

  function updateWizard(stepNumber) {
    currentStep = stepNumber;

    steps.forEach(function (step) {
      const stepValue = Number(step.dataset.step);
      const isCurrent = stepValue === stepNumber;

      step.hidden = !isCurrent;
      step.classList.toggle("is-active", isCurrent);
    });

    indicators.forEach(function (indicator) {
      const indicatorStep = Number(indicator.dataset.stepTarget);

      indicator.classList.toggle("is-active", indicatorStep === stepNumber);
      indicator.classList.toggle("is-complete", indicatorStep < stepNumber);

      indicator.disabled = indicatorStep > furthestStep;
    });

    progressFill.style.width = ((stepNumber - 1) / 2) * 100 + "%";

    const activeStep = getStepElement(stepNumber);
    const firstField = activeStep.querySelector(
      "input:not([type='file']), select, textarea",
    );

    if (firstField) {
      firstField.focus({ preventScroll: true });
    }
  }

  wizard.querySelectorAll(".quote-wizard__next").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!validateStep(currentStep)) return;

      furthestStep = Math.max(furthestStep, currentStep + 1);
      updateWizard(currentStep + 1);
    });
  });

  wizard.querySelectorAll(".quote-wizard__back").forEach(function (button) {
    button.addEventListener("click", function () {
      updateWizard(currentStep - 1);
    });
  });

  indicators.forEach(function (indicator) {
    indicator.addEventListener("click", function () {
      const requestedStep = Number(indicator.dataset.stepTarget);

      if (requestedStep <= furthestStep) {
        updateWizard(requestedStep);
      }
    });
  });

  wizard.addEventListener("submit", function (event) {
    if (!validateStep(3)) {
      event.preventDefault();
    }
  });

  updateWizard(1);
});
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".contact-faq-item");

  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;

      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });
    });
  });
});
