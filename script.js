const header = document.getElementById("siteHeader");
const lightbox = document.getElementById("lightbox");
const openLightbox = document.getElementById("openLightbox");
const closeLightbox = document.getElementById("closeLightbox");
const contactForm = document.getElementById("contactForm");
const sendButton = document.getElementById("sendButton");
const year = document.getElementById("year");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function showLightbox() {
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function hideLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

window.addEventListener("scroll", updateHeader);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideLightbox();
});

openLightbox.addEventListener("click", showLightbox);
closeLightbox.addEventListener("click", hideLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) hideLightbox();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendButton.textContent = "Message Sent";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
year.textContent = new Date().getFullYear();
updateHeader();
