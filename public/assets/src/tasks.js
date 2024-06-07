import { loadHTMLBlock } from './form-loader.js';
import { initializeForm } from './initialize-form.js';
import { returnButton } from './buttons.js'; 

export const taskMainBlock = document.getElementById("task-main-block"); 
const taskOptions = document.querySelectorAll('.task-option');

document.addEventListener('DOMContentLoaded', function() {
    taskOptions.forEach(option => {
        option.addEventListener('click', async function() {
            taskOptions.forEach(opt => {
                if (opt !== option) {
                    opt.style.display = 'none';
                    returnButton.style.display = "block"; 
                }
            });

            const taskType = option.getAttribute('data-task');

            let htmlFile;

            switch (taskType) {
                case 'engines':
                    htmlFile = 'assets/html/engine.html';
                    break;
                case 'props':
                    htmlFile = 'assets/html/props.html';
                    break;
                // Add more cases as needed
                default:
                    console.error('Unknown task type:', taskType);
                    return;
            }

            try {
                await loadHTMLBlock('form-container', htmlFile);
                console.log(htmlFile), 'html file'; 
                // Ensure the form is ready before initializing
                setTimeout(() => {
                    console.log("before"); 
                    const form = document.querySelector(`#${taskType}`);
                    console.log("after"); 
                    if (form) {
                        console.log("inside the if statement ", form); 
                        initializeForm(form, taskType);
                    } else {
                        console.error('Form not found after loading HTML');
                    }
                }, 50); // Delay to ensure form is loaded

            } catch (error) {
                console.error('Error loading form:', error);
            }
        });  
    });
});

export function resetTasks() {
    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML = ''; // Clear the form container
    taskOptions.forEach(option => {
        option.style.display = 'block'; // Show all task options
    });
    console.log("Return button has been clicked and tasks are shown again.");
}

export function showTasks() {
    taskMainBlock.style.display = "block";
}





 


  