import { fetchVesselNames, saveData } from './dataService.js'; 
import { state } from './global.js'; 
import { vesselSelected } from './buttons.js';

const dataForm = document.getElementById('data-form'); 

//Select Vessel Drop down Box

document.addEventListener('DOMContentLoaded', async function() {
    const vesselInput = document.getElementById('vessel-name');
    const suggestionsContainer = document.getElementById('autocomplete-suggestions');
    let vessels = [];

        // Fetch vessel names
        try {
            vessels = await fetchVesselNames(vessels);
            console.log('Fetched vessels:', vessels);
        } catch (error) {
            console.error('Error fetching vessel names:', error);
        }

    vessels = await fetchVesselNames(); 

    vesselInput.addEventListener('input', function() {  
        const query = vesselInput.value.toLowerCase().trim(); // Trim whitespace
        suggestionsContainer.innerHTML = '';

        if (query) {
            const filteredVessels = vessels.filter(vessel => {
                if (typeof vessel === 'string') {
                    return vessel.toLowerCase().includes(query);  
                }
                return false;
            });

            filteredVessels.forEach(vessel => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.textContent = vessel;
                suggestionDiv.className = 'suggestion';
                suggestionDiv.addEventListener('click', function() {
                    vesselInput.value = vessel;
                    suggestionsContainer.innerHTML = '';
                    state.setSelectedVessel(vessel);
                });
                suggestionsContainer.appendChild(suggestionDiv); 
            });
        }
    });

    const dataForm = document.getElementById('data-form');
    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = document.getElementById('vessel-name');
        const vesselName = nameInput.value.trim(); // Trim whitespace
        const fieldId = nameInput.id;  

        if (vesselName && !vessels.includes(vesselName)) {
            saveData(fieldId, vesselName).then(response => {
                alert(response);
                vessels.push(vesselName);
                state.setSelectedVessel(vesselName); 
                console.log('selected Vessel line 63', selectedVessel);                 
            }).catch(error => {
                console.error('Error saving vessel name:', error);
                alert('Error saving vessel name');
            });
        } else if (!vesselName) {
            alert('Vessel name cannot be empty');
        } else {
            alert('Vessel name already exists');
        }
    });
});

export function resetVessel() {
    state.setSelectedVessel(null); // Reset the selected vessel
    dataForm.reset(); // Clear the form inputs 
    console.log("Vessel Selected from resetVesselName", state.selectedVessel); 
}


 