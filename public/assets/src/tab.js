    import { showTasks, showTasksArchive } from "./tasks";
    
    const addWorkTab = document.getElementById("add-work-tab");
    const archiveTab = document.getElementById("archive-tab");  


    addWorkTab.addEventListener('click', function() {
        showTasks(); 
        console.log("add-work-tab has been clicked"); 
    })

    archiveTab.addEventListener('click', function() {
        showTasksArchive();   
    })
    
    // // JavaScript to handle tab switching
    // const tabButtons = document.querySelectorAll('.tab-button');
    // const tabContents = document.querySelectorAll('.tab-content');

    // tabButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         tabContents.forEach(content => {
    //             content.style.display = 'none';
    //         });
    //         document.getElementById(button.dataset.tab).style.display = 'block';
    //     });
    // });

    // // Fetch and display tasks for the selected vessel
    // document.addEventListener('DOMContentLoaded', () => {
    //     const state = {
    //         selectedVessel: null,
    //         setSelectedVessel(vessel) {
    //             if (typeof vessel === 'string') {
    //                 this.selectedVessel = null;
    //             } else {
    //                 this.selectedVessel = vessel;
    //             }

    //             const vesselForm = document.getElementById('vessel-form');
    //             const selectedVesselHeading = document.getElementById('selected-vessel-heading');

    //             if (this.selectedVessel == null) {
    //                 vesselForm.style.display = 'block';
    //                 selectedVesselHeading.style.display = 'none';
    //             } else {
    //                 selectedVesselHeading.textContent = `${this.selectedVessel['vessel-name'] || 'None'}`;
    //                 vesselForm.style.display = 'none';
    //                 selectedVesselHeading.style.display = 'block';
    //             }
    //         }
    //     };
    // });