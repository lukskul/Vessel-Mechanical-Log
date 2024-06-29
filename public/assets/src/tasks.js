import { loadHTMLBlock } from './form-loader.js';
import { initializeForm } from './initialize-form.js';
import { state } from './global.js';
import { loadArchivedTasks } from './data-service.js';
import { loadTaskSVG, loadDefaultLogo } from './tasksSVG.js'; 
import { afterLoad } from './zincs.js';

export const taskMainBlock = document.getElementById("task-main-block"); 
const taskOptions = document.querySelectorAll('.task-option');
const formContainer = document.getElementById('form-container');
const taskIdentifier = document.getElementById('task-identifier');

export async function showTasks() {

    taskMainBlock.style.display = "block";
    formContainer.innerHTML = ''; 

    if (state.addMode) { 
        taskOptions.forEach(option => {
            option.style.display = 'block';

            option.removeEventListener('click', handleTaskClick);
            option.addEventListener('click', handleTaskClick);
        });
    } else {
        taskOptions.forEach(option => {
            option.style.display = 'none'; 
        });
        await loadArchivedTasks();
    }
}

async function handleTaskClick(event) {
    const option = event.currentTarget;
    const taskType = option.getAttribute('data-task');
    taskIdentifier.innerText = taskType;

    taskOptions.forEach(opt => {
        opt.style.display = 'none';
    });

    loadTaskSVG(taskType);

    if (state.addMode) {

        let htmlFile;

        switch (taskType) {
            case 'engines':
                htmlFile = 'https://lukskul.github.io/Vessel-Mechanical-Log/public/assets/html/engine.html';
                break;
            case 'props':
                htmlFile = 'https://lukskul.github.io/Vessel-Mechanical-Log/public/assets/html/props.html';
                break;    
            case 'zincs':
                htmlFile = 'https://lukskul.github.io/Vessel-Mechanical-Log/public/assets/html/zincs.html';
                //htmlFile = 'assets/html/zincs.html';     
                break;  
            default:  
                console.error('Unknown task type:', taskType);
                return;  
        }

        try {
            await loadHTMLBlock('form-container', htmlFile, afterLoad);

            setTimeout(() => {
                const form = document.querySelector(`#${taskType}`);
                if (form) {
                    initializeForm(form, taskType);
                } else {
                    console.error('Form not found after loading HTML');
                }
            }, 50);  

        } catch (error) {
            console.error('Error loading form:', error);
        }
    }else {
        try {
            const response = await fetch(`/tasks/${state.selectedVessel['vessel-name']}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const tasks = await response.json();
            const taskData = tasks[taskType];
    
            formContainer.innerHTML = ''; // Clear previous content
    
            if (!taskData || Object.keys(taskData).length === 0) {

                formContainer.innerHTML = `<p>No data available for ${taskType}.</p>`;

            } else {
                
                const header = document.createElement('h3');
                header.textContent = `${taskType} Data`;
                formContainer.appendChild(header);
    
                // Recursive function to format nested object values
                const formatValue = (value, indent = 0) => {
                    const indentation = ' '.repeat(indent * 2);
                    if (typeof value === 'object' && value !== null) {
                        return Object.entries(value)
                            .map(([key, val]) => `${indentation}${key}: ${formatValue(val, indent + 1)}`)
                            .join('\n');
                    }
                    return value;
                };
    
                for (const key in taskData) {
                    if (taskData.hasOwnProperty(key)) {
                        const pre = document.createElement('pre');
                        pre.textContent = `${key}:\n${formatValue(taskData[key], 1)}`;
                        formContainer.appendChild(pre);
                    }
                }
            }
    
        } catch (error) {
            console.error('Error fetching task data:', error);
            formContainer.innerHTML = `<p>Error loading data for ${taskType}.</p>`;
        }
    }
}    

export function resetTasks() {
    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML = ''; 
    taskOptions.forEach(option => {
        option.style.display = 'block'; 
    });
    loadDefaultLogo();
}

export function hideTasks() {
    taskMainBlock.style.display = "none"; 
}







 



 


  