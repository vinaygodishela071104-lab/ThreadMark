const threadmarkCatalog = document.querySelector(".threadmark-shop-catalog");

if (threadmarkCatalog) {
  const productGrid = threadmarkCatalog.querySelector("[data-product-grid]");

  const productCards = Array.from(
    threadmarkCatalog.querySelectorAll("[data-product-card]"),
  );

  const searchInput = threadmarkCatalog.querySelector(
    "#threadmark-product-search",
  );

  const clearSearchButton = threadmarkCatalog.querySelector(
    ".threadmark-shop-catalog__clear-search",
  );

  const sortSelect = threadmarkCatalog.querySelector(
    "#threadmark-sort-products",
  );

  const categoryButtons = threadmarkCatalog.querySelectorAll("[data-category]");

  const filterTrigger = threadmarkCatalog.querySelector(
    ".threadmark-shop-catalog__filter-trigger",
  );

  const filterPanel = threadmarkCatalog.querySelector(
    "#threadmark-filter-panel",
  );

  const filterClose = threadmarkCatalog.querySelector(
    ".threadmark-shop-catalog__filter-close",
  );

  const filterBackdrop = threadmarkCatalog.querySelector(
    "[data-filter-backdrop]",
  );

  const clearFiltersButton = threadmarkCatalog.querySelector(
    "[data-clear-filters]",
  );

  const applyFiltersButton = threadmarkCatalog.querySelector(
    "[data-apply-filters]",
  );

  const clearEmptyButton = threadmarkCatalog.querySelector(
    "[data-clear-empty-state]",
  );

  const resultCount = threadmarkCatalog.querySelector("[data-result-count]");

  const resultStatus = threadmarkCatalog.querySelector("[data-result-status]");

  const activeFilters = threadmarkCatalog.querySelector(
    "[data-active-filters]",
  );

  const emptyState = threadmarkCatalog.querySelector("[data-empty-state]");

  const loadMoreButton = threadmarkCatalog.querySelector("[data-load-more]");

  const loadMoreText = threadmarkCatalog.querySelector("[data-load-more-text]");

  const loadMoreIcon = threadmarkCatalog.querySelector("[data-load-more-icon]");

  const filterCount = threadmarkCatalog.querySelector("[data-filter-count]");

  const initialVisibleProducts = 8;

  const state = {
    category: "all",
    search: "",
    sort: "featured",
    personalization: [],
    price: [],
    color: [],
    visibleProducts: initialVisibleProducts,
  };

  const filterLabels = {
    personalization: {
      name: "Name embroidery",
      monogram: "Monogram",
      logo: "Logo embroidery",
    },
    price: {
      "under-1000": "Under ₹1,000",
      "1000-2000": "₹1,000 - ₹2,000",
      "above-2000": "Above ₹2,000",
    },
    color: {
      navy: "Navy",
      cream: "Cream",
      sage: "Sage",
      black: "Black",
    },
  };

  const products = productCards.map((card) => {
    return {
      element: card,
      id: card.dataset.id,
      name: card.dataset.name.toLowerCase(),
      category: card.dataset.category,
      categoryLabel: card.dataset.categoryLabel.toLowerCase(),
      description: card.dataset.description.toLowerCase(),
      price: Number(card.dataset.price),
      personalization: card.dataset.personalization
        .split(",")
        .map((item) => item.trim()),
      colors: card.dataset.colors.split(",").map((item) => item.trim()),
      featured: Number(card.dataset.featured),
      newest: Number(card.dataset.newest),
    };
  });

  const getPriceRange = (price) => {
    if (price < 1000) {
      return "under-1000";
    }

    if (price <= 2000) {
      return "1000-2000";
    }

    return "above-2000";
  };

  const getFilteredProducts = () => {
    const searchTerm = state.search.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
      const searchableContent = [
        product.name,
        product.categoryLabel,
        product.description,
        ...product.personalization,
        ...product.colors,
      ].join(" ");

      const matchesCategory =
        state.category === "all" || product.category === state.category;

      const matchesSearch =
        !searchTerm || searchableContent.includes(searchTerm);

      const matchesPersonalization =
        !state.personalization.length ||
        state.personalization.some((item) =>
          product.personalization.includes(item),
        );

      const matchesPrice =
        !state.price.length ||
        state.price.includes(getPriceRange(product.price));

      const matchesColor =
        !state.color.length ||
        state.color.some((item) => product.colors.includes(item));

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPersonalization &&
        matchesPrice &&
        matchesColor
      );
    });

    return filteredProducts.sort((firstProduct, secondProduct) => {
      if (state.sort === "newest") {
        return secondProduct.newest - firstProduct.newest;
      }

      if (state.sort === "price-low") {
        return firstProduct.price - secondProduct.price;
      }

      if (state.sort === "price-high") {
        return secondProduct.price - firstProduct.price;
      }

      if (state.sort === "name-az") {
        return firstProduct.name.localeCompare(secondProduct.name);
      }

      return secondProduct.featured - firstProduct.featured;
    });
  };

  const getCategoryCount = (category) => {
    if (category === "all") {
      return products.length;
    }

    return products.filter((product) => product.category === category).length;
  };

  const updateCategoryCounts = () => {
    categoryButtons.forEach((button) => {
      const category = button.dataset.category;

      const countElement = button.querySelector(
        `[data-category-count="${category}"]`,
      );

      if (countElement) {
        countElement.textContent = getCategoryCount(category);
      }
    });
  };

  const getActiveFilterItems = () => {
    const items = [];

    Object.entries(filterLabels).forEach(([group, labels]) => {
      state[group].forEach((value) => {
        items.push({
          group,
          value,
          label: labels[value],
        });
      });
    });

    return items;
  };

  const updateActiveFilters = () => {
    const items = getActiveFilterItems();

    filterCount.textContent = items.length;
    filterCount.hidden = items.length === 0;

    if (!items.length) {
      activeFilters.hidden = true;
      activeFilters.innerHTML = "";
      return;
    }

    activeFilters.hidden = false;

    activeFilters.innerHTML = items
      .map(
        (item) => `
          <span class="threadmark-shop-catalog__active-filter">
            ${item.label}

            <button
              type="button"
              aria-label="Remove ${item.label} filter"
              data-remove-filter-group="${item.group}"
              data-remove-filter-value="${item.value}"
            >
              <i data-lucide="x" aria-hidden="true"></i>
            </button>
          </span>
        `,
      )
      .join("");

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  };

  const updateFilterInputs = () => {
    const inputs = threadmarkCatalog.querySelectorAll('input[type="checkbox"]');

    inputs.forEach((input) => {
      input.checked = state[input.name].includes(input.value);
    });
  };

  const updateLoadMoreButton = (filteredProductCount) => {
    const allProductsVisible = state.visibleProducts >= filteredProductCount;

    const initialViewContainsAllProducts =
      filteredProductCount <= initialVisibleProducts;

    if (initialViewContainsAllProducts) {
      loadMoreButton.hidden = true;
      return;
    }

    loadMoreButton.hidden = false;

    if (allProductsVisible) {
      loadMoreText.textContent = "View less products";
      loadMoreIcon.setAttribute("data-lucide", "arrow-up");
      loadMoreButton.setAttribute("aria-label", "View fewer products");
    } else {
      loadMoreText.textContent = "Load more products";
      loadMoreIcon.setAttribute("data-lucide", "arrow-down");
      loadMoreButton.setAttribute("aria-label", "Load more products");
    }

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  };

  const updateCatalog = (announce = true) => {
    const filteredProducts = getFilteredProducts();

    const visibleProducts = filteredProducts.slice(0, state.visibleProducts);

    const visibleIds = new Set(visibleProducts.map((product) => product.id));

    products.forEach((product) => {
      const shouldShow = visibleIds.has(product.id);

      product.element.hidden = !shouldShow;
      product.element.setAttribute("aria-hidden", String(!shouldShow));
    });

    const resultText = `${filteredProducts.length} ${
      filteredProducts.length === 1 ? "product" : "products"
    } found`;

    resultCount.textContent = resultText;

    if (announce) {
      resultStatus.textContent = `${resultText}.`;
    }

    productGrid.hidden = filteredProducts.length === 0;
    emptyState.hidden = filteredProducts.length > 0;

    updateLoadMoreButton(filteredProducts.length);
    updateActiveFilters();
  };

  const resetVisibleProducts = () => {
    state.visibleProducts = initialVisibleProducts;
  };

  const openFilters = () => {
    filterPanel.classList.add("is-open");
    filterPanel.setAttribute("aria-hidden", "false");
    filterBackdrop.hidden = false;
    filterTrigger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    filterClose.focus();
  };

  const closeFilters = () => {
    filterPanel.classList.remove("is-open");
    filterPanel.setAttribute("aria-hidden", "true");
    filterBackdrop.hidden = true;
    filterTrigger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    filterTrigger.focus();
  };

  const clearAllFilters = () => {
    state.category = "all";
    state.search = "";
    state.personalization = [];
    state.price = [];
    state.color = [];

    searchInput.value = "";
    clearSearchButton.hidden = true;

    categoryButtons.forEach((button) => {
      const isActive = button.dataset.category === "all";

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    updateFilterInputs();
    resetVisibleProducts();
    updateCatalog();
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;

      categoryButtons.forEach((categoryButton) => {
        const isActive = categoryButton.dataset.category === state.category;

        categoryButton.classList.toggle("is-active", isActive);
        categoryButton.setAttribute("aria-pressed", String(isActive));
      });

      resetVisibleProducts();
      updateCatalog();
    });
  });

  searchInput.addEventListener("input", () => {
    state.search = searchInput.value;
    clearSearchButton.hidden = !state.search;

    resetVisibleProducts();
    updateCatalog();
  });

  clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    state.search = "";
    clearSearchButton.hidden = true;

    resetVisibleProducts();
    updateCatalog();

    searchInput.focus();
  });

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;

    resetVisibleProducts();
    updateCatalog();
  });

  threadmarkCatalog
    .querySelectorAll('input[type="checkbox"]')
    .forEach((input) => {
      input.addEventListener("change", () => {
        state[input.name] = Array.from(
          threadmarkCatalog.querySelectorAll(
            `input[name="${input.name}"]:checked`,
          ),
        ).map((checkedInput) => checkedInput.value);

        resetVisibleProducts();
        updateCatalog();
      });
    });

  filterTrigger.addEventListener("click", openFilters);

  filterClose.addEventListener("click", closeFilters);

  filterBackdrop.addEventListener("click", closeFilters);

  applyFiltersButton.addEventListener("click", closeFilters);

  clearFiltersButton.addEventListener("click", () => {
    state.personalization = [];
    state.price = [];
    state.color = [];

    updateFilterInputs();
    resetVisibleProducts();
    updateCatalog();
  });

  clearEmptyButton.addEventListener("click", clearAllFilters);

  loadMoreButton.addEventListener("click", () => {
    const filteredProducts = getFilteredProducts();

    const allProductsVisible = state.visibleProducts >= filteredProducts.length;

    if (allProductsVisible) {
      state.visibleProducts = initialVisibleProducts;
      updateCatalog();

      threadmarkCatalog.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    state.visibleProducts += 4;
    updateCatalog();

    loadMoreButton.focus();
  });

  activeFilters.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-filter-group]");

    if (!removeButton) {
      return;
    }

    const group = removeButton.dataset.removeFilterGroup;
    const value = removeButton.dataset.removeFilterValue;

    state[group] = state[group].filter((item) => item !== value);

    updateFilterInputs();
    resetVisibleProducts();
    updateCatalog();
  });

  productGrid.addEventListener("click", (event) => {
    const wishlistButton = event.target.closest("[data-wishlist]");

    if (!wishlistButton) {
      return;
    }

    wishlistButton.classList.toggle("is-active");

    const card = wishlistButton.closest("[data-product-card]");

    const productName = card.dataset.name;
    const isActive = wishlistButton.classList.contains("is-active");

    wishlistButton.setAttribute(
      "aria-label",
      isActive
        ? `Remove ${productName} from wishlist`
        : `Add ${productName} to wishlist`,
    );
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && filterPanel.classList.contains("is-open")) {
      closeFilters();
    }
  });

  updateCategoryCounts();
  updateFilterInputs();
  updateCatalog(false);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}
const customizationHighlight = document.querySelector(
  ".threadmark-customization-highlight",
);

if (customizationHighlight) {
  const threadButtons = customizationHighlight.querySelectorAll(
    ".threadmark-customization-highlight__thread-color",
  );

  const previewText = customizationHighlight.querySelector(
    ".threadmark-customization-highlight__preview-text",
  );

  threadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      threadButtons.forEach((threadButton) => {
        threadButton.classList.remove("is-active");
        threadButton.setAttribute("aria-pressed", "false");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");

      const selectedColor = button.style.getPropertyValue("--thread-color");

      previewText.style.color = selectedColor;
    });
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}
