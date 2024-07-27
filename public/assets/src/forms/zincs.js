
    let sectionCount = 1;

    function addFormSection() {
        sectionCount++;
        const formSections = document.getElementById('form-sections');
        const newSection = document.createElement('div');
        newSection.classList.add('form-section');
        newSection.innerHTML = `
            <div class="container">
                <div class="form-group">
                    <label for="location-${sectionCount}">Location</label>
                    <select id="location-${sectionCount}" name="location-${sectionCount}" required>
                    <option value=""></option>
                    <option value="hull" data-translate="hull">Hull</option>
                    <option value="propeller" data-translate="propeller">Propeller</option>
                    <option value="rope-guard" data-translate="ropeGuard">Rope-Guard</option>
                    <option value="bow thruster" data-translate="bowThruster">BowThruster</option>
                    <option value="jets" data-translate="jets">Jets</option>
                    <option value="rudder" data-translate="rudder">Rudder</option>
                    <option value="trim-tab" data-translate="trimTab">Trim Tab</option>
                    <option value="shaft" data-translate="shaft">Shaft</option>
                    <option value="sea-chest" data-translate="seaChest">Sea Chest</option>
                    <option value="coolers" data-translate="coolers">Coolers</option>
                    <option value="engine" data-translate="engine">Engine</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="count-${sectionCount}" data-translate="amount">Amount</label>
                    <input type="number" id="count-${sectionCount}" name="count-${sectionCount}" required>
                </div>
                <div class="form-group">
                    <label for="material-${sectionCount}" data-translate="material">Material</label>
                    <select id="material-${sectionCount}" name="material-${sectionCount}" required>
                        <option value=""></option>
                        <option value="zinc" data-translate="zinc">Zinc</option>
                        <option value="aluminum" data-translate="aluminum">Aluminum</option>
                        <option value="magnesium" data-translate="magnesium">Magnesium</option>
                    </select>
                </div>
            </div>
        `;
        formSections.appendChild(newSection);
        console.log(`New section added with id zinc-${sectionCount}`); // Debugging statement
    }

    // window.deleteFormSection = function(sectionId) {
    //     const section = document.getElementById(`section-${sectionId}`);
    //     if (section) {
    //         section.remove();
    //         console.log(`Section ${sectionId} removed`);
    //     }
    // }

    //<button type="button" class="delete-button" onclick="deleteFormSection(${sectionCount})">Delete</button>

    document.getElementById('add-button').onclick = function() {
        this.classList.toggle('rotated');
        addFormSection();
    };
