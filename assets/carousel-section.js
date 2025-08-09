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

    // Better detection for "with side" — check for the actual side column
    const isWithSide = !!sectionEl.querySelector('.custom-column');

    // Responsive rules: be stricter when with-side is enabled
    const responsiveSettings = isWithSide
      ? {
          0:    { items: 1 },   // phones
          600:  { items: 1 },   // small tablets / large phones
          800:  { items: 2 },   // tablets
          1048: { items: itemsCount } // desktop (use admin setting)
        }
      : {
          0:    { items: 1 },
          600:  { items: 2 },
          800:  { items: 3 },
          1048: { items: itemsCount }
        };

    console.log('[carousel] init', sectionId, 'withSide=', isWithSide, 'itemsCount=', itemsCount, 'responsive=', responsiveSettings);

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
      responsiveBaseElement: window,
      responsive: responsiveSettings
    });

    // Force a refresh after init and after window load (fix timing/layout issues)
    setTimeout(function () {
      try { $carousel.trigger('refresh.owl.carousel'); } catch (e) { /* ignore */ }
      console.log('[carousel] post-init refresh', sectionId, 'carouselWidth=', carouselEl.offsetWidth, 'windowWidth=', window.innerWidth);
    }, 60);

    // On window load images/CSS are fully applied — refresh again
    window.addEventListener('load', function () {
      try { $carousel.trigger('refresh.owl.carousel'); } catch (e) {}
      console.log('[carousel] window.load refresh', sectionId, 'carouselWidth=', carouselEl.offsetWidth, 'windowWidth=', window.innerWidth);
    });

    // Debounced resize refresh
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        try { $carousel.trigger('refresh.owl.carousel'); } catch (e) {}
        console.log('[carousel] resize refresh', sectionId, 'carouselWidth=', carouselEl.offsetWidth, 'windowWidth=', window.innerWidth);
      }, 150);
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
