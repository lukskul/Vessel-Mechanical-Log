import { state } from './global.js'; 
import { updateVesselData } from './dataService';

document.addEventListener('DOMContentLoaded', function() {
    const taskOptions = document.querySelectorAll('.task-option');
    // Hide other task options when one is clicked
    taskOptions.forEach(option => {
        option.addEventListener('click', function() {
            taskOptions.forEach(opt => {
                if (opt !== option) {
                    opt.style.display = 'none';
                }
            });
        });
    });
});

const engineDataForm = document.getElementById("engine-data-form");

engineDataForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    if (state.selectedVessel) {
        // Collect form data dynamically
        const formData = {};
        const formInputs = engineDataForm.querySelectorAll('input[type="checkbox"]');
        formInputs.forEach(input => {
            if (input.checked) {
                formData[input.name] = input.value; // Collect the value of the checked checkbox
            }
        });

        // Send form data to server
        updateVesselData(state.selectedVessel, formData).then(response => {
            alert(response); // Alert the response from the server
            console.log('Selected Vessel:', state.selectedVessel, 'Updated Data:', formData);
        }).catch(error => {
            console.error('Error updating vessel:', error); // Log any errors
            alert('Error updating vessel'); // Alert that there was an error
        });
    } else {
        alert('No vessel selected'); // Alert that no vessel is selected
    }
});




