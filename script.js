const body = document.body;
const themeButton = document.querySelector("#themeBtn");
const toast = document.querySelector("#toast");
const surprise = document.querySelector("#surprise");
const surpriseButton = document.querySelector("#surpriseBtn");
const closeSurpriseButton = document.querySelector("#closeSurprise");

let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function setTheme(isDark) {
    body.classList.toggle("dark", isDark);
    themeButton.textContent = isDark ? "🌙" : "☀️";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("ragi-theme", isDark ? "dark" : "light");
}

function toggleTheme() {
    setTheme(!body.classList.contains("dark"));
}

function setSurpriseVisibility(isVisible) {
    if (!isVisible) surpriseButton.focus();
    surprise.classList.toggle("open", isVisible);
    surprise.setAttribute("aria-hidden", String(!isVisible));
    if (isVisible) closeSurpriseButton.focus();
}

document.querySelector("#year").textContent = new Date().getFullYear();
themeButton.addEventListener("click", toggleTheme);
setTheme(localStorage.getItem("ragi-theme") === "dark");

document.querySelectorAll(".mini-btn").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.message));
});

surpriseButton.addEventListener("click", () => setSurpriseVisibility(true));
closeSurpriseButton.addEventListener("click", () => setSurpriseVisibility(false));
surprise.addEventListener("click", (event) => {
    if (event.target === surprise) setSurpriseVisibility(false);
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSurpriseVisibility(false);
});

let typedText = "";
document.addEventListener("keydown", (event) => {
    if (event.key.length !== 1) return;
    typedText = `${typedText}${event.key.toLowerCase()}`.slice(-4);
    if (typedText === "ragi") {
        showToast("✦ Secret message unlocked: keep creating! ♡");
        typedText = "";
    }
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.animate(
                [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
                { duration: 550, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
            );
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll("[data-reveal]").forEach((element) => {
        element.style.opacity = "0";
        observer.observe(element);
    });
}
