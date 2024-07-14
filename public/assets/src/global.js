import { showTasks } from "./tasks";
import { loadDefaultLogo } from "./tasksSVG";

export const state = {
    selectedVessel: null,
    addMode: true,  //Add mode is add task data set to true.  False will show archived data.

    async setSelectedVessel(vessel) {
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




