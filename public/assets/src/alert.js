const messageContainer = document.getElementById('alert-popup');
let shakeCounter = 0;
import { language } from './language'; 

export function shakeAlert() {
    const vesselNameDiv = document.getElementById('data-form'); 

    vesselNameDiv.classList.add('shake'); 
    
    vesselNameDiv.addEventListener('animationend', function() {
        vesselNameDiv.classList.remove('shake');
    }, { once: true });

    shakeCounter++;

    if (shakeCounter > 2 && language === 'en') {
        showError('Please select a vessel.');
        shakeCounter = 0; 
    } else if (shakeCounter > 2 && language === 'es') {
        showError('Por favor, seleccione una embarcación');
        shakeCounter = 0; 
    }
}

export function resetShakeAlert() {
    shakeCounter = 0;  
}


export function showSuccessPopup(message) {
    // Clear any existing messages
    messageContainer.innerHTML = '';

    // Create the message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;

    // Append the message to the container
    messageContainer.appendChild(successMessage);

    // Display the container
    messageContainer.style.display = 'block';

    // Hide the message after 2 seconds
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 2000);
}

export function showError(message) {
    // Clear any existing messages
    messageContainer.innerHTML = '';

    // Create the message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;

    // Append the message to the container
    messageContainer.appendChild(errorMessage);

    // Display the container
    messageContainer.style.display = 'block';

    // Hide the message after 5 seconds
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 5000);
}
