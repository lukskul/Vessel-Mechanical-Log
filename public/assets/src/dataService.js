
/*** Server Requests ***/ 

export async function fetchVesselNames() {
    try {
        const response = await fetch('/vessel-names');
        const data = await response.json();
        const vesselNames = data.map(vessel => vessel['vessel-name']).filter(name => typeof name === 'string');
        console.log('Processed vessel names:', vesselNames);
        return vesselNames;
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

export async function updateVesselData(vesselName, additionalData = {}) {
    const data = { "vessel-name": vesselName, ...additionalData };

    const response = await fetch('/update', { // Assume we have an /update endpoint for updates
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update data');
    }

    const responseData = await response.text();
    return responseData;
}
