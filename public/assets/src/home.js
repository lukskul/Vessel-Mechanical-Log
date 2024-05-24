 
const mainBlock = document.getElementById('main-block-home');
const addWorkButton = document.getElementById('add-work-button'); 
const archiveButton = document.getElementById('archive-button'); 
const formBlock = document.getElementById('main-block-vessel-form');

/*Page One is a choice to see the work archive or add new work. */ 

document.addEventListener('DOMContentLoaded', async function() {
    addWorkButton.addEventListener('click', function() {
        mainBlock.style.display='none';
        formBlock.style.display='block';  
    });
});  