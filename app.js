/**
 * Palette - Mood of the Day
 * Main Application JavaScript
 */

class PaletteApp {
    constructor() {
        this.audioPlayer = null;
        this.isPlaying = false;
        this.selectedColor = '#97c1a9';
        this.guestbookEntries = [];

        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.applyRandomTheme();
            this.loadData();
            this.setupEventListeners();
            this.loadGuestbookFromStorage();
        });
    }

    // Apply random theme color on page load
    applyRandomTheme() {
        const themes = PALETTE_DATA.themes;
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        document.body.classList.add(`theme-${randomTheme.name}`);

        // Update CSS variable
        document.documentElement.style.setProperty('--theme-primary', randomTheme.color);
    }

    // Load data into the page
    loadData() {
        // Question Section
        const questionText = document.getElementById('question-text');
        const answerText = document.getElementById('answer-text');
        if (questionText) questionText.textContent = PALETTE_DATA.question.text;
        if (answerText) answerText.textContent = PALETTE_DATA.question.answer;

        // Gallery Section
        const galleryImage = document.getElementById('gallery-image');
        const galleryCaption = document.getElementById('gallery-caption');
        if (galleryImage) galleryImage.src = PALETTE_DATA.gallery.imageUrl;
        if (galleryCaption) galleryCaption.textContent = PALETTE_DATA.gallery.caption;

        // Music Section
        const musicTitle = document.getElementById('music-title');
        const musicArtist = document.getElementById('music-artist');
        if (musicTitle) musicTitle.textContent = PALETTE_DATA.music.title;
        if (musicArtist) musicArtist.textContent = PALETTE_DATA.music.artist;

        // Setup audio player
        this.audioPlayer = document.getElementById('audio-player');
        if (this.audioPlayer) {
            this.audioPlayer.src = PALETTE_DATA.music.audioUrl;
        }
    }

    // Setup all event listeners
    setupEventListeners() {
        // Expand button for question/answer
        const expandBtn = document.getElementById('expand-btn');
        const answerContainer = document.getElementById('answer-container');

        if (expandBtn && answerContainer) {
            expandBtn.addEventListener('click', () => {
                expandBtn.classList.toggle('active');
                answerContainer.classList.toggle('expanded');
            });
        }

        // Music player controls
        const playBtn = document.getElementById('play-btn');
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        const progressBar = document.getElementById('progress-bar');

        if (playBtn && this.audioPlayer) {
            playBtn.addEventListener('click', () => {
                if (this.isPlaying) {
                    this.audioPlayer.pause();
                    playIcon.classList.remove('hidden');
                    pauseIcon.classList.add('hidden');
                } else {
                    this.audioPlayer.play().catch(e => console.log('Audio play failed:', e));
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                }
                this.isPlaying = !this.isPlaying;
            });

            // Update progress bar
            this.audioPlayer.addEventListener('timeupdate', () => {
                if (this.audioPlayer.duration) {
                    const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
                    if (progressBar) progressBar.style.width = `${progress}%`;
                }
            });

            // Reset when audio ends
            this.audioPlayer.addEventListener('ended', () => {
                this.isPlaying = false;
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                if (progressBar) progressBar.style.width = '0%';
            });
        }

        // Color picker for guestbook
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.selectedColor = option.dataset.color;
            });
        });

        // Select first color by default
        if (colorOptions.length > 0) {
            colorOptions[0].classList.add('selected');
        }

        // Guestbook submit
        const submitBtn = document.getElementById('submit-btn');
        const guestbookInput = document.getElementById('guestbook-input');

        if (submitBtn && guestbookInput) {
            submitBtn.addEventListener('click', () => {
                this.addGuestbookEntry();
            });

            guestbookInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addGuestbookEntry();
                }
            });
        }
    }

    // Add new guestbook entry
    addGuestbookEntry() {
        const input = document.getElementById('guestbook-input');
        const message = input.value.trim();

        if (!message) return;

        const entry = {
            color: this.selectedColor,
            message: message,
            timestamp: new Date().toISOString()
        };

        this.guestbookEntries.unshift(entry);
        this.renderGuestbookEntry(entry, true);
        this.saveGuestbookToStorage();

        input.value = '';
    }

    // Render a single guestbook entry
    renderGuestbookEntry(entry, isNew = false) {
        const container = document.getElementById('guestbook-entries');
        if (!container) return;

        const entryEl = document.createElement('div');
        entryEl.className = 'guestbook-entry';
        if (isNew) {
            entryEl.style.animation = 'slideIn 0.4s ease';
        }

        entryEl.innerHTML = `
            <div class="entry-color" style="background-color: ${entry.color};"></div>
            <p class="entry-message">${this.escapeHtml(entry.message)}</p>
        `;

        if (isNew) {
            container.insertBefore(entryEl, container.firstChild);
        } else {
            container.appendChild(entryEl);
        }
    }

    // Load guestbook entries from localStorage
    loadGuestbookFromStorage() {
        try {
            const stored = localStorage.getItem('palette_guestbook');
            if (stored) {
                this.guestbookEntries = JSON.parse(stored);
            } else {
                // Load sample entries if no stored data
                this.guestbookEntries = PALETTE_DATA.guestbookEntries || [];
            }

            this.guestbookEntries.forEach(entry => {
                this.renderGuestbookEntry(entry, false);
            });
        } catch (e) {
            console.log('Failed to load guestbook:', e);
        }
    }

    // Save guestbook entries to localStorage
    saveGuestbookToStorage() {
        try {
            localStorage.setItem('palette_guestbook', JSON.stringify(this.guestbookEntries));
        } catch (e) {
            console.log('Failed to save guestbook:', e);
        }
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
new PaletteApp();
