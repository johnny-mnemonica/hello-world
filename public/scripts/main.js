// TODOS
// Figure out system to deal with link colors.
// Finally: Replace default elements with custom designed icons and buttons.
// Eventually - selectors for variables?

// HSL variables
const LIGHT_SATURATION = 70;
const DARK_SATURATION = 15;
const LIGHT_LIGHTNESS = 90;
const DARK_LIGHTNESS = 25;

const colorSlider = document.getElementById("color-slider");
const sliderCheckbox = document.getElementById("enable-slider");
const brightnessModeRadios = document.querySelectorAll('input[name="brightness"]');  
const darkModeRadio = document.getElementById("dark-mode");
let sliderValue = parseInt(colorSlider.value, 10);

// Default values - light mode
let lightness = LIGHT_LIGHTNESS;
let saturation = LIGHT_SATURATION;

function darkModeCheck() {
  saturation = darkModeRadio.checked
    ? DARK_SATURATION
    : LIGHT_SATURATION;
}

function savePreferences() {
  localStorage.setItem("sliderValue", sliderValue);
  localStorage.setItem("brightnessMode", darkModeRadio.checked ? "dark-mode" : "light-mode");
  localStorage.setItem("sliderEnabled", sliderCheckbox.checked);
  localStorage.setItem("lightness", lightness);
  localStorage.setItem("saturation", saturation);
}

function updateBackgroundColor() {
  document.querySelector(
    "html"
  ).style.backgroundColor = colorSlider.disabled
    ? `hsl(0, 0%, ${lightness}%)`
    : `hsl(${sliderValue}, ${saturation}%, ${lightness}%)`;
}

// Load saved UI preferences from localStorage
window.addEventListener("load", () => {
  const savedSliderValue = localStorage.getItem("sliderValue");
  const savedBrightnessMode = localStorage.getItem("brightnessMode");
  const isSliderEnabled = localStorage.getItem("sliderEnabled") === "true";

  if (savedSliderValue) {
    sliderValue = parseInt(savedSliderValue, 10);
    colorSlider.value = sliderValue;
  }

  if (savedBrightnessMode) {
    document.getElementById(savedBrightnessMode).checked = true;
    lightness = savedBrightnessMode === "dark-mode" ? DARK_LIGHTNESS : LIGHT_LIGHTNESS;
    document.documentElement.setAttribute(
      "data-theme",
      savedBrightnessMode === "dark-mode" ? "dark" : "light"
    );
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.querySelector("html").style.backgroundColor = '#fff';
    localStorage.clear();
  }

  sliderCheckbox.checked = isSliderEnabled;
  colorSlider.disabled = !isSliderEnabled;
});

// Listens for change in enable/disable slider checkbox
sliderCheckbox.addEventListener("change", function () {
  if (this.checked) {
    colorSlider.disabled = false;
  } else {
    sliderValue = colorSlider.value; // Store the value before disabling
    colorSlider.disabled = true;
  }
  darkModeCheck();
  updateBackgroundColor();
  savePreferences();
});

// Listens for change in light/dark mode radio buttons
brightnessModeRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.checked) {
      sliderValue = colorSlider.value // Store the value before making any changes
      lightness = this.id === "dark-mode" ? DARK_LIGHTNESS : LIGHT_LIGHTNESS;
      document.documentElement.setAttribute(
        "data-theme",
        this.id === "dark-mode" ? "dark" : "light"
      );
      darkModeCheck();
      updateBackgroundColor();
      savePreferences();
    }
  });
});

function updateSlider() {
  sliderValue = parseInt(this.value, 10);
  darkModeCheck()
  updateBackgroundColor();
  savePreferences();
}

colorSlider.addEventListener("input", updateSlider);

function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var session = "AM";

  if (h >= 12) {
    session = "PM";
  }

  if (h === 0) {
    h = 12;
  } else if (h > 12) {
    h = h - 12;
  }

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;

  var time = h + ":" + m + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);
}

showTime();

const pupils = document.querySelector("#pupils"); // Cache the element

let throttleTimeout;
let throttledMovePupils; // Declare this variable to hold the throttled function

function throttle(callback, delay) {
  return function (...args) {
    if (throttleTimeout) return; // Skip if already scheduled
    throttleTimeout = setTimeout(() => {
      callback(...args); // Execute the callback
      throttleTimeout = null; // Reset after execution
    }, delay);
  };
}

function movePupils(event) {
  const svg = pupils.closest("svg");
  const svgRect = svg.getBoundingClientRect();

  const svgCenterX = svgRect.left + svgRect.width / 2;
  const svgCenterY = svgRect.top + svgRect.height / 2;

  const angle = Math.atan2(event.clientY - svgCenterY, event.clientX - svgCenterX);
  const maxDistance = Math.min(svgRect.width, svgRect.height) / 10;

  const offsetX = Math.cos(angle) * maxDistance;
  const offsetY = Math.sin(angle) * maxDistance;

  pupils.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);
}

// Function to toggle mousemove listener based on screen width
function updatePupilMovement() {
  const isPupilsVisible = window.getComputedStyle(pupils).display !== 'none';
  
  // Create the throttled function once
  if (!throttledMovePupils) {
    throttledMovePupils = throttle(movePupils, 30);
  }

  if (isPupilsVisible) {
    document.addEventListener("mousemove", throttledMovePupils);
  } else {
    document.removeEventListener("mousemove", throttledMovePupils);
  }
}

// Initial check
updatePupilMovement();

// Optional: Listen for resize events to update the listener
window.addEventListener("resize", updatePupilMovement);


const toggleButton = document.getElementById("toggle-footer");
const footer = document.querySelector(".footer-slide");
const buttonContent = document.querySelector(".button-inner")

toggleButton.addEventListener("click", () => {
    if (footer.classList.contains("slide-in")) {
        footer.classList.remove("slide-in");
        footer.classList.add("slide-out");
    } else {
        footer.classList.remove("slide-out");
        footer.classList.add("slide-in");
    }
});
// let isFooterVisible = false;
// const footer = document.querySelector(".footer-slide");

// document.getElementById("toggle-footer").addEventListener("click", () => {
//   isFooterVisible = !isFooterVisible;
//   animateFooter(isFooterVisible);
// });

// function animateFooter(show) {
//   const start = performance.now();
//   const duration = 300; // Animation duration in ms

//   function slide(timestamp) {
//     const elapsed = timestamp - start;
//     const progress = Math.min(elapsed / duration, 1); // Progress from 0 to 1

//     // Calculate the Y position (hidden: -100%, visible: 0)
//     const translateY = show ? (1 - progress) * 100 : progress * 100;
//     footer.style.transform = `translateY(${translateY}%)`;

//     if (progress < 1) {
//       requestAnimationFrame(slide); // Continue animation
//     }
//   }

//   requestAnimationFrame(slide);
// }

