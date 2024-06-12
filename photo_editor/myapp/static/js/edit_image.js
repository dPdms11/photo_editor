import db from './db.js';

let img = document.getElementById('image');

// Load file from IndexedDB
document.addEventListener('DOMContentLoaded', async () => {
    const file = await db.images.get(parseInt(img.name));
    img.src = URL.createObjectURL(file);
})

// Adjust brightness
function adjustBrightness(brightness) {
    const brightnessValue = document.getElementById('brightnessValue');
    brightnessValue.innerText = brightness - 100;

    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/brightness\(\d+%\)/, `brightness(${brightness}%)`);
    img.style.filter = newFilter;
};

// Adjust contrast
function adjustContrast(contrast) {
    const contrastValue = document.getElementById('contrastValue');
    contrastValue.innerText = contrast - 100;

    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/contrast\(\d+%\)/, `contrast(${contrast}%)`);
    img.style.filter = newFilter;
};

// Adjust saturation
function adjustSaturation(saturation) {
    const saturationValue = document.getElementById('saturationValue');
    saturationValue.innerText = saturation - 100;

    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/saturate\(\d+%\)/, `saturate(${saturation}%)`);
    img.style.filter = newFilter;
};

// Adjust hue
function adjustTint(tint) {
    const tintValue = document.getElementById('tintValue');
    tintValue.innerText = tint;

    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/hue-rotate\(\d+deg\)/, `hue-rotate(${tint}deg)`);
    img.style.filter = newFilter;
};

// Adjust blur
function adjustBlur(blur) {
    const blurValue = document.getElementById('blurValue');
    blurValue.innerText = (blur * 20);
    
    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/blur\(\d+(\.\d+)?px\)/, `blur(${blur}px)`);
    img.style.filter = newFilter;
};

// Download edited image onto computer
document.getElementById('downloadImage').addEventListener('click', () => {
    img = document.getElementById('image');

    // // Create new canvas element
    const canvas = document.createElement('canvas');

    // Draw image onto 2D canvas
    const ctx = canvas.getContext('2d');
    ctx.filter = img.style.filter;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Convert canvas to dataURL
    const dataURL = canvas.toDataURL();

    // Create new anchor element to download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'image-1.png';

    link.click();
});

// Close image and return to home page
document.getElementById('closeImage').addEventListener('click', () => {
    window.location.href = '/';
})