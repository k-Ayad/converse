document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('[id^="shopify-section-"]');

  sections.forEach((sectionEl) => {
    const sectionId = sectionEl.id.replace('shopify-section-', '');
    const carouselEl = sectionEl.querySelector(`[data-carousel-id="${sectionId}"]`);
    const settingsEl = sectionEl.querySelector('[data-carousel-settings]');

    if (!carouselEl || !settingsEl) return;

    const itemsCount = parseInt(settingsEl.dataset.itemsCount) || 4;
    const $carousel = $(carouselEl);

    // Prevent duplicate initialization
    if ($carousel.hasClass('owl-loaded')) return;

    // Check if this section is with-side mode
    const isWithSide = sectionEl.querySelector('.product-carousel-wrapper-side') !== null;

    // Updated responsive settings
    const responsiveSettings = isWithSide
      ? {
          0: { items: 1 },      // Phones
          500: { items: 2 },    // Small tablets
          900: { items: 3 },    // Tablets / small desktops
          1200: { items: itemsCount } // Large desktops
        }
      : {
          0: { items: 1 },
          500: { items: 2 },
          800: { items: 3 },
          1200: { items: itemsCount }
        };

    // Initialize Owl Carousel
    $carousel.owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      slideBy: 1,
      responsive: responsiveSettings // Removed responsiveBaseElement
    });

    // Scoped buttons to this section only
    const prevBtn = sectionEl.querySelector('.owl-prev-custom, .owl-prev-custom-side');
    const nextBtn = sectionEl.querySelector('.owl-next-custom, .owl-next-custom-side');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        $(carouselEl).trigger('prev.owl.carousel');
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        $(carouselEl).trigger('next.owl.carousel');
      });
    }
  });
});
