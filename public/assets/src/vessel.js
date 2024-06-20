import { fetchVesselNames, saveData } from './data-service.js'; 
import { state } from './global.js'; 
import { showTasks } from './tasks.js';
import { fetchUnitSystem } from "./unit-system"; 

const dataForm = document.getElementById('data-form'); 

document.addEventListener('DOMContentLoaded', async function() {
    const vesselInput = document.getElementById('vessel-name');
    const suggestionsContainer = document.getElementById('autocomplete-suggestions');

    let vessels = [];

        try {
            vessels = await fetchVesselNames(vessels);
        } catch (error) {
            console.error('Error fetching vessel names:', error);
        }

    vesselInput.addEventListener('input', function() {  
        const query = vesselInput.value.toLowerCase().trim(); // Trim whitespace
        suggestionsContainer.innerHTML = '';

        if (query) {
            const filteredVessels = vessels.filter(vesselName => {
                return vesselName.toLowerCase().includes(query);  
            });

            filteredVessels.forEach(filteredVessel => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.textContent = filteredVessel;
                suggestionDiv.className = 'suggestion';
                suggestionDiv.addEventListener('click', function() {
        
                    vesselInput.value = filteredVessel;
                    suggestionsContainer.innerHTML = '';
                    state.setSelectedVessel({ 
                        'vessel-name': filteredVessel,
                     }); 
                    showTasks();
                    fetchUnitSystem();  
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

        if (vesselName && !vessels.some(vessel => vessel[ 'vessel-name' ] === vesselName)) {
            saveData(fieldId, vesselName).then(response => {
                alert(response);
                const newVessel = { 'vessel-name': vesselName }; 
                                
                state.setSelectedVessel(newVessel); 

                vessels.push(newVessel); 
                console.log('selected Vessel line 65 vessel.js', state.selectedVessel);  
                showTasks();                 
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
    state.setSelectedVessel(null); 
    dataForm.reset(); 
}

