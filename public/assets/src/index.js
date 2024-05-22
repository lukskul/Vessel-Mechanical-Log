
import '../css/button.css'; 
import '../css/global.css';


document.getElementById('data-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const data = { text: document.getElementById('data-input').value };

  fetch('/save', {
    method: 'POST',  
    headers: {
      'Content-Type': 'application/json'    
    },
    body: JSON.stringify(data)
  })  
  
  .then(response => response.text())     
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

