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

document.addEventListener("DOMContentLoaded", injectServiceAreasBar);

const formAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";
const navigation = document.querySelector(".site-navigation");
const menuToggle = document.querySelector(".menu-toggle");
const dropdownItems = document.querySelectorAll("[data-dropdown]");
const emailDropdown = document.querySelector("[data-email-dropdown]");
const emailButton = emailDropdown?.querySelector("button");
const copyEmailButtons = document.querySelectorAll("[data-copy-email]");
const contactForm = document.querySelector("#contact-form");
const feedbackBox = document.querySelector("#form-feedback");
const serviceSelect = document.querySelector("#service-select");

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

menuToggle?.addEventListener("click", () => {
  const isOpen = !navigation?.classList.contains("is-open");
  setMenuState(Boolean(isOpen));
});

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

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-dropdown]")) {
    closeDropdowns();
  }

  if (!event.target.closest("[data-email-dropdown]")) {
    emailDropdown?.classList.remove("is-open");
    emailButton?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    setMenuState(false);
  }
});

emailButton?.addEventListener("click", () => {
  const nextState = !emailDropdown.classList.contains("is-open");
  emailDropdown.classList.toggle("is-open", nextState);
  emailButton.setAttribute("aria-expanded", String(nextState));
});

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

const params = new URLSearchParams(window.location.search);
const preselectedService = params.get("service");

if (serviceSelect && preselectedService) {
  const matchingOption = Array.from(serviceSelect.options).find((option) => option.value === preselectedService || option.text === preselectedService);

  if (matchingOption) {
    serviceSelect.value = matchingOption.value || matchingOption.text;
  }
}

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

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const submitButton = contactForm.querySelector(".form-submit-button");

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const website = String(formData.get("website") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !website || !service || !message) {
    setFeedback("Please complete all required fields before sending your inquiry.", "error");
    return;
  }

  if (!isValidUrl(website)) {
    setFeedback("Please enter a valid website URL, including https://.", "error");
    return;
  }

  submitButton.disabled = true;
  setFeedback("Sending your inquiry...", null);

  try {
    // Prepare JSON payload with form data
    const payload = {
      name: name,
      email: email,
      website: website,
      service: service,
      message: message,
      timestamp: new Date().toISOString()
    };

    // Send to Google Sheets via fetch POST request with CORS mode
    const response = await fetch("https://script.google.com/macros/s/AKfycbzCLlkDdRgwjQVjPfIcd3uNBiZMzcSeCPVnp9zC3h1ZKsHqLnpnI1fJ0yK1A9hiTJxc/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // With no-cors mode, we can't check response status, so we assume success
    // Reset form after successful submission
    contactForm.reset();

    if (serviceSelect && preselectedService) {
      serviceSelect.value = "";
    }

    // Show success alert
    alert("Message Sent Successfully");

    setFeedback("Your inquiry was sent successfully. Jannatul will respond through WhatsApp or email.", "success");
  } catch (error) {
    console.error("Form submission error:", error);
    setFeedback(error.message || "Unable to send your inquiry right now. Please try again.", "error");
  } finally {
    submitButton.disabled = false;
  }
});
