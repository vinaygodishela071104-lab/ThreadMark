document.addEventListener("DOMContentLoaded", () => {
  applySavedPreferences();
  createLucideIcons();
  initializeNavbar();
  initializeBackToTop();
});

function createLucideIcons(root = document) {
  if (typeof lucide !== "undefined") {
    lucide.createIcons({ root });
  }
}

function setLucideIcon(element, iconName) {
  if (!element) {
    return;
  }

  element.replaceChildren();

  const icon = document.createElement("i");

  icon.setAttribute("data-lucide", iconName);

  element.appendChild(icon);

  createLucideIcons(element);
}

function getStorageItem(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);

    return value !== null ? value : fallback;
  } catch {
    return fallback;
  }
}

function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function applySavedPreferences() {
  const savedTheme = getStorageItem("theme", "light");
  const savedDirection = getStorageItem("direction", "ltr");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  document.documentElement.dir = savedDirection === "rtl" ? "rtl" : "ltr";

  updateThemeLogos();
  updateToggleIcons();
}

function updateThemeLogos() {
  const headerLogo = document.getElementById("headerLogo");
  const footerLogo = document.getElementById("footerLogo");

  const isDark = document.body.classList.contains("dark-mode");

  const rootPath = document.body.dataset.root || "./";

  const logoPath = isDark
    ? `${rootPath}images/logo1.png`
    : `${rootPath}images/logo.png`;

  if (headerLogo) {
    headerLogo.src = logoPath;
  }

  if (footerLogo) {
    footerLogo.src = logoPath;
  }
}

function initializeNavbar() {
  const darkToggle = document.getElementById("darkToggle");

  const rtlToggle = document.getElementById("rtlToggle");

  const menuToggle = document.getElementById("menuToggle");

  const navLinks = document.getElementById("navLinks");

  const mobileQuote = document.querySelector(".mobile-quote");

  const dropdowns = document.querySelectorAll(".dropdown");

  setActiveNavLink();
  updateThemeLogos();
  updateToggleIcons();

  if (darkToggle) {
    setupDarkMode(darkToggle);
  }

  if (rtlToggle) {
    setupRTL(rtlToggle);
  }

  if (menuToggle && navLinks) {
    setupMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns);
  }

  setupMobileDropdowns(dropdowns);
}

function updateToggleIcons() {
  const darkToggle = document.getElementById("darkToggle");

  const menuToggle = document.getElementById("menuToggle");

  const navLinks = document.getElementById("navLinks");

  if (darkToggle) {
    const isDark = document.body.classList.contains("dark-mode");

    setLucideIcon(darkToggle, isDark ? "sun" : "moon");

    darkToggle.title = isDark ? "Light Mode" : "Dark Mode";

    darkToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  }

  if (menuToggle) {
    const isOpen = navLinks && navLinks.classList.contains("active");

    setLucideIcon(menuToggle, isOpen ? "x" : "menu");

    menuToggle.title = isOpen ? "Close Menu" : "Menu";

    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }
}

function setupDarkMode(darkToggle) {
  darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    setStorageItem("theme", isDark ? "dark" : "light");

    updateThemeLogos();
    updateToggleIcons();
  });
}

function setupRTL(rtlToggle) {
  rtlToggle.addEventListener("click", () => {
    const currentDirection = document.documentElement.dir || "ltr";

    const newDirection = currentDirection === "rtl" ? "ltr" : "rtl";

    document.documentElement.dir = newDirection;

    setStorageItem("direction", newDirection);

    closeAllDropdowns();
  });
}

function setupMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns) {
  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    menuToggle.title = isOpen ? "Close Menu" : "Menu";

    if (mobileQuote) {
      mobileQuote.classList.toggle("active", isOpen);
    }

    setLucideIcon(menuToggle, isOpen ? "x" : "menu");
  });

  navLinks.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");

    if (!clickedLink) {
      return;
    }

    const parentDropdown = clickedLink.closest(".dropdown");

    const isDropdownTrigger =
      clickedLink.classList.contains("dropdown-trigger");

    if (window.innerWidth <= 1024 && parentDropdown && isDropdownTrigger) {
      return;
    }

    if (window.innerWidth <= 1024) {
      closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns);
    }
  });

  if (mobileQuote) {
    mobileQuote.addEventListener("click", (event) => {
      const clickedLink = event.target.closest("a");

      if (!clickedLink) {
        return;
      }

      if (window.innerWidth <= 1024) {
        closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns);
      }
    });
  }

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 1024) {
      return;
    }

    if (!navLinks.classList.contains("active")) {
      return;
    }

    const header = document.querySelector(".site-header");

    if (header && !header.contains(event.target)) {
      closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns);
    }
  });
}

function closeMobileMenu(menuToggle, navLinks, mobileQuote, dropdowns) {
  if (navLinks) {
    navLinks.classList.remove("active");
  }

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open menu");

    menuToggle.title = "Menu";

    setLucideIcon(menuToggle, "menu");
  }

  if (mobileQuote) {
    mobileQuote.classList.remove("active");
  }

  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove("active");

    const trigger = dropdown.querySelector(":scope > .dropdown-trigger");

    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  });
}

function setupMobileDropdowns(dropdowns) {
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(":scope > .dropdown-trigger");

    const dropdownMenu = dropdown.querySelector(".dropdown-menu");

    if (!trigger || !dropdownMenu) {
      return;
    }

    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", (event) => {
      if (window.innerWidth > 1024) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");

          const otherTrigger = otherDropdown.querySelector(
            ":scope > .dropdown-trigger",
          );

          if (otherTrigger) {
            otherTrigger.setAttribute("aria-expanded", "false");
          }
        }
      });

      const isOpen = dropdown.classList.toggle("active");

      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove("active");

    const trigger = dropdown.querySelector(":scope > .dropdown-trigger");

    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  });
}

function setActiveNavLink() {
  const currentPage =
    window.location.pathname.split("/").pop().toLowerCase() || "index.html";

  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  });

  const homeDropdown = document.querySelector(".nav-links .dropdown");

  const homeTrigger = homeDropdown?.querySelector(":scope > .dropdown-trigger");

  const homePages = ["index.html", "home2.html"];

  if (homePages.includes(currentPage)) {
    if (homeTrigger) {
      homeTrigger.classList.add("active");

      homeTrigger.setAttribute("aria-current", "page");
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      try {
        const linkPage = new URL(link.href, window.location.href).pathname
          .split("/")
          .pop()
          .toLowerCase();

        if (linkPage === currentPage) {
          link.setAttribute("aria-current", "page");
        }
      } catch {}
    });

    return;
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href === "#" || href.startsWith("javascript:")) {
      return;
    }

    try {
      const linkPage = new URL(link.href, window.location.href).pathname
        .split("/")
        .pop()
        .toLowerCase();

      if (linkPage === currentPage) {
        link.classList.add("active");

        link.setAttribute("aria-current", "page");
      }
    } catch {}
  });
}

function initializeBackToTop() {
  const topButton = document.querySelector(".top-btn");

  if (!topButton) {
    return;
  }

  topButton.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
