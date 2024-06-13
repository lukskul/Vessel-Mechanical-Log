import { showTasks } from "./tasks";
import { loadDefaultLogo } from "./tasksSVG";

export const state = {
    selectedVessel: null,
    addMode: true,

    setSelectedVessel(vessel) {
        if (typeof vessel === 'string') {
            this.selectedVessel = null;
        } else {
            this.selectedVessel = vessel;
            showTasks(); 
        }

        const vesselForm = document.getElementById('vessel-form');
        const selectedVesselHeading = document.getElementById('vessel-display-div');
        
        if (this.selectedVessel == null) {
            vesselForm.style.display = 'block'; 
            selectedVesselHeading.style.display = 'none'; 

        } else {
            selectedVesselHeading.textContent = `${this.selectedVessel['vessel-name'] || 'None'}`;
            vesselForm.style.display = 'none';
            selectedVesselHeading.style.display = 'block';
            loadDefaultLogo(); 
        }
    }
};

let shakeCounter = 0;

export function shakeAlert() {
    const vesselNameDiv = document.getElementById('data-form'); 

    vesselNameDiv.classList.add('shake'); 
    
    vesselNameDiv.addEventListener('animationend', function() {
        vesselNameDiv.classList.remove('shake');
    }, { once: true });

    shakeCounter++;

    if (shakeCounter > 2) {
        alert('Please select a vessel.');
        shakeCounter = 0; 
    }
}

export function resetShakeAlert() {
    shakeCounter = 0;
}

export function showSuccessPopup(message) {
    const popup = document.getElementById('success-popup');
    popup.textContent = message;
    popup.classList.add('show');

    // Hide the popup after 2 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000);
}

