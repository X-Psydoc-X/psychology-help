// ========== PsyDoc — СПІЛЬНІ ФУНКЦІЇ ==========

// Toast повідомлення
function showToast(message, type = 'accent') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.background = type === 'gold' ? 'var(--gold)' : 'var(--accent)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Відкриття/закриття модального вікна
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

// Активне посилання в навігації
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === page);
  });
}

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  
  // Закриття модальних вікон при кліку на оверлей
  document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
});

// ========== ЗБЕРЕЖЕННЯ РЕЗУЛЬТАТІВ ТЕСТІВ ==========
const testResults = JSON.parse(localStorage.getItem('testResults') || '{}');

function saveTestResult(testId, result) {
  testResults[testId] = { result, date: new Date().toISOString() };
  localStorage.setItem('testResults', JSON.stringify(testResults));
  showToast(`✓ Результат збережено в профіль`);
}

// ========== ЕКСПОРТ ДАНИХ ==========
function exportUserData() {
  const data = {
    testResults: JSON.parse(localStorage.getItem('testResults') || '{}'),
    makJournal: JSON.parse(localStorage.getItem('makJournal') || '[]'),
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `psydoc_data_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Дані експортовано');
}