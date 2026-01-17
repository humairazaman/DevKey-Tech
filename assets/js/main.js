// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("show"));
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll (for any #anchor links in future)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Navbar shadow on scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 8);
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      io.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => io.observe(el));
// ===============================
// Contact Form Validation + Message Auto Hide
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");

  // Agar contact page par form nahi hai to skip
  if (!form || !statusEl) return;

  function setError(input, msg) {
    const field = input.closest(".field");
    if (!field) return;

    const err = field.querySelector(".err");
    if (err) err.textContent = msg || "";

    field.classList.toggle("has-error", !!msg);
  }

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function showStatus(msg, type = "success") {
    statusEl.textContent = msg;

    // optional styling
    statusEl.style.color = type === "success" ? "#22c55e" : "#f87171";

    // ✅ Auto hide after 3 seconds
    setTimeout(() => {
      statusEl.textContent = "";
    }, 3000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name;
    const email = form.email;
    const service = form.service;
    const message = form.message;

    let ok = true;

    if (!name.value.trim()) {
      setError(name, "Name is required");
      ok = false;
    } else setError(name, "");

    if (!email.value.trim()) {
      setError(email, "Email is required");
      ok = false;
    } else if (!isEmail(email.value.trim())) {
      setError(email, "Enter a valid email");
      ok = false;
    } else setError(email, "");

    if (!service.value.trim()) {
      setError(service, "Select a service");
      ok = false;
    } else setError(service, "");

    if (!message.value.trim()) {
      setError(message, "Message is required");
      ok = false;
    } else setError(message, "");

    if (!ok) return;

    // ✅ Success Message (Few seconds only)
    showStatus("✅ Message sent successfully! We will contact you soon.", "success");

    // Reset form
    form.reset();
  });
});
