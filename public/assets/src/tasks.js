import { loadHTMLBlock } from './form-loader.js';
import { initializeForm } from './initialize-form.js';
import { state } from './global.js';
import { loadArchivedTasks } from './data-service.js';
import { loadTaskSVG, loadDefaultLogo } from './tasksSVG.js'; 

export const taskMainBlock = document.getElementById("task-main-block"); 
const taskOptions = document.querySelectorAll('.task-option');
const formContainer = document.getElementById('form-container');
const taskIdentifier = document.getElementById('task-identifier');

export async function showTasks() {

    taskMainBlock.style.display = "block";
    formContainer.innerHTML = ''; 
    console.log("Adding data ", state.addMode)
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
        let scriptFile; 

        switch (taskType) {   
            case 'zincs':
                htmlFile = 'https://lukskul.github.io/Vessel-Mechanical-Log/public/assets/html/zincs.html';
                //htmlFile = 'assets/html/zincs.html'; 
                scriptFile = 'https://lukskul.github.io/Vessel-Mechanical-Log/public/assets/src/forms/zincs.js';
                //scriptFile = 'assets/src/forms/zincs.js';     
                break;  
            case 'shafts':
                htmlFile = 'https://lukskul.github.io/Vessel-Mechanical-Log/public/assets/html/shafts.html';
                //htmlFile = 'assets/html/shafts.html';
                scriptFile = 'https://lukskul.github.io/Vessel-Mechanical-Log/public/assets/src/forms/shafts.js'; 
                //scriptFile = 'assets/src/forms/shafts.js'; 
                break;
            case 'motor':
                htmlFile = 'https://lukskul.github.io/Vessel-Mechanical-Log/public/assets/html/motor.html';
                //htmlFile = 'assets/html/motor.html'; 
            default:        
                console.error('Unknown task type:', taskType);  
                return;        
        }

        try {
            await loadHTMLBlock('form-container', htmlFile, scriptFile);
  
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
    
                for (const entry in taskData) {
                    if (taskData.hasOwnProperty(entry)) {
                      // Create a new div element for each entry
                      const entryDiv = document.createElement('div');
                      entryDiv.className = 'container';
                      entryDiv.textContent = entry;
                      formContainer.appendChild(entryDiv);
                  
                      const entryData = taskData[entry];
                      for (const key in entryData) {
                        if (entryData.hasOwnProperty(key)) {
                          // Create a new div element for each key-value pair within the entry
                          const div = document.createElement('div');
                          div.className = 'padding';
                          div.textContent = `${key}: ${entryData[key]}`;
                          
                          // Append the div to the formContainer
                          formContainer.appendChild(div);
                        }
                      }
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







 



 


  