// Inject floating service areas bar
const injectServiceAreasBar = () => {
  if (document.querySelector(".floating-service-areas-bar")) return;

  // Get the relative path from current page to root
  const pathname = window.location.pathname;
  const depth = (pathname.match(/\//g) || []).length - 1;
  const relativeRoot = depth > 1 ? "../".repeat(depth - 1) : "./";

  const barHTML = `
    <div class="floating-service-areas-bar">
      <a href="${relativeRoot}service-areas/usa/index.html" class="service-area-flag-btn" title="USA SEO Services" aria-label="USA Service Areas">🇺🇸</a>
      <a href="${relativeRoot}service-areas/canada/index.html" class="service-area-flag-btn" title="Canada SEO Services" aria-label="Canada Service Areas">🇨🇦</a>
      <a href="${relativeRoot}service-areas/australia/index.html" class="service-area-flag-btn" title="Australia SEO Services" aria-label="Australia Service Areas">🇦🇺</a>
    </div>
  `;

  const body = document.body;
  if (body) {
    body.insertAdjacentHTML("beforeend", barHTML);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  injectServiceAreasBar();
  initializeElements();
  attachEventListeners();
});

const formAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";
let navigation = null;
let menuToggle = null;
let dropdownItems = [];
let emailDropdown = null;
let emailButton = null;
let copyEmailButtons = [];
let contactForm = null;
let feedbackBox = null;
let serviceSelect = null;
let preselectedService = null;

// Initialize all form and navigation elements when DOM is ready
const initializeElements = () => {
  navigation = document.querySelector(".site-navigation");
  menuToggle = document.querySelector(".menu-toggle");
  dropdownItems = document.querySelectorAll("[data-dropdown]");
  emailDropdown = document.querySelector("[data-email-dropdown]");
  emailButton = emailDropdown?.querySelector("button");
  copyEmailButtons = document.querySelectorAll("[data-copy-email]");
  contactForm = document.querySelector("#contact-form");
  feedbackBox = document.querySelector("#form-feedback");
  serviceSelect = document.querySelector("#service-select");

  const params = new URLSearchParams(window.location.search);
  preselectedService = params.get("service");

  console.log("Elements initialized. Contact form:", contactForm ? "found" : "not found");
};

const setMenuState = (isOpen) => {
  if (!navigation || !menuToggle) return;

  navigation.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
};

const closeDropdowns = () => {
  dropdownItems.forEach((item) => {
    item.classList.remove("is-open");
    const trigger = item.querySelector(".dropdown-trigger");
    trigger?.setAttribute("aria-expanded", "false");
  });
};

const attachEventListeners = () => {
  console.log("Attaching event listeners...");

  // Menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = !navigation?.classList.contains("is-open");
      setMenuState(Boolean(isOpen));
    });
  }

  // Dropdown items
  dropdownItems.forEach((item) => {
    const trigger = item.querySelector(".dropdown-trigger");

    trigger?.addEventListener("click", () => {
      const isMobile = window.innerWidth <= 960;

      if (!isMobile) {
        const nextState = !item.classList.contains("is-open");
        closeDropdowns();
        item.classList.toggle("is-open", nextState);
        trigger.setAttribute("aria-expanded", String(nextState));
        return;
      }

      const nextState = !item.classList.contains("is-open");
      item.classList.toggle("is-open", nextState);
      trigger.setAttribute("aria-expanded", String(nextState));
    });
  });

  // Document click listeners
  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-dropdown]")) {
      closeDropdowns();
    }

    if (!event.target.closest("[data-email-dropdown]")) {
      emailDropdown?.classList.remove("is-open");
      emailButton?.setAttribute("aria-expanded", "false");
    }
  });

  // Window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      setMenuState(false);
    }
  });

  // Email button
  if (emailButton) {
    emailButton.addEventListener("click", () => {
      const nextState = !emailDropdown.classList.contains("is-open");
      emailDropdown.classList.toggle("is-open", nextState);
      emailButton.setAttribute("aria-expanded", String(nextState));
    });
  }

  // Copy email buttons
  copyEmailButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.getAttribute("data-copy-email");
      const originalLabel = button.textContent;

      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        button.textContent = "Email copied";
        window.setTimeout(() => {
          button.textContent = originalLabel;
        }, 1600);
      } catch {
        button.textContent = email;
      }
    });
  });

  // Pre-select service from URL parameter
  if (serviceSelect && preselectedService) {
    const matchingOption = Array.from(serviceSelect.options).find((option) => option.value === preselectedService || option.text === preselectedService);

    if (matchingOption) {
      serviceSelect.value = matchingOption.value || matchingOption.text;
    }
  }

  // Contact form submission - simple approach
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const data = {
        name: form.name.value,
        email: form.email.value,
        website: form.website.value,
        service: form.service.value,
        message: form.message.value
      };

      fetch("https://script.google.com/macros/s/AKfycbzCLlkDdRgwjQVjPfIcd3uNBiZMzcSeCPVnp9zC3h1ZKsHqLnpnI1fJ0yK1A9hiTJxc/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        alert("Message Sent Successfully");
        form.reset();
      })
      .catch(() => alert("Error!"));
    });
  }
};

const setFeedback = (message, type) => {
  if (!feedbackBox) return;

  feedbackBox.textContent = message;
  feedbackBox.classList.remove("is-success", "is-error");

  if (type) {
    feedbackBox.classList.add(type === "success" ? "is-success" : "is-error");
  }
};

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
