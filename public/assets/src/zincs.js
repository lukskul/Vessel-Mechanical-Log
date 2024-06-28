export function afterLoad() {
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
                    <option value="hull">Hull</option>
                    <option value="propeller">Propeller</option>
                    <option value="rope-guard">Rope-Guard</option>
                    <option value="bow thruster">BowThruster</option>
                    <option value="jets">Jets</option>
                    <option value="rudder">Rudder</option>
                    <option value="trim-tab">Trim Tab</option>
                    <option value="shaft">Shaft</option>
                    <option value="sea-chest">Sea Chest</option>
                    <option value="engine">Engine</option>
                    <option value="keel">Keel</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="count-${sectionCount}">Amount</label>
                    <input type="number" id="count-${sectionCount}" name="count-${sectionCount}" required>
                </div>
                <div class="form-group">
                    <label for="material-${sectionCount}">Material</label>
                    <select id="material-${sectionCount}" name="material-${sectionCount}" required>
                        <option value="zinc">Zinc</option>
                        <option value="aluminum">Aluminum</option>
                        <option value="magnesium">Magnesium</option>
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
        addFormSection();
    };
}