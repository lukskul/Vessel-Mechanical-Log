import { fetchVesselNames, saveData } from './dataService.js'; 

document.addEventListener('DOMContentLoaded', async function() {
    const vesselInput = document.getElementById('vessel-name');
    const suggestionsContainer = document.getElementById('autocomplete-suggestions');
    let vessels = [];

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
