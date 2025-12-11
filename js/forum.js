document.addEventListener("DOMContentLoaded", () => {
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

  const pillBtns = document.querySelectorAll(".pill-btn");
  pillBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      pillBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  const pageButtons = document.querySelectorAll(".page-btn");
  pageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.textContent === "...") return;
      
      pageButtons.forEach(b => b.classList.remove("active"));
      
      if (btn.textContent !== "→") {
        btn.classList.add("active");
      }
    });
  });
});
