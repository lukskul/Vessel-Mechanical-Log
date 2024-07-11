//TasksSVG will put the task image in the menu left corner

const taskIdentifier = document.getElementById('task-identifier');

export function loadTaskSVG(taskType) {
    let svgFile;

    switch (taskType) {
        case 'engines':
            svgFile = 'assets/icons/engine.svg';
            break;
        case 'props':
            svgFile = 'assets/icons/props.svg';
            break;
        case 'zincs':
            svgFile = 'assets/icons/zincs.svg';
            break;
        case 'shafts':
            svgFile = 'assets/icons/shafts.svg'; 
            break; 
        case 'motor':
            svgFile = 'assets/icons/motor.svg'; 
            break; 
        // Add more cases as needed
        default:
            console.error('Unknown task type for SVG:', taskType);
            return;
    }

    fetch(svgFile)
        .then(response => response.text())
        .then(svgContent => {
            taskIdentifier.style.display = 'block';
            taskIdentifier.innerHTML = svgContent;
            const svgElement = taskIdentifier.querySelector('svg');
            if (svgElement) {
                svgElement.classList.add('taskIdentifier');
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
                svgElement.style.height = '55px'; 
                svgElement.style.width = '55px'; 
                svgElement.style.top = '2px';
            } else {
                console.error('Icon not found');
            }
        })
        .catch(error => {
            console.error('Error loading default logo:', error);
            taskIdentifier.innerHTML = `<p>Error loading default logo.</p>`;
        });
}
