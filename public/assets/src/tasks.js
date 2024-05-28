import { state } from './global.js'; 
import { resetVesselName } from './vessel.js'; 


document.addEventListener('DOMContentLoaded', function() {
    const taskOptions = document.querySelectorAll('.task-option');
    // Hide other task options when one is clicked
    taskOptions.forEach(option => {
        option.addEventListener('click', function() {
            taskOptions.forEach(opt => {
                if (opt !== option) {
                    opt.style.display = 'none';
                }
            });
        });
    });
});



