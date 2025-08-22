/* owl-after-recommendations.js */
(function () {
  function log(){ /* set true to see logs */ if(false){ console.log.apply(console, arguments); } }

  // Wait until jQuery and Owl are available
  function waitForOwl(callback, tries = 0) {
    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.owlCarousel) {
      callback();
    } else if (tries < 80) { // ~8s
      setTimeout(() => waitForOwl(callback, tries + 1), 100);
    } else {
      console.warn('[Owl Init] jQuery/Owl not found.');
    }
  }

  function initInRoot(rootEl) {
    if (!rootEl) return;

    const settingsEl = rootEl.querySelector('[data-carousel-settings]');
    const carouselEl = rootEl.querySelector('.owl-carousel');
    if (!settingsEl || !carouselEl) { log('[Owl Init] missing settings or carousel'); return; }

    const $ = window.jQuery;
    if (!($ && $.fn && $.fn.owlCarousel)) { log('[Owl Init] plugin missing at init time'); return; }

    const $carousel = $(carouselEl);
    if ($carousel.hasClass('owl-loaded')) { log('[Owl Init] already loaded'); return; }

    const itemsCount = parseInt(settingsEl.dataset.itemsCount || '4', 10);
    const isWithSide = !!rootEl.querySelector('.product-carousel-wrapper-side');

    const responsiveSettings = isWithSide
      ? { 0:{items:1}, 600:{items:1}, 800:{items:2}, 1048:{items:itemsCount} }
      : { 0:{items:1}, 600:{items:2}, 800:{items:3}, 1048:{items:itemsCount} };

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

    const prevBtn = rootEl.querySelector('.owl-prev-custom, .owl-prev-custom-side');
    const nextBtn = rootEl.querySelector('.owl-next-custom, .owl-next-custom-side');
    if (prevBtn) prevBtn.addEventListener('click', () => $(carouselEl).trigger('prev.owl.carousel'));
    if (nextBtn) nextBtn.addEventListener('click', () => $(carouselEl).trigger('next.owl.carousel'));

    log('[Owl Init] initialized OK');
  }

  // Observe each <product-recommendations> and init when .owl-carousel appears
  function observeRoot(rootEl) {
    if (!rootEl) return;
    const obs = new MutationObserver(() => {
      const hasCarousel = !!rootEl.querySelector('.owl-carousel');
      if (hasCarousel) {
        waitForOwl(() => initInRoot(rootEl));
      }
    });
    obs.observe(rootEl, { childList: true, subtree: true });
    // Also try immediately (server-rendered or already injected)
    if (rootEl.querySelector('.owl-carousel')) {
      waitForOwl(() => initInRoot(rootEl));
    }
  }

  // 1) Listen for Shopify event
  document.addEventListener('product-recommendations:loaded', (e) => {
    observeRoot(e.target);
  });

  // 2) Theme editor section reload
  document.addEventListener('shopify:section:load', (e) => {
    const section = document.getElementById(e.detail.sectionId);
    if (!section) return;
    section.querySelectorAll('product-recommendations').forEach(observeRoot);
  });

  // 3) On DOM ready, hook all existing elements
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('product-recommendations').forEach(observeRoot);
  });
})();
