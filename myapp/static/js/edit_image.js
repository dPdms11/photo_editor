import db from './db.js';

let img = document.getElementById('image');

// Load file from IndexedDB
document.addEventListener('DOMContentLoaded', async () => {
    const file = await db.images.get(parseInt(img.name));
    img.src = URL.createObjectURL(file);
})

// Adjust brightness
const brightnessScale = document.getElementById('brightnessScale');
brightnessScale.addEventListener('input', () => {
    const brightnessValue = document.getElementById('brightnessValue');
    brightnessValue.innerText = brightnessScale.value - 100;

    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/brightness\(\d+%\)/, `brightness(${brightnessScale.value}%)`);
    img.style.filter = newFilter;
});

// Adjust contrast
const contrastScale = document.getElementById('contrastScale');
contrastScale.addEventListener('input', () => {
    const contrastValue = document.getElementById('contrastValue');
    contrastValue.innerText = contrastScale.value - 100;

    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/contrast\(\d+%\)/, `contrast(${contrastScale.value}%)`);
    img.style.filter = newFilter;
});

// Adjust saturation
const saturationScale = document.getElementById('saturationScale');
saturationScale.addEventListener('input', () => {
    const saturationValue = document.getElementById('saturationValue');
    saturationValue.innerText = saturationScale.value - 100;

    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/saturate\(\d+%\)/, `saturate(${saturationScale.value}%)`);
    img.style.filter = newFilter;
});

// Adjust hue
const tintScale = document.getElementById('tintScale')
tintScale.addEventListener('input', () => {
    const tintValue = document.getElementById('tintValue');
    tintValue.innerText = tintScale.value;

    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/hue-rotate\(\d+deg\)/, `hue-rotate(${tintScale.value}deg)`);
    img.style.filter = newFilter;
});

// Adjust blur
const blurScale = document.getElementById('blurScale')
blurScale.addEventListener('input', () => {
    const blurValue = document.getElementById('blurValue');
    blurValue.innerText = (blurScale.value * 20);
    
    const currentFilter = img.style.filter;
    const newFilter = currentFilter.replace(/blur\(\d+(\.\d+)?px\)/, `blur(${blurScale.value}px)`);
    img.style.filter = newFilter;
});

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