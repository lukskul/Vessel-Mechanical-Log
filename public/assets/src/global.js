// global.js

export const state = {
    selectedVessel: null,
    setSelectedVessel(vessel) {
        this.selectedVessel = vessel;
        const vesselForm = document.getElementById('vessel-form');
        const selectedVesselHeading = document.getElementById('selected-vessel-heading');
        
        if (this.selectedVessel == null) {
            vesselForm.style.display ='block'; 
            selectedVesselHeading.style.display = 'none'; 
        } else {
            selectedVesselHeading.textContent = `${this.selectedVessel || 'None'}`;
            vesselForm.style.display = 'none';
            selectedVesselHeading.style.display = 'block';
        }
    }
};
  