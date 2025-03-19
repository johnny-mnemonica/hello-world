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

// Font Face Observer

const neuebit = new FontFaceObserver('PP Neuebit', {
  weight: 300
});

const neuebitBold = new FontFaceObserver('PP Neuebit', {
  weight: "bold"
});

neuebit.load().then(function () {
  document.documentElement.classList.add('body-font-loaded');
  sessionStorage.setItem('fonts-loaded', true);
  console.log("fonts loaded")
}).catch(function () {
  document.documentElement.classList.add('fallback');;
});

neuebitBold.load().then(function () {
  document.documentElement.classList.add('heading-font-loaded');
}).catch(function () {
  console.log('PP Neuebit failed to load.');
});