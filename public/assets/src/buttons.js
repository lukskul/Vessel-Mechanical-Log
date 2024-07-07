import { resetVessel } from "./vessel";
import { showTasks, resetTasks, hideTasks } from "./tasks";
import { state, shakeAlert, resetShakeAlert, showSuccessPopup } from "./global"; 
import { resetUnitSystem } from "./unit-system";


export const saveVessel = document.getElementById('save-vessel-button');  

export const addWork = document.getElementById("add-work-button");
addWork.addEventListener('click', function() {
    if(state.selectedVessel != null) {
        state.addMode = true;
        resetTasks(); 
        showTasks(); 
        resetShakeAlert(); 

    } else {  
        shakeAlert(); 
    }
})  

const archive = document.getElementById("archive-button");
archive.addEventListener('click', async function () {
    if (state.selectedVessel != null) {
        state.addMode = false;
        resetTasks(); 
        showTasks(); 
        resetShakeAlert();

    } else {
        shakeAlert();
    }
});

export const edit = document.getElementById('change-vessel-button');
edit.addEventListener('click', function() {
    if(state.selectedVessel != null) { 
        //resetShakeAlert();  
        resetVessel(); 
        //resetUnitSystem(); 
        resetTasks(); 
        hideTasks(); 

    } else {
        shakeAlert(); 
    }
}); 

export const back = document.getElementById('return-button'); 
back.addEventListener('click', function() {
    if(state.selectedVessel != null) {
        resetShakeAlert(); 
        resetTasks();
        showTasks();  
    } else {
        shakeAlert(); 
    }
});

export const sharedSubmitButton = document.getElementById('shared-submit-button'); 
sharedSubmitButton.addEventListener('click', function() {
    if(state.selectedVessel != null && state.addMode === true) {
        showSuccessPopup("Saved!"); 
        resetShakeAlert(); 
    } else {
        shakeAlert(); 
        console.log("wo buddy you are not in add mode.")
    }
})
