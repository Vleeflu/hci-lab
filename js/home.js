document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initVideoCarousel();

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
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
});

function initHeroSlider() {
  const heroSlide = document.querySelector(".hero-slide");
  const dotsContainer = document.getElementById("hero-dots");

  const slides = [
    {
      title: "Sky Vision X7",
      subtitle: "Better camera, better quality",
      ctaText: "Check now",
      image: "img/1.jpg"
    },
    {
      title: "Sky Eagle M1",
      subtitle: "Stability in the harshest winds",
      ctaText: "Check now",
      image: "img/2.jpeg"
    },
    {
      title: "Raptor K7",
      subtitle: "High speed. High precision",
      ctaText: "Check now",
      image: "img/3.png"
    },
    {
      title: "Creator XL and Creator L",
      subtitle: "Suitable for any occasion",
      ctaText: "Check now",
      image: "img/4.jpg"
    },
    {
      title: "Dialga Super GX",
      subtitle: "Peak performance in every flight",
      ctaText: "Check now",
      image: "img/5.jpg"
    }
  ];

  let currentIndex = 0;
  let heroIntervalId = null;

  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.className = "hero-dot" + (idx === 0 ? " active" : "");
    dot.type = "button";
    dot.onclick = () => goToSlide(idx, false);
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll(".hero-dot"));

  function renderSlide(index) {
    const slide = slides[index];
    
    heroSlide.style.opacity = '0';
    
    setTimeout(() => {
      heroSlide.style.backgroundImage = `url("${slide.image}")`;
      heroSlide.innerHTML = `
        <div class="hero-content">
          <h1>${slide.title}</h1>
          <p>${slide.subtitle}</p>
          <a href="products.html" class="cta">${slide.ctaText}</a>
        </div>
      `;
      dots.forEach((d, i) => d.classList.toggle("active", i === index));
      
      heroSlide.style.opacity = '1';
    }, 300);
  }

  function goToSlide(idx, restart = true) {
    currentIndex = (idx + slides.length) % slides.length;
    renderSlide(currentIndex);
    if (restart) restartAutoplay();
  }

  function nextSlide() { goToSlide(currentIndex + 1, false); }
  function startAutoplay() { heroIntervalId = setInterval(nextSlide, 6000); }
  function stopAutoplay() { clearInterval(heroIntervalId); heroIntervalId = null; }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  dotsContainer.addEventListener("mouseenter", stopAutoplay);
  dotsContainer.addEventListener("mouseleave", startAutoplay);

  renderSlide(currentIndex);
  startAutoplay();
}

function initVideoCarousel() {
  const row = document.getElementById("video-row");
  if (!row) return;

  const [leftVideo, centerVideo, rightVideo] = row.querySelectorAll("video");

  const videos = [
    { id: 0, video: "vid/1.mp4"},
    { id: 1, video: "vid/2.mp4"},
    { id: 2, video: "vid/3.mp4"},
    { id: 2, video: "vid/4.mp4"},
    { id: 2, video: "vid/5.mp4"}
  ];

  let centerIndex = 0;
  let intervalId = null;
  const getIndex = i => (i + videos.length) % videos.length;

  function setVideo(el, data, isCenter = false) {
    el.src = data.video;
    el.muted = true;
    el.loop = true;
    el.autoplay = true;
    el.load();
    el.play().catch(() => null);
    el.dataset.videoId = data.id;
  }

  function render() {
    setVideo(leftVideo, videos[getIndex(centerIndex - 1)], false);
    setVideo(centerVideo, videos[getIndex(centerIndex)], true);
    setVideo(rightVideo, videos[getIndex(centerIndex + 1)], false);
  }

  function goToIndex(newIndex, restart = true) {
    centerIndex = getIndex(newIndex);
    render();
    if (restart) restartAutoplay();
  }

  leftVideo.addEventListener("click", () => {
    goToIndex(centerIndex - 1);
  });

  rightVideo.addEventListener("click", () => {
    goToIndex(centerIndex + 1);
  });

  function startAutoplay() {
    if (intervalId) return;
    intervalId = setInterval(() => {
      goToIndex(centerIndex + 1, false);
    }, 6000);
  }

  function stopAutoplay() {
    clearInterval(intervalId);
    intervalId = null;
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  row.addEventListener("mouseenter", stopAutoplay);
  row.addEventListener("mouseleave", startAutoplay);

  render();
  startAutoplay();
}
