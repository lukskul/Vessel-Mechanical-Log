import { resetVessel } from "./vessel.js";
import { state } from "./global.js";
import { loadTaskSVG } from "./tasksSVG.js"; 

const taskList = document.getElementById('task-list');
const taskOptions = document.querySelectorAll('.task-option');

export async function fetchVesselNames() {
    try {
        const response = await fetch('/vessel-names');
        const data = await response.json();
        const vesselNames = data.map(vessel => vessel['vessel-name']).filter(name => typeof name === 'string');
  
        return vesselNames

    } catch (error) {
        console.error('Error fetching vessel names:', error);
        return [];    
    }
}

export async function saveData(id, input) {
    const data = { [id]: input };

    const response = await fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to save data');
    }

    const responseData = await response.text();
    return responseData;
}

export async function updateVesselData(vesselName, taskType, additionalData = {}) {
    const data = { "vessel-name": vesselName, [taskType]: additionalData };
    console.log(vesselName, "is the name", taskType, "taskType from data-service", additionalData, "and additional data");

    const response = await fetch('/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log("Data sent to server:", data); // Log the data being sent

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update data: ${errorText}`);
    }

    const responseData = await response.json(); // Make sure this is included
    console.log("Response from server:", responseData); // Log the response here

    return responseData; // Return the parsed JSON response
}

export async function loadArchivedTasks() {
    if (!state.addMode) {
        const selectedVessel = state.selectedVessel;
        if (!selectedVessel) {
            resetVessel();
            return;
        }

        try {
            const response = await fetch(`/tasks/${selectedVessel['vessel-name']}`);
            const tasks = await response.json();

            taskOptions.forEach(option => {
                const taskType = option.getAttribute('data-task');
                if (tasks[taskType] && Object.keys(tasks[taskType]).length > 0) {
                    option.style.display = 'block'; // Show the task option if there is data
                } else {
                    option.style.display = 'none'; // Hide the task option if no data is available
                }
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
}

export async function showTaskData(taskType) {
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

        loadTaskSVG(taskType);

    } catch (error) {
        console.error('Error fetching task data:', error);
        formContainer.innerHTML = `<p>Error loading data for ${taskType}.</p>`;
    }
}
