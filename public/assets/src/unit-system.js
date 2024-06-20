import { state } from './global.js'; 

let unitSystem = "standard";
const unitToggleSwitch = document.getElementById('unit-toggle-switch');  

function updateUnitSystemToggle() {
    if (unitSystem === 'metric') {
        unitToggleSwitch.checked = true; // Metric is checked
    } else {
        unitToggleSwitch.checked = false; // Standard is unchecked
    }
}

export function resetUnitSystem() {
    unitSystem = "standard"; 
    unitToggleSwitch.checked = false; 
}

export async function fetchUnitSystem() {
    if (state.selectedVessel) {
        try {
            const response = await fetch(`/vessel-unit-system/${state.selectedVessel['vessel-name']}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            unitSystem = data.unitSystem;
            console.log(unitSystem); 
            updateUnitSystemToggle();
        } catch (error) {
            console.error('Error fetching unit system:', error);
        }
    } else {
        console.log("No vessel selected, resetting to standard.");
        unitSystem = 'standard';
    }

}

