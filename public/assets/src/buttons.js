import { resetVessel } from "./vessel";
import { showTasks, resetTasks, hideTasks } from "./tasks";
import { showTasksArchive, hideTasksArchive } from "./archive"; 
import { state, shakeAlert, resetShakeAlert } from "./global"; 

export const saveVessel = document.getElementById('save-vessel-button');  

const addWork = document.getElementById("add-work-button");
addWork.addEventListener('click', function() {
    if(state.selectedVessel != null) {
        showTasks(); 
        resetShakeAlert(); 
    } else {
        shakeAlert(); 
    }
})  

const archive = document.getElementById("archive-button");
archive.addEventListener('click', function() {
    if(state.selectedVessel != null) {
        showTasksArchive(); 
        resetShakeAlert(); 
    } else {
        shakeAlert(); 
    } 
})

const edit = document.getElementById('change-vessel-button');
edit.addEventListener('click', function() {
    resetVessel(); 
    hideTasks(); 
    hideTasksArchive(); 
    saveVessel.style.display = "block"; 
}); 
   
export const back = document.getElementById('return-button'); 
back.addEventListener('click', function() {
    if (back.style.display === "block") {
        resetTasks(); 
        back.style.display = "none"; 
    }
});



 




