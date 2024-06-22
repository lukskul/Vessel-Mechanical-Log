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
                    <label for="zinc-style-${sectionCount}">Zinc Style</label>
                    <select id="zinc-style-${sectionCount}" name="zinc-style-${sectionCount}" required>
                        <option value="">Select a style</option>
                        <option value="hull-anode">Hull Anode</option>
                        <option value="propeller-anode">Propeller Anode</option>
                        <option value="rudder-anode">Rudder Anode</option>
                        <option value="trim-tab-anode">Trim Tab Anode</option>
                        <option value="shaft-anode">Shaft Anode</option>
                        <option value="engine-anode">Engine Anode</option>
                        <option value="hull-plate-anode">Hull Plate Anode</option>
                        <option value="keel-anode">Keel Anode</option>
                        <option value="collar-anode">Collar Anode</option>
                        <option value="disc-anode">Disc Anode</option>
                        <option value="streamlined-anode">Streamlined Anode</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="zinc-style-count-${sectionCount}">Number of this style</label>
                    <input type="number" id="zinc-style-count-${sectionCount}" name="zinc-style-count-${sectionCount}-count" required>
                </div>
                <div class="form-group">
                    <label for="material-${sectionCount}">Material</label>
                    <select id="material-${sectionCount}" name="material-${sectionCount}" required>
                        <option value="">Select a material</option>
                        <option value="zinc">Zinc</option>
                        <option value="aluminum">Aluminum</option>
                        <option value="magnesium">Magnesium</option>
                    </select>
                </div>
            </div>
        `;
        formSections.appendChild(newSection);
        console.log(`New section added with id zinc-count-${sectionCount}`); // Debugging statement
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