document.querySelectorAll('slideshow-component').forEach(slider => {
  const container = slider.querySelector('.slider');
  if (!container) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('dragging');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('dragging');
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('dragging');
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // adjust speed
    container.scrollLeft = scrollLeft - walk;
  });

  // Mobile swipe
  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', (e) => {
    let touchEndX = e.changedTouches[0].clientX;
    let diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      const direction = diff > 0 ? 'next' : 'prev';
      slider.querySelector(`.slider-button--${direction}`)?.click();
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll('[id^="Slider-"]');

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slider__slide");
    const dots = document.querySelectorAll(
      `.slider-counter__link--dots[aria-controls="${slider.id}"]`
    );

    // 1. Click on dot => scroll to correct slide
    dots.forEach((dot, index) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        const slide = slides[index];
        if (slide) {
          slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
          updateActiveDot(index);
        }
      });
    });

    // 2. Update active dot manually (called after scroll or click)
    function updateActiveDot(activeIndex) {
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === activeIndex);
      });
    }

    // 3. Optional: detect scroll and auto update active dot
    let debounce;
    slider.addEventListener("scroll", () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const sliderRect = slider.getBoundingClientRect();
        let closestIndex = 0;
        let closestDistance = Infinity;

        slides.forEach((slide, i) => {
          const rect = slide.getBoundingClientRect();
          const distance = Math.abs(rect.left - sliderRect.left);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        });

        updateActiveDot(closestIndex);
      }, 100);
    });
  });
});
