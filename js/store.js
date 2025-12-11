document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
    const navLinksElements = navLinks.querySelectorAll("a");
    navLinksElements.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  const scrollWrapper = document.querySelector(".stores-scroll-wrapper");
  const scrollLeftBtn = document.querySelector(".scroll-left");
  const scrollRightBtn = document.querySelector(".scroll-right");

  if (scrollWrapper && scrollLeftBtn && scrollRightBtn) {
    const getScrollAmount = () => {
      const card = scrollWrapper.querySelector(".store-card");
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 24;
        return cardWidth + gap;
      }
      return scrollWrapper.clientWidth;
    };

    scrollLeftBtn.addEventListener("click", () => {
      scrollWrapper.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });

    scrollRightBtn.addEventListener("click", () => {
      scrollWrapper.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });

    const updateButtonVisibility = () => {
      const isAtStart = scrollWrapper.scrollLeft <= 10;
      const isAtEnd = 
        scrollWrapper.scrollLeft + scrollWrapper.clientWidth >= 
        scrollWrapper.scrollWidth - 10;

      scrollLeftBtn.style.opacity = isAtStart ? "0" : "1";
      scrollLeftBtn.style.pointerEvents = isAtStart ? "none" : "auto";
      
      scrollRightBtn.style.opacity = isAtEnd ? "0" : "1";
      scrollRightBtn.style.pointerEvents = isAtEnd ? "none" : "auto";
    };

    scrollWrapper.addEventListener("scroll", updateButtonVisibility);
    updateButtonVisibility();
  }
});
