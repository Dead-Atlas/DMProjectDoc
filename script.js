const themeBtn = document.getElementById("themeBtn");
const themeLabel = document.getElementById("themeLabel");
const copyBtn = document.getElementById("copyBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.add("theme-transitioning");

  const currentTheme = document.body.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.body.removeAttribute("data-theme");
    themeLabel.textContent = "THEME: LIGHT";
  } else {
    document.body.setAttribute("data-theme", "dark");
    themeLabel.textContent = "THEME: DARK";
  }

  setTimeout(() => {
    document.body.classList.remove("theme-transitioning");
  }, 500);
});

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("toast-show");
  setTimeout(() => {
    toast.classList.remove("toast-show");
  }, 2500);
}

copyBtn.addEventListener("click", () => {
  const codeText = document.getElementById("cppCode").innerText;
  navigator.clipboard.writeText(codeText).then(() => {
    copyBtn.textContent = "COPIED ✓";
    copyBtn.style.borderColor = "var(--text-code)";
    copyBtn.style.color = "var(--text-code)";
    showToast("✓ کپی شد!");

    setTimeout(() => {
      copyBtn.textContent = "COPY";
      copyBtn.style.borderColor = "";
      copyBtn.style.color = "";
    }, 2000);
  });
});

const progressBar = document.getElementById("scroll-progress");

window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  },
  { passive: true },
);

const cursorGlow = document.getElementById("cursor-glow");
let mouseX = 0,
  mouseY = 0;
let glowX = 0,
  glowY = 0;
let glowRaf = null;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!glowRaf) {
    glowRaf = requestAnimationFrame(animateGlow);
  }
});

function animateGlow() {
  const lerp = 0.12;
  glowX += (mouseX - glowX) * lerp;
  glowY += (mouseY - glowY) * lerp;
  cursorGlow.style.left = glowX + "px";
  cursorGlow.style.top = glowY + "px";
  const dist = Math.hypot(mouseX - glowX, mouseY - glowY);
  glowRaf = dist > 0.5 ? requestAnimationFrame(animateGlow) : null;
}

const h1 = document.querySelector(".header h1");
if (h1) {
  h1.setAttribute("data-text", h1.textContent);
}

document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll("[data-reveal]");
  revealEls.forEach((el) => el.classList.add("reveal-hidden"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-hidden");
          entry.target.classList.add("reveal-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealEls.forEach((el) => revealObserver.observe(el));
});

const tocLinks = document.querySelectorAll(".toc a");
const sections = document.querySelectorAll("section[id]");

function updateTOC() {
  const scrollY = window.scrollY;
  if (scrollY < 80) {
    tocLinks.forEach((a) => a.classList.remove("active"));
    return;
  }
  let current = null;
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (scrollY >= top) current = section.getAttribute("id");
  });
  tocLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}

window.addEventListener("scroll", updateTOC, { passive: true });


function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCount(el, target, duration) {
  const start = performance.now();
  const originalText = el.textContent;
  const prefix = originalText.replace(/[\d,]+/, "");

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const val = Math.round(easeOutCubic(progress) * target);
    el.textContent = originalText.replace(/[\d,]+/, val.toLocaleString("en"));
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = originalText; // restore original exact text
  }
  requestAnimationFrame(step);
}

const answerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/(\d[\d,]*)/);
        if (match) {
          const num = parseInt(match[1].replace(/,/g, ""), 10);
          if (num > 10) {
            animateCount(el, num, 1200);
          }
        }
        answerObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.6 },
);

document.querySelectorAll(".problem .answer").forEach((el) => {
  answerObserver.observe(el);
});
