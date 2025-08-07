document.addEventListener('DOMContentLoaded', function () {
  // Loop through each Shopify section
  var sectionElements = document.querySelectorAll('[id^="shopify-section-"]');

  sectionElements.forEach(function (sectionEl) {
    var sectionId = sectionEl.id.replace('shopify-section-', '');
    var carouselEl = sectionEl.querySelector('[data-carousel-id="' + sectionId + '"]');
    if (!carouselEl) return;

    var $carousel = $(carouselEl);

    var settingsEl = sectionEl.querySelector('[data-carousel-settings]');
    var itemsCount = settingsEl ? parseInt(settingsEl.dataset.itemsCount) || 4 : 4;

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
      slideBy: 1, // ✅ Ensures it moves one item at a time
      responsive: {
        0: { items: 1 },
        768: { items: itemsCount }
      }
    });

    // Set up buttons scoped to this section only
    var prevBtn = sectionEl.querySelector('.owl-prev-custom, .owl-prev-custom-side');
    var nextBtn = sectionEl.querySelector('.owl-next-custom, .owl-next-custom-side');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        $carousel.trigger('prev.owl.carousel');
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        $carousel.trigger('next.owl.carousel');
      });
    }
  });
});
