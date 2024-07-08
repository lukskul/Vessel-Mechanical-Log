export let language = 'en'; // Set default language to 'en'

const languageSelectButton = document.getElementById('language-select');

export function changeLanguage(newLang) {
    fetch(`/language/${newLang}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                element.textContent = data[key];
            });
            language = newLang; // Update the language variable
        })
        .catch(error => console.error('Error loading translation:', error));
}

if (languageSelectButton) {
    languageSelectButton.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'en' ? 'es' : 'en';
        document.documentElement.lang = newLang;
        changeLanguage(newLang);
    });
}

// Call changeLanguage on page load to set the initial language
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(language);
});
