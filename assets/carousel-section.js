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

    // Initialize Owl Carousel for this specific carousel only
    $carousel.owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      slideBy: 1, // slide one item per click
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        800: { items: 3 },
        1048: { items: itemsCount }
      }
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
