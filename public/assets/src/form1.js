document.addEventListener('DOMContentLoaded', function() {
    const boatInput = document.getElementById('boat-name');
    const suggestionsContainer = document.getElementById('autocomplete-suggestions');
    let boatNames = [];

    // Fetch boat names from the server
    fetch('/boats')
        .then(response => response.json())
        .then(data => {
            boatNames = data.map(boat => boat.name);
        })
        .catch(error => {
            console.error('Error fetching boat names:', error);
        });

    boatInput.addEventListener('input', function() {
        const query = boatInput.value.toLowerCase();
        suggestionsContainer.innerHTML = '';

        if (query) {
            const filteredBoats = boatNames.filter(boat => boat.toLowerCase().includes(query));
            filteredBoats.forEach(boat => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.textContent = boat;
                suggestionDiv.className = 'suggestion';
                suggestionDiv.addEventListener('click', function() {
                    boatInput.value = boat;
                    suggestionsContainer.innerHTML = '';
                });
                suggestionsContainer.appendChild(suggestionDiv);
            });
        }
    });

    const dataForm = document.getElementById('data-form');
    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = { boatName: boatInput.value };

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(responseData => {
            console.log('Success:', responseData);
            alert(responseData);

            // Optionally, update boatNames with the new boat name
            if (!boatNames.includes(boatInput.value)) {
                boatNames.push(boatInput.value);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
