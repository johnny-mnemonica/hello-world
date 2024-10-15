// TODOS: 
// Figure out color transitions.
// Figure out system to deal with text/link colors.
// Save color values into localstorage/cookies for persistance.  
// Finally: Replace default elements with custom designed icons and buttons. 

const colorSlider = document.getElementById("color-slider");
const sliderCheckbox = document.getElementById('enable-slider');
let sliderValue = parseInt(colorSlider.value, 10);
const brightnessModeRadios = document.querySelectorAll('input[name="brightness"]');
const darkModeRadio = document.getElementById('dark-mode');

// hsl saturation variables
const lightModeSaturation = 50;
const darkModeSaturation = 15;

// default values - light mode 
let lightness = 90 
let saturation = lightModeSaturation

function darkModeCheck() {
    if(darkModeRadio.checked) {
        saturation = darkModeSaturation
    } else {
        saturation = lightModeSaturation
    }
}

// add change event listener to enable/disable color slider
sliderCheckbox.addEventListener('change', function() {
    if(this.checked) {
        colorSlider.disabled = false;
        darkModeCheck();
        document.querySelector('html').style.backgroundColor = `hsl(${sliderValue}, ${saturation}%, ${lightness}%)`
    } else {
        sliderValue = colorSlider.value; // Store the value before disabling
        colorSlider.disabled = true;
        document.querySelector('html').style.backgroundColor = `hsl(0, 0%, ${lightness}%)`
    }
})
    
// add change event listener to each radio button
brightnessModeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            if(this.id == 'dark-mode') {
                sliderValue = colorSlider.value; // Store the value before disabling
                lightness = 15;
            } else {
                sliderValue = colorSlider.value; // Store the value before disabling
                lightness = 90
            }
            if(colorSlider.disabled) {
                document.querySelector('html').style.backgroundColor = `hsl(0, 0%, ${lightness}%)`
                document.querySelector('html').style.transition = 'all .25s linear'
            } else {
                darkModeCheck();
                document.querySelector('html').style.backgroundColor = `hsl(${sliderValue}, ${saturation}%, ${lightness}%)`
            }
        }   
    });
});

function updateSlider () {

    const sliderValue = parseInt(this.value, 10); 

    document.querySelector('html').style.backgroundColor = `hsl(${sliderValue}, ${saturation}%, ${lightness}%)`

}

colorSlider.addEventListener("input", updateSlider)