const themeBtn = document.getElementById('themeBtn');
const themeLabel = document.getElementById('themeLabel');
const copyBtn = document.getElementById('copyBtn');

themeBtn.addEventListener('click', () => {
    document.body.classList.add('theme-transitioning');
    
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeLabel.textContent = 'THEME: LIGHT';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeLabel.textContent = 'THEME: DARK';
    }
    
    setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
    }, 500);
});

copyBtn.addEventListener('click', () => {
    const codeText = document.getElementById('cppCode').innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        copyBtn.textContent = 'COPIED';
        copyBtn.style.borderColor = 'var(--text-code)';
        copyBtn.style.color = 'var(--text-code)';
        
        setTimeout(() => {
            copyBtn.textContent = 'COPY';
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
        }, 2000);
    });
});