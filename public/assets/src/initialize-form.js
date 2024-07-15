import { updateVesselData } from './data-service.js'; 
import { state } from './global.js'; 
import { showSuccessPopup } from './alert.js';
import { language } from './language.js';

export function initializeForm(form, taskType) {
    const vesselName = state.selectedVessel['vessel-name']; 

    if (form) {
        const submitButton = document.getElementById("shared-submit-button");

        submitButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const formElements = form.elements;
            const formData = {};

            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                // Collect checked form data for checkboxes and radios
                if ((element.type === 'checkbox' || element.type === 'radio') && element.checked) {
                    formData[element.name] = element.value;
                } 
                // Collect selected value for select elements
                else if (element.tagName === 'SELECT' && element.value) {
                    formData[element.name] = element.value;
                } 
                // Collect data for other input elements
                else if (element.type !== 'checkbox' && element.type !== 'radio' && element.value) {
                    formData[element.name] = element.value;
                }
            }

            if (vesselName && taskType) {
                updateVesselData(vesselName, taskType, formData) // Pass vesselName as a string
                    .then(updatedData => {
                        console.log("Server response:", updatedData); // Log the server response
                        // Check if updatedData is valid
                        if (updatedData && updatedData.message === 'Vessel data updated successfully' && updatedData.vessel && language === "en") {
                            showSuccessPopup('Success!');
                            const updatedVessel = updatedData.vessel;
                            if (!state.selectedVessel[taskType]) {
                                state.selectedVessel[taskType] = {};
                            }
                            // Assuming updatedData includes the updated vessel data
                            Object.assign(state.selectedVessel[taskType], updatedVessel[taskType]);
                            console.log("Updated state:", state.selectedVessel); // Log the updated state
                        } else if (updatedData && updatedData.message === 'Vessel data updated successfully' && updatedData.vessel && language === "es") {
                            showSuccessPopup('Éxito!');
                            const updatedVessel = updatedData.vessel;
                            if (!state.selectedVessel[taskType]) {
                                state.selectedVessel[taskType] = {};
                            }
                            // Assuming updatedData includes the updated vessel data
                            Object.assign(state.selectedVessel[taskType], updatedVessel[taskType]);
                            console.log("Updated state:", state.selectedVessel); // Log the updated state
                        } else {
                            // If the response is not as expected, handle it as an error
                            throw new Error('Invalid response from server');
                        }
                    })
                    .catch(error => {
                        console.error('Error updating data for vessel:', error);
                        alert('Error updating data for vessel');
                        console.log("Error details:", { vesselName, taskType, formData, error });
                    });
            } else {
                alert('Please select a task type and a vessel'); // Alert if task type or vessel is not selected
            }
            
        });  
    }
}
