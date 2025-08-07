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
      responsive: {
        0: { items: 1 },
        768: { items: itemsCount }
      }
    });

    var currentIndex = 0;

    var prevBtn = sectionEl.querySelector('.owl-prev-custom, .owl-prev-custom-side');
    var nextBtn = sectionEl.querySelector('.owl-next-custom, .owl-next-custom-side');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        currentIndex = $carousel.find('.owl-item.active').first().index();
        $carousel.trigger('to.owl.carousel', [currentIndex - 1, 300, true]);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        currentIndex = $carousel.find('.owl-item.active').first().index();
        $carousel.trigger('to.owl.carousel', [currentIndex + 1, 300, true]);
      });
    }
  });
});
