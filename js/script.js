"use strict";

const themeToggle = document.querySelector(".theme-toggle");
const themeStorageKey = "thiranex-portfolio-theme";
const savedTheme = localStorage.getItem(themeStorageKey);
const applyTheme = (theme) => {
  const isLight = theme === "light";
  document.documentElement.dataset.theme = isLight ? "light" : "dark";
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", isLight ? "#f4f8fb" : "#071827");
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.setAttribute("aria-pressed", String(isLight));
    button.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
    const label = button.querySelector(".theme-label");
    const icon = button.querySelector(".theme-icon");
    if (label) label.textContent = isLight ? "Dark mode" : "Light mode";
    if (icon) icon.textContent = isLight ? "☾" : "☼";
  });
};

applyTheme(savedTheme === "light" ? "light" : "dark");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem(themeStorageKey, nextTheme);
    applyTheme(nextTheme);
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

if (menuToggle && navigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      closeMenu();
    }
  });
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.removeAttribute("data-state");

    if (!contactForm.checkValidity()) {
      formStatus.textContent = "Please complete each field with a valid email address.";
      formStatus.dataset.state = "error";
      contactForm.reportValidity();
      return;
    }

    formStatus.textContent = "Your details are valid. This demo does not send or store messages; a backend is needed for delivery.";
  });
}
