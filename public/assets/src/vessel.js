import { fetchVesselNames, saveData } from './data-service.js'; 
import { state } from './global.js'; 
import { showTasks } from './tasks.js'; 
import { saveVessel } from './buttons.js'; 

const dataForm = document.getElementById('data-form'); 

//Select Vessel Drop down Box
document.addEventListener('DOMContentLoaded', async function() {
    const vesselInput = document.getElementById('vessel-name');
    const suggestionsContainer = document.getElementById('autocomplete-suggestions');
    let vessels = [];

        // Fetch vessel names
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
                    saveVessel.style.display = "none"; 
                    vesselInput.value = filteredVessel;
                    suggestionsContainer.innerHTML = '';
                    state.setSelectedVessel({ 'vessel-name': filteredVessel });
                    showTasks(); 
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
                                
            // Logging for debugging
            console.log('New vessel:', newVessel);
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
    state.setSelectedVessel(null); // Reset the selected vessel
    dataForm.reset(); // Clear the form inputs 
    console.log("Vessel Selected from resetVesselName", state.selectedVessel); 
}


 