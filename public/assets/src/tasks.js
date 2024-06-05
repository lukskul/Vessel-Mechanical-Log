import { loadHTMLBlock } from './form-loader.js';
import { initializeForm } from './initialize-form.js';


export function showTasks() {
    var taskMainBlock = document.getElementById("task-main-block"); 
    taskMainBlock.style.display = "block"; 
}

document.addEventListener('DOMContentLoaded', function() {
    const taskOptions = document.querySelectorAll('.task-option');

    // Hide other task options and load the corresponding form when one is clicked
    taskOptions.forEach(option => {
        option.addEventListener('click', async function() {
            taskOptions.forEach(opt => {
                if (opt !== option) {
                    opt.style.display = 'none';
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




 


  