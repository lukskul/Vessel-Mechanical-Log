export function changeLanguage(language) {
    fetch(`${language}.json`)
      .then(response => response.json())
      .then(data => {
        document.querySelectorAll('[data-translate]').forEach(element => {
          const key = element.getAttribute('data-translate');
          element.textContent = data[key];
        });
      })
      .catch(error => console.error('Error loading translation:', error));
  }

export let language = '';
const languageSelectButton = document.getElementById('language-select');

if (languageSelectButton) {
    languageSelectButton.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'en' ? 'es' : 'en';
        document.documentElement.lang = newLang;
        changeLanguage(newLang);
    });
}