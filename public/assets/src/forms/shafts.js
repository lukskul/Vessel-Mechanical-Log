
console.log("The form is loaded");

const toggleContainers = document.querySelectorAll('#toggle-container');
toggleContainers.forEach(div => {
    div.addEventListener('click', function() {
        const container = this.querySelector('.information-container');
        if (container) {
            container.style.display = container.style.display === 'none' ? 'block' : 'none';
        }
    });
});



//Section 4- Shaft Seal

document.getElementById('shaftSealType').addEventListener('change', function() {
    var additionalQuestions = document.getElementById('additionalShaftSealQuestions');
    additionalQuestions.innerHTML = ''; 

    if (this.value === 'stuffing-box') {
        // Create a container div with class 'container'
        var containerDiv = document.createElement('div');
        containerDiv.className = 'container';

        // Create an h3 element for the title
        var titleElement = document.createElement('h3');
        titleElement.textContent = 'Packing Rings';
        containerDiv.appendChild(titleElement);

        // Append the container div to additionalQuestions
        additionalQuestions.appendChild(containerDiv);

        // Create input fields based on questions array
        var questions = [
            { label: 'Amount', id: 'packingCount', type: 'number' },
            { label: 'Size', id: 'packingSize', type: 'text' },
            { label: 'Length', id: 'packingLength', type: 'text' },
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

        // Retaining Collar Container
        var retainingCollarContainerDiv = document.createElement('div');
        retainingCollarContainerDiv.className = 'container';

        var retainingCollarTitleElement = document.createElement('h3');
        retainingCollarTitleElement.textContent = 'Packing Gland';
        retainingCollarContainerDiv.appendChild(retainingCollarTitleElement);

        var threadSizes = [
            { label: 'Thread Size', id: 'threadSize', options: ['M8', 'M10', 'M12', 'M16', 'M20', '1/4"-20', '3/8"-16', '1/2"-13', '5/8"-11', '3/4"-10'] }
        ];

        threadSizes.forEach(function(thread) {
            var formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            var label = document.createElement('label');
            label.setAttribute('for', thread.id);
            label.textContent = thread.label;
            formGroup.appendChild(label);

            var select = document.createElement('select');
            select.id = thread.id;
            select.name = thread.id;

            thread.options.forEach(function(option) {
                var optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                select.appendChild(optionElement);
            }); 
            formGroup.appendChild(select);
            retainingCollarContainerDiv.appendChild(formGroup);
        
        }); 

        additionalQuestions.appendChild(retainingCollarContainerDiv);
    }
});


