// FlashDrop website settings — replace the sample values below with your real details.
const SITE_CONFIG = {
  // Add your real profile URLs. Keep the full https:// link.
  socials: {
    facebook: "https://www.facebook.com/Chamathndissanayake",
    tiktok: "https://www.tiktok.com/@chamathndissanayake",
    instagram: "https://www.instagram.com/chamathndissanayake/",
    whatsapp: "https://wa.me/94712200190"
  },
  // Put your signed/public Android APK at downloads/flashdrop-android.apk
  androidDownload: "downloads/flashdrop-android.apk"
};

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const platformContent = {
  android: {
    label: "ANDROID VERSION",
    title: "FlashDrop for Android",
    description: "The Android version is currently available. Download the app package and install it on your compatible Android device.",
    button: "Download for Android",
    footnote: "APK package · Current release",
    available: true
  },
  ios: {
    label: "IOS VERSION",
    title: "Not available yet",
    description: "FlashDrop for iOS has not been released. This platform will be listed here when a supported version becomes available.",
    button: "Coming soon",
    footnote: "No iOS download is available at this time.",
    available: false
  },
  windows: {
    label: "WINDOWS VERSION",
    title: "Not available yet",
    description: "A Windows version of FlashDrop is not currently available. Check back for future platform updates.",
    button: "Not available",
    footnote: "No Windows download is available at this time.",
    available: false
  },
  macos: {
    label: "MACOS VERSION",
    title: "Not available yet",
    description: "A macOS version of FlashDrop is not currently available. Check back for future platform updates.",
    button: "Not available",
    footnote: "No macOS download is available at this time.",
    available: false
  }
};

const platformButtons = document.querySelectorAll(".platform-option");
const downloadLabel = document.querySelector(".download-os-label");
const downloadTitle = document.getElementById("download-title");
const downloadDescription = document.getElementById("download-description");
const downloadButton = document.getElementById("download-button");
const downloadFootnote = document.getElementById("download-footnote");

function selectPlatform(os) {
  const data = platformContent[os];
  platformButtons.forEach(button => {
    const selected = button.dataset.os === os;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  downloadLabel.textContent = data.label;
  downloadTitle.textContent = data.title;
  downloadDescription.textContent = data.description;
  downloadButton.textContent = data.button + (data.available ? " ↓" : "");
  downloadButton.href = data.available ? SITE_CONFIG.androidDownload : "#";
  downloadButton.classList.toggle("disabled", !data.available);
  downloadButton.setAttribute("aria-disabled", String(!data.available));
  if (data.available) downloadButton.setAttribute("download", "");
  else downloadButton.removeAttribute("download");
  downloadFootnote.textContent = data.footnote;
}
platformButtons.forEach(button => button.addEventListener("click", () => selectPlatform(button.dataset.os)));
selectPlatform("android");

// Apply the profile URLs from SITE_CONFIG. Replace the sample URLs before publishing.
document.querySelectorAll("[data-social]").forEach(link => {
  const url = SITE_CONFIG.socials[link.dataset.social];
  if (url && url !== "#") {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});

// Simple reveal-on-scroll motion; content remains visible when reduced motion is preferred.
const revealItems = document.querySelectorAll(".feature-card,.screen-card,.steps article,.developer-photo,.developer-copy");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach(item => item.classList.add("reveal"));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
}
