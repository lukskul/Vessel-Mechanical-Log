 
const mainBlock = document.getElementById('main-block-page-1');
const workLogButton = document.getElementById('work-log-button'); 
const formBlock = document.getElementById('main-block-form');

document.addEventListener('DOMContentLoaded', async function() {

    workLogButton.addEventListener('click', function() {
        mainBlock.style.display='none';
        formBlock.style.display='block';  
    });

});  