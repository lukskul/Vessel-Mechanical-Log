
export function loadHTMLBlock(containerId, blockFile, callback) {
    return new Promise((resolve, reject) => {
        fetch(blockFile)
            .then(response => response.text())
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
                resolve(); 
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch(error => {
                console.error(`Error fetching ${blockFile}:`, error);
                reject(error); 
            });
        
    });
}



  

