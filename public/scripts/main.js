// TODOS
// Figure out system to deal with link colors.
// Finally: Replace default elements with custom designed icons and buttons.
// Eventually - selectors for variables?

// HSL variables
const LIGHT_SATURATION = 50;
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
