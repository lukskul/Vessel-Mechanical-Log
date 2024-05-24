export async function fetchVesselNames() {
    try {
        const response = await fetch('/vessel-names');
        const data = await response.json();
        // Ensure data is an array of objects with 'name' properties
        return data.map(vessel => vessel.name).filter(name => typeof name === 'string');
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
