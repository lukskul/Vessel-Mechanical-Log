// global.js

export const state = {
    selectedVessel: null,
    setSelectedVessel(vessel) {
        if (typeof vessel === 'string') {
            this.selectedVessel = null;
        } else {
            this.selectedVessel = vessel;
        }

        const vesselForm = document.getElementById('vessel-form');
        const selectedVesselHeading = document.getElementById('selected-vessel-heading');
        
        if (this.selectedVessel == null) {
            vesselForm.style.display = 'block'; 
            selectedVesselHeading.style.display = 'none'; 
        } else {
            selectedVesselHeading.textContent = `${this.selectedVessel['vessel-name'] || 'None'}`;
            vesselForm.style.display = 'none';
            selectedVesselHeading.style.display = 'block';
        }
    }
};
