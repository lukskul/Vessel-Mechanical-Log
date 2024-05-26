import { fetchVesselNames, saveData } from './dataService.js'; 

document.addEventListener('DOMContentLoaded', async function() {
    const vesselInput = document.getElementById('vessel-name');
    const suggestionsContainer = document.getElementById('autocomplete-suggestions');
    let vessels = [];
    let selectedVessel = null;

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
                    //selectedVessel = vessel; 
                    suggestionsContainer.innerHTML = '';
                });
                suggestionsContainer.appendChild(suggestionDiv);
                selectedVessel = vessel; 
            });
        }
    });

    const dataForm = document.getElementById('data-form');
    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = document.getElementById('vessel-name');
        const vesselName = nameInput.value.trim(); // Trim whitespace
        const fieldId = nameInput.id; 
        selectedVessel = vesselName; 

        if (vesselName && !vessels.includes(vesselName)) {
            saveData(fieldId, vesselName).then(response => {
                alert(response);
                vessels.push(vesselName);
                selectedVessel = vesselName; 
                console.log('selected Vessel', selectedVessel);  
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

    vesselInput.addEventListener('blur', function() {
        //selectedVessel = vesselInput.value.trim(); // Update selectedVessel when typing and moving away from input
        console.log("Returning", selectedVessel); 
    });
});


 