document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll("[data-carousel-id]");

  carousels.forEach((carousel) => {
    const sectionId = carousel.getAttribute("data-carousel-id");
    const wrapper = carousel.closest(`#${sectionId}`);
    const itemsCount = parseInt(
      wrapper.querySelector("[data-carousel-settings]").dataset.itemsCount
    );

    const isWithSide =
      wrapper.classList.contains("custom-wide-column") ||
      wrapper.classList.contains("with_side");

    const prevBtn = wrapper.querySelector(
      isWithSide ? ".owl-prev-custom-side" : ".owl-prev-custom"
    );
    const nextBtn = wrapper.querySelector(
      isWithSide ? ".owl-next-custom-side" : ".owl-next-custom"
    );

    const $carousel = $(carousel);

    // Destroy any existing instance to avoid duplicate initialization
    if ($carousel.hasClass("owl-loaded")) {
      $carousel.trigger("destroy.owl.carousel");
    }

    const responsiveSettings = isWithSide
      ? {
          0: { items: 1 },        // Phones
          500: { items: 2 },      // Small tablets
          900: { items: 3 },      // Tablets
          1200: { items: itemsCount } // Desktop uses the section setting
        }
      : {
          0: { items: 1 },
          500: { items: 2 },
          800: { items: 3 },
          1200: { items: itemsCount }
        };

    $carousel.owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      autoplay: false,
      smartSpeed: 600,
      responsive: responsiveSettings
    });

    prevBtn.addEventListener("click", () =>
      $carousel.trigger("prev.owl.carousel")
    );
    nextBtn.addEventListener("click", () =>
      $carousel.trigger("next.owl.carousel")
    );
  });
});
