const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
const emailForm = document.querySelector(".email-form");
const emailInput = document.querySelector("#email-input");
const formStatus = document.querySelector(".form-status");
const revealItems = document.querySelectorAll(".reveal");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.classList.toggle("is-open");
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
    });
  });
}

if (emailForm && emailInput) {
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!emailInput.value.trim()) {
      emailInput.focus();
      if (formStatus) {
        formStatus.textContent = "Enter your email to unlock updates and product drops.";
      }
      return;
    }

    emailInput.value = "";
    emailInput.placeholder = "Email address";
    if (formStatus) {
      formStatus.textContent = "You’re in. Watch for wellness tips and exclusive drops.";
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
