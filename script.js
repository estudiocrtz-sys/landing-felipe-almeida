const email = "contato@felipealmeida.design";
const copyButton = document.querySelector("[data-copy-email]");
const revealElements = document.querySelectorAll(".reveal");

function markAsVisible() {
  revealElements.forEach((element, index) => {
    window.setTimeout(() => {
      element.classList.add("is-visible");
    }, index * 120);
  });
}

async function copyEmail() {
  if (!copyButton) return;

  try {
    await navigator.clipboard.writeText(email);
  } catch (error) {
    const fallbackInput = document.createElement("textarea");
    fallbackInput.value = email;
    fallbackInput.setAttribute("readonly", "");
    fallbackInput.style.position = "fixed";
    fallbackInput.style.opacity = "0";
    document.body.appendChild(fallbackInput);
    fallbackInput.select();
    document.execCommand("copy");
    document.body.removeChild(fallbackInput);
  }

  const originalText = copyButton.textContent;
  copyButton.textContent = "Copiado";
  copyButton.disabled = true;

  window.setTimeout(() => {
    copyButton.textContent = originalText;
    copyButton.disabled = false;
  }, 1800);
}

function setupSmoothScroll() {
  const projectButton = document.querySelector("[data-scroll-target]");
  if (!projectButton) return;

  projectButton.addEventListener("click", (event) => {
    const target = document.querySelector(projectButton.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  markAsVisible();
  setupSmoothScroll();

  if (copyButton) {
    copyButton.addEventListener("click", copyEmail);
  }
});
