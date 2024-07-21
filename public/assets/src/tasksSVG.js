//TasksSVG will put the task image in the menu left corner

export const taskIdentifier = document.getElementById('task-identifier');

export function loadTaskSVG(taskType) {

    let svgFile;

    switch (taskType) {
        case 'electricMotors':
            svgFile = 'assets/icons/motor.svg'; 
            break; 
        case 'engines':
            svgFile = 'assets/icons/engine.svg';
            break;
        case 'props':
            svgFile = 'assets/icons/props.svg';
            break;
        case 'shafts':
            svgFile = 'assets/icons/shafts.svg'; 
            break; 
        case 'generators':
            svgFile = 'assets/icons/generator.svg'; 
            break; 
        case 'bow-thrusters':
            svgFile = 'assets/icons/bowThruster.svg'; 
            break;     
        case 'rudder':
            svgFile = 'assets/icons/rudder.svg'; 
            break; 
        case 'sea-screens':
            svgFile = 'assets/icons/screen.svg'; 
            break; 
        case 'doors':
            svgFile = 'assets/icons/door.svg'; 
            break; 
        case 'zincs':
            svgFile = 'assets/icons/zincs.svg';
            break;
        case 'misc':
            svgFile = 'assets/icons/plus.svg'; 
            break; 

        // Add more cases as needed
        default:
            console.error('Unknown task type for SVG:', taskType);
            return;
    } 

    taskIdentifier.classList.remove('visible');

    fetch(svgFile)
        .then(response => response.text())
        .then(svgContent => {
            taskIdentifier.style.display = 'block';
            taskIdentifier.innerHTML = svgContent;
            const svgElement = taskIdentifier.querySelector('svg');
            if (svgElement) {
                svgElement.classList.add('taskIdentifier');
                setTimeout(() => {
                    taskIdentifier.classList.add('visible');
                }, 10); 
            } else {
                console.error('Icon element not found');
            }
        })
        .catch(error => {
            console.error('Error loading SVG:', error);
            taskIdentifier.innerHTML = `<p>Error loading SVG for ${taskType}.</p>`;
        });
}

export function loadDefaultLogo() {

    const defaultLogoPath = 'assets/icons/wrench-hammer.svg';

    fetch(defaultLogoPath)
        .then(response => response.text())
        .then(logoContent => {
            taskIdentifier.style.display = 'block';
            taskIdentifier.innerHTML = logoContent;
            const svgElement = taskIdentifier.querySelector('svg');
            if (svgElement) {
                svgElement.classList.add('taskIdentifier');
                svgElement.style.backgroundColor = 'black';
                svgElement.style.border= '2px solid white';
                svgElement.style.height = '55px'; 
                svgElement.style.width = '55px'; 
                svgElement.style.top = '2px';

                setTimeout(() => {
                    taskIdentifier.classList.add('visible');
                }, 10); // Adjust delay as needed
            
            } else {
                console.error('Icon not found');
            }
        })
        .catch(error => {
            console.error('Error loading default logo:', error);
            taskIdentifier.innerHTML = `<p>Error loading default logo.</p>`;
        });
}
