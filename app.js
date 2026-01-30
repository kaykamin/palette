/**
 * Palette - Application Logic
 */

// 1. Set your secret password here
const SECRET_PASSWORD = "1234"; 

// 2. Data Rendering Logic
function renderPalette() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Select daily data based on current date
    const data = dailyData[dayOfYear % dailyData.length];

    // Inject Text Content
    document.getElementById('question-text').innerText = data.question;
    document.getElementById('answer-text').innerText = data.answer;
    
    // Inject Image and Caption
    document.getElementById('today-image').src = data.imageUrl;
    document.getElementById('image-caption').innerText = data.caption;
    
    // Inject Music Content
    document.getElementById('music-title').innerText = data.music.title;
    document.getElementById('music-artist').innerText = data.music.artist;
    document.getElementById('main-audio').src = data.music.audioUrl;

    // Apply Random Theme
    applyTheme();
}

// 3. Random Theme Application
function applyTheme() {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const title = document.getElementById('site-title');
    const playBtn = document.getElementById('play-btn');
    
    if (title) title.style.color = randomTheme.color;
    if (playBtn) playBtn.style.backgroundColor = randomTheme.color;
}

// 4. Login Logic
const loginBtn = document.getElementById('btn-login');
const passwordInput = document.getElementById('password-input');

if (loginBtn) {
    loginBtn.onclick = () => {
        const value = passwordInput.value;
        const loginScreen = document.getElementById('login-screen');
        const appScreen = document.getElementById('app');
        const errorMsg = document.getElementById('error-msg');

        if (value === SECRET_PASSWORD) {
            loginScreen.classList.add('hidden');
            appScreen.classList.remove('hidden');
            renderPalette();
        } else {
            errorMsg.classList.remove('hidden');
            passwordInput.value = "";
        }
    };
}

// Enter key support for password
if (passwordInput) {
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loginBtn.click();
    });
}

// 5. Interaction (Expand/Collapse)
const expandBtn = document.getElementById('expand-btn');
if (expandBtn) {
    expandBtn.onclick = () => {
        const container = document.getElementById('answer-container');
        const isHidden = container.classList.toggle('hidden');
        expandBtn.querySelector('span').innerText = isHidden ? 'Read More' : 'Close';
    };
}

// 6. Audio Player Control
const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');

if (playBtn) {
    playBtn.onclick = () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerText = '⏸';
        } else {
            audio.pause();
            playBtn.innerText = '▶';
        }
    };
}
