export function showError(message) {
    const errorContainer = document.getElementById('error-container');

    // Clear any existing messages
    errorContainer.innerHTML = '';

    // Create the message element
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.textContent = message;

    // Append the message to the container
    errorContainer.appendChild(errorMessage);

    // Display the container
    errorContainer.style.display = 'block';

    // Hide the message after 5 seconds
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 5000);
}
