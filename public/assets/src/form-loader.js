
export function loadHTMLBlock(containerId, blockFile) {
    return new Promise((resolve, reject) => {
        fetch(blockFile)
            .then(response => response.text())
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
                resolve(); 
            })
            .catch(error => {
                console.error(`Error fetching ${blockFile}:`, error);
                reject(error); 
            });
    });
}



  

