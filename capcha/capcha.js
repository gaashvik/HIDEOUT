const imageSets = [
    {
        name: 'Duck',
        images: ['duck1.jpeg', 'duck2.jpeg','duck4.jpeg'] // Add duck images
    },
    {
        name: 'Cat',
        images: ['cat1.jpeg', 'cat2.jpeg',,'cat4.jpeg'] // Add cat images
    },
    {
        name:'Fish',
        images:['fish1.jpg','fish2.jpg','fish3.jpg','fish4.jpg']
    },
    {
        name:'Dog',
        images:['dog1.jpg','dog2.jpg','dog3.jpg']
    },
    {
        name:'Horse',
        images:['horse1.jpg','horse2.jpg']
    }
    // Add more image sets as needed
];

function getRandomSet() {
    return imageSets[Math.floor(Math.random() * imageSets.length)];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function getRandomInteger(min, max) {
    // The Math.floor() function returns the largest integer less than or equal to a given number.
    // The Math.random() function returns a floating-point, pseudo-random number in the range 0–1 (inclusive of 0, but not 1).
    // We multiply (max - min + 1) to adjust the range and then add min to ensure that the result falls within the specified range.
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function renderCaptcha() {
    const captchaContainer = document.getElementById('captcha');
    captchaContainer.innerHTML = '';

    const selectedSet = getRandomSet();
    const allImages = selectedSet.images;
    const correctImages = allImages.filter(image => image !== '');

    // Add random noise images
    const noiseImagesCount = 8 - correctImages.length;
    const noiseImages = [];
    for (let i = 0; i < noiseImagesCount; i++) {
        const rand = getRandomInteger(1, 20);
        const randomImage = 'random' + rand + '.jpg'; // Example random image name
        noiseImages.push(randomImage);
    }

    // Merge correct images and noise images
    const displayedImages = correctImages.concat(noiseImages);

    // Shuffle all images
    shuffle(displayedImages);

    displayedImages.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = 'images/' + imageUrl; // Assuming images are stored in an "images" directory
        img.dataset.correct = correctImages.includes(imageUrl);
        img.onclick = toggleSelection;
        captchaContainer.appendChild(img);
    });

    const captchaText = document.getElementById('captchaText');
    captchaText.textContent = `Please select all images containing ${selectedSet.name.toLowerCase()}s:`;
}

function toggleSelection(event) {
    event.target.classList.toggle('selected');
    event.target.dataset.selected = event.target.dataset.selected === 'true' ? 'false' : 'true';
}

function validateCaptcha() {
    const selectedImages = document.querySelectorAll('.selected');
    const resultContainer = document.getElementById('result');

    if (selectedImages.length === 0) {
        resultContainer.textContent = 'Please select at least one image.';
        resultContainer.style.color = 'red';
        return;
    }

    const selectedCorrect = Array.from(selectedImages).every(img => img.dataset.correct === 'true');
    const selectedIncorrect = Array.from(selectedImages).some(img => img.dataset.correct !== 'true');

    if (selectedCorrect && !selectedIncorrect && selectedImages.length === document.querySelectorAll('[data-correct="true"]').length) {
        resultContainer.textContent = 'CAPTCHA solved successfully! You are human.';
        resultContainer.style.color = 'green';
    } else {
        resultContainer.textContent = 'CAPTCHA verification failed! Please try again.';
        resultContainer.style.color = 'red';
        renderCaptcha();
    }
}


// Initialize CAPTCHA on page load
document.addEventListener('DOMContentLoaded', renderCaptcha);
