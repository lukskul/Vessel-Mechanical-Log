import { resetVessel } from "./vessel";
import { resetTasks, taskMainBlock } from "./tasks";

const edit = document.getElementById('change-vessel-button');
edit.addEventListener('click', function() {
    resetVessel(); 
    taskMainBlock.style.display = "none";
}); 
   
export const returnButton = document.getElementById('return-button'); 
returnButton.addEventListener('click', function() {
    if (returnButton.style.display === "block") {
        resetTasks(); 
        returnButton.style.display = "none"; // Hide the return button
    }
});



