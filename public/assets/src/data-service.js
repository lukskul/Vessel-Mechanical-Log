
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
