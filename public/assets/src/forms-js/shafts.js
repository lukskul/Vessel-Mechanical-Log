function updatePositionOptions() {
    const shafts = document.getElementById('shafts').value;
    const positionSelect = document.getElementById('position');
    positionSelect.innerHTML = ''; // Clear existing options

    let options = [];

    if (shafts == 1) {
        options = ['Position doesn\'t matter'];
    } else if (shafts == 2) {
        options = ['Stbd', 'Port'];
    } else if (shafts == 3) {
        options = ['Stbd', 'Port', 'Center'];
    } else if (shafts == 4) {
        options = ['Port OB', 'Port IB', 'Stbd OB', 'Stbd IB'];
    } else if (shafts == 5) {
        options = ['Port OB', 'Port IB', 'Stbd OB', 'Stbd IB', 'Center'];
    } else if (shafts == 6) {
        options = ['Port OB', 'Port IB', 'Port Center', 'Stbd OB', 'Stbd IB', 'Stbd Center'];
    }

    options.forEach(function(option) {
        const opt = document.createElement('option');
        opt.value = option.toLowerCase().replace(/ /g, '_');
        opt.innerHTML = option;
        positionSelect.appendChild(opt);
    });
}