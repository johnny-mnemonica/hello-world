const savedSliderValue = localStorage.getItem("sliderValue");
const savedLightness = localStorage.getItem("lightness");
const savedSaturation = localStorage.getItem("saturation");
const savedSliderEnabled = localStorage.getItem("sliderEnabled") === "true";
const savedBrightnessMode = localStorage.getItem("brightnessMode");

if (savedLightness && savedSaturation && savedBrightnessMode) {
  document.documentElement.setAttribute("data-theme", savedBrightnessMode === "dark-mode" ? "dark" : "light");
  savedSliderEnabled && savedSliderValue ? 
  document.querySelector("html").style.backgroundColor = `hsl(${parseInt(savedSliderValue, 10)}, ${savedSaturation}%, ${savedLightness}%)` : 
  document.querySelector("html").style.backgroundColor = `hsl(0, 0%, ${savedLightness}%)`;
} else {
  document.querySelector("html").setAttribute("data-theme", "light");
  document.querySelector("html").style.backgroundColor = '#fff';
  localStorage.clear();
}