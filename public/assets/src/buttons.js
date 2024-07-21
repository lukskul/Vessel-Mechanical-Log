import { resetVessel } from "./vessel";
import { showTasks, resetTasks, hideTasks } from "./tasks";
import { state } from "./global"; 
import { resetUnitSystem } from "./unit-system";
import { showSuccessPopup, shakeAlert, resetShakeAlert } from "./alert";
import { language } from "./language";
import { taskIdentifier } from "./tasksSVG";


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
    if(state.selectedVessel != null && state.addMode === true && language === 'en') {
        showSuccessPopup("Saved!"); 
        resetShakeAlert(); 
    } else if (state.selectedVessel != null && state.addMode === true && language === 'es') {
        showSuccessPopup("Guardado!"); 
        resetShakeAlert(); 
    }else {
        shakeAlert(); 
        console.log("wo buddy you are not in add mode.")
    }
})
