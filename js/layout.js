async function injectFragment(placeholderId, fragmentPath, onLoad) {
  const target = document.getElementById(placeholderId);
  if (!target) return;

  try {
    const response = await fetch(fragmentPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${fragmentPath}`);
    }
    target.innerHTML = await response.text();
    if (typeof onLoad === 'function') {
      onLoad();
    }
  } catch (error) {
    console.error(error);
  }
}

function configureLanguageToggle() {
  const langToggle = document.getElementById('language-toggle');
  const currentLang = document.body.dataset.lang || document.documentElement.lang || 'de';
  if (!langToggle) return;

  const alternateUrl = document.body.dataset.altLangUrl || '/';
  const targetLang = currentLang.startsWith('de') ? 'ru' : 'de';
  langToggle.href = alternateUrl;
  langToggle.lang = targetLang;
  langToggle.textContent = targetLang.toUpperCase();
  langToggle.setAttribute(
    'aria-label',
    currentLang.startsWith('de') ? 'Auf Russisch wechseln' : 'Переключиться на немецкую версию'
  );
}

function initializeLayout() {
  injectFragment('header-placeholder', '/layout/header.html', configureLanguageToggle);
  injectFragment('footer-placeholder', '/layout/footer.html');
}

document.addEventListener('DOMContentLoaded', initializeLayout);
