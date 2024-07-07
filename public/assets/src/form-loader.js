import { changeLanguage, language } from "./language";

export function loadHTMLBlock(containerId, blockFile, scriptFile, callback) {
    return new Promise((resolve, reject) => {
        fetch(blockFile)
            .then(response => response.text())
            .then(html => {
                document.getElementById(containerId).innerHTML = html;

                if (language) {
                    console.log('Language is in spanish.');
                    changeLanguage(language); 
                }

                if (scriptFile) {
                    loadScript(scriptFile)
                        .then(() => {
                            resolve();
                            if (typeof callback === 'function') {
                                callback();
                            }
                        })
                        .catch(error => {
                            console.error(`Error loading script ${scriptFile}:`, error);
                            reject(error);
                        });
                } else {
                    resolve();
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            })
            .catch(error => {
                console.error(`Error fetching ${blockFile}:`, error);
                reject(error);
            });
    });
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
    });
}


  

