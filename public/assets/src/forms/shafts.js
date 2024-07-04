
    console.log("The form is loaded");

    document.getElementById('shaftSealType').addEventListener('change', function() {
        var additionalQuestions = document.getElementById('additionalShaftSealQuestions');
        additionalQuestions.innerHTML = ''; 

        if (this.value === 'stuffing-box') {
            // Create a container div with class 'container'
            var containerDiv = document.createElement('div');
            containerDiv.className = 'container';

            // Create an h3 element for the title
            var titleElement = document.createElement('h3');
            titleElement.textContent = 'Packing';
            containerDiv.appendChild(titleElement);

            // Append the container div to additionalQuestions
            additionalQuestions.appendChild(containerDiv);

            // Create input fields based on questions array
            var questions = [
                { label: 'Amount', id: 'packingCount', type: 'number' },
                { label: 'Size', id: 'packingSize', type: 'text' },
                { label: 'Length', id: 'packingLength', type: 'text' },
                { label: 'Thread Size', id: 'threadSize', type: 'text' }
            ];

            questions.forEach(function(question) {
                var formGroup = document.createElement('div');
                formGroup.className = 'form-group';

                var label = document.createElement('label');
                label.setAttribute('for', question.id);
                label.textContent = question.label;
                formGroup.appendChild(label);

                var input = document.createElement('input');
                input.type = question.type;
                input.id = question.id;
                input.name = question.id;
                formGroup.appendChild(input);

                containerDiv.appendChild(formGroup);
            });
        }
    });

