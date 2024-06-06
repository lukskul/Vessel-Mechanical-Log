
/*** Server Requests ***/ 

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



// export async function loadArchivedTasks() {
//     const selectedVessel = state.selectedVessel;
//     if (!selectedVessel) {
//         alert('No vessel selected');
//         return;
//     }

//     try {
//         const response = await fetch(`/tasks/${selectedVessel['vessel-name']}`);
//         const tasks = await response.json();

//         const taskList = document.getElementById('task-list');
//         taskList.innerHTML = '';

//         for (const taskType in tasks) {
//             const taskItem = document.createElement('li');
//             taskItem.textContent = taskType;
//             taskItem.dataset.taskType = taskType;
//             taskList.appendChild(taskItem);
//         }
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//     }
// }

// document.querySelector('[data-tab="archive"]').addEventListener('click', loadArchivedTasks);

// document.getElementById('task-list').addEventListener('click', (event) => {
//     const taskType = event.target.dataset.taskType;
//     if (!taskType) return;

//     const selectedVessel = state.selectedVessel;
//     const taskData = selectedVessel[taskType];

//     const taskDetails = document.getElementById('task-details');
//     taskDetails.textContent = JSON.stringify(taskData, null, 2);
// });

