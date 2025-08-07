document.addEventListener('DOMContentLoaded', function () {
  var sectionElements = document.querySelectorAll('[id^="shopify-section-"]');

  sectionElements.forEach(function (sectionEl) {
    var carouselWrapper = sectionEl.querySelector('.owl-carousel');
    if (!carouselWrapper) return;

    var settingsEl = sectionEl.querySelector('[data-carousel-settings]');
    var itemsCount = settingsEl ? parseInt(settingsEl.dataset.itemsCount) || 4 : 4;

    var $carousel = $(carouselWrapper);

    $carousel.owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      slideBy: 1, // ✅ ensures only 1 item slides per click
      responsive: {
        0: { items: 1 },
        768: { items: itemsCount }
      }
    });

    // ✅ Use Owl’s native next/prev triggers (slide by 1)
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
