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

  const priorityBtn = document.querySelector(".panel-btn");
  const formSection = document.querySelector("#contact-form");

  if (priorityBtn && formSection) {
    priorityBtn.addEventListener("click", (e) => {
      e.preventDefault();
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});
