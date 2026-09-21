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
