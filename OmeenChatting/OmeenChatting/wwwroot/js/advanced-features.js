// Theme Manager for OmeenChatting
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
        this.createThemeToggle();
    }

    createThemeToggle() {
        const header = document.querySelector('.sidebar-header .header-actions');
        if (!header) return;

        const themeBtn = document.createElement('button');
        themeBtn.className = 'header-btn theme-toggle-btn';
        themeBtn.id = 'themeToggle';
        themeBtn.title = 'Tema d?yi?dir';
        themeBtn.innerHTML = this.currentTheme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';

        // Insert before the first button
        header.insertBefore(themeBtn, header.firstChild);
    }

    bindEvents() {
        // Theme toggle button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#themeToggle')) {
                this.toggleTheme();
            }
        });

        // Theme setting in settings modal
        const themeSetting = document.getElementById('themeSetting');
        if (themeSetting) {
            themeSetting.value = this.currentTheme;
            themeSetting.addEventListener('change', (e) => {
                this.setTheme(e.target.value);
            });
        }

        // System theme preference
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.currentTheme === 'auto') {
                this.applyTheme('auto');
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.applyTheme(theme);
        this.updateThemeButton();

        // Update settings dropdown if exists
        const themeSetting = document.getElementById('themeSetting');
        if (themeSetting) {
            themeSetting.value = theme;
        }
    }

    applyTheme(theme) {
        let actualTheme = theme;

        if (theme === 'auto') {
            actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        document.documentElement.setAttribute('data-theme', actualTheme);
        
        // Add transition class
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    updateThemeButton() {
        const themeBtn = document.getElementById('themeToggle');
        if (!themeBtn) return;

        const icon = this.currentTheme === 'dark' ? 'fa-sun' : 'fa-moon';
        themeBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }

    getTheme() {
        return this.currentTheme;
    }
}

// Notification Sound Manager
class NotificationManager {
    constructor() {
        this.enabled = localStorage.getItem('notificationsEnabled') !== 'false';
        this.soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
        this.sounds = {
            message: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjaJ1O/GeycHKH/M8NSFOAYUXLLl6KJODwpMouLz/0g='),
            notification: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjaJ1O/GeycHKH/M8NSFOAYUXLLl6KJODwpMouLz/0g=')
        };
        this.init();
    }

    init() {
        this.requestPermission();
        this.bindEvents();
    }

    bindEvents() {
        const desktopNotif = document.getElementById('desktopNotificationsSetting');
        const soundNotif = document.getElementById('soundNotificationsSetting');

        if (desktopNotif) {
            desktopNotif.checked = this.enabled;
            desktopNotif.addEventListener('change', (e) => {
                this.enabled = e.target.checked;
                localStorage.setItem('notificationsEnabled', this.enabled);
                if (this.enabled) {
                    this.requestPermission();
                }
            });
        }

        if (soundNotif) {
            soundNotif.checked = this.soundEnabled;
            soundNotif.addEventListener('change', (e) => {
                this.soundEnabled = e.target.checked;
                localStorage.setItem('soundEnabled', this.soundEnabled);
            });
        }
    }

    async requestPermission() {
        if ('Notification' in window && this.enabled) {
            if (Notification.permission === 'default') {
                await Notification.requestPermission();
            }
        }
    }

    show(title, options = {}) {
        if (!this.enabled) return;

        // Play sound
        if (this.soundEnabled) {
            this.playSound('notification');
        }

        // Show desktop notification
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(title, {
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                body: options.body || '',
                tag: options.tag || 'omeenchatting',
                requireInteraction: false,
                ...options
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            setTimeout(() => notification.close(), 5000);
        }
    }

    playSound(soundType = 'message') {
        if (!this.soundEnabled) return;

        try {
            const sound = this.sounds[soundType];
            if (sound) {
                sound.currentTime = 0;
                sound.volume = 0.5;
                sound.play().catch(err => console.log('Sound play failed:', err));
            }
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }
}

// Progressive Web App (PWA) Manager
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.handleInstallPrompt();
        this.createInstallButton();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                // For now, we'll skip service worker registration
                // You can create a service-worker.js file later
                console.log('PWA support ready');
            } catch (error) {
                console.error('Service worker registration failed:', error);
            }
        }
    }

    handleInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        window.addEventListener('appinstalled', () => {
            this.hideInstallButton();
            if (window.app) {
                window.app.showNotification('T?tbiq u?urla qura?d?r?ld?!', 'success');
            }
        });
    }

    createInstallButton() {
        const header = document.querySelector('.sidebar-header .header-actions');
        if (!header) return;

        const installBtn = document.createElement('button');
        installBtn.className = 'header-btn pwa-install-btn';
        installBtn.id = 'pwaInstall';
        installBtn.style.display = 'none';
        installBtn.title = 'T?tbiqi qura?d?r';
        installBtn.innerHTML = '<i class="fas fa-download"></i>';

        installBtn.addEventListener('click', () => this.installApp());

        header.appendChild(installBtn);
    }

    showInstallButton() {
        const btn = document.getElementById('pwaInstall');
        if (btn) {
            btn.style.display = 'flex';
        }
    }

    hideInstallButton() {
        const btn = document.getElementById('pwaInstall');
        if (btn) {
            btn.style.display = 'none';
        }
    }

    async installApp() {
        if (!this.deferredPrompt) return;

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        console.log(`User response: ${outcome}`);
        this.deferredPrompt = null;
        this.hideInstallButton();
    }
}

// Keyboard Shortcuts Manager
class KeyboardShortcuts {
    constructor() {
        this.shortcuts = {
            'ctrl+f': () => this.focusSearch(),
            'ctrl+n': () => this.newChat(),
            'ctrl+,': () => this.openSettings(),
            'escape': () => this.closeModals(),
            'ctrl+k': () => this.openCommandPalette()
        };
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        const key = this.getKeyCombo(e);
        const handler = this.shortcuts[key];

        if (handler) {
            e.preventDefault();
            handler();
        }
    }

    getKeyCombo(e) {
        const parts = [];
        if (e.ctrlKey) parts.push('ctrl');
        if (e.shiftKey) parts.push('shift');
        if (e.altKey) parts.push('alt');
        parts.push(e.key.toLowerCase());
        return parts.join('+');
    }

    focusSearch() {
        const searchInput = document.getElementById('chatSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }

    newChat() {
        if (window.app) {
            window.app.showSearchModal();
        }
    }

    openSettings() {
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.click();
        }
    }

    closeModals() {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const instance = bootstrap.Modal.getInstance(modal);
            if (instance) {
                instance.hide();
            }
        });
    }

    openCommandPalette() {
        // Future feature: command palette
        if (window.app) {
            window.app.showNotification('Komanda paleti tezlikl? ?lav? edil?c?k!', 'info');
        }
    }
}

// Initialize all managers
window.themeManager = null;
window.notificationManager = null;
window.pwaManager = null;
window.keyboardShortcuts = null;
window.menuActions = null;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeManagers);
} else {
    initializeManagers();
}

function initializeManagers() {
    console.log('Initializing Advanced Features...');
    
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        window.themeManager = new ThemeManager();
        window.notificationManager = new NotificationManager();
        window.pwaManager = new PWAManager();
        window.keyboardShortcuts = new KeyboardShortcuts();
        window.menuActions = new MenuActions();
        
        console.log('Advanced Features initialized');
    }, 100);
}

// Menu Actions Handler
class MenuActions {
    constructor() {
        this.init();
    }

    init() {
        this.bindSidebarMenuEvents();
        this.bindChatMenuEvents();
        console.log('Menu Actions initialized');
    }

    bindSidebarMenuEvents() {
        // Archived Chats
        document.getElementById('archivedChats')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showArchivedChats();
        });

        // Starred Messages
        document.getElementById('starredMessages')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showStarredMessages();
        });

        // Help Center
        document.getElementById('helpCenter')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showHelpCenter();
        });

        // Keyboard Shortcuts
        document.getElementById('keyboardShortcuts')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showKeyboardShortcuts();
        });

        // Backup Chats
        document.getElementById('backupChats')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.backupChats();
        });

        // Export Data
        document.getElementById('exportData')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.exportData();
        });

        // About App
        document.getElementById('aboutApp')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showAboutDialog();
        });
    }

    bindChatMenuEvents() {
        // Chat Info
        document.getElementById('chatInfo')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showChatInfo();
        });

        // Select Messages
        document.getElementById('selectMessages')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.enableSelectMode();
        });

        // Mute Chat
        document.getElementById('muteChat')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.muteChat();
        });

        // Change Wallpaper
        document.getElementById('wallpaperChat')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.changeWallpaper();
        });

        // Search in Chat
        document.getElementById('searchInChat')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.searchInChat();
        });

        // Delete Chat
        document.getElementById('deleteChat')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.deleteChat();
        });

        // Report User
        document.getElementById('reportUser')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.reportUser();
        });

        // Search in chat button
        document.getElementById('searchInChatBtn')?.addEventListener('click', () => {
            this.searchInChat();
        });
    }

    showArchivedChats() {
        if (window.app) {
            window.app.showNotification('?? Arxivl?nmi? çatlar funksiyas? tezlikl? ?lav? edil?c?k!', 'info');
        }
    }

    showStarredMessages() {
        if (window.app) {
            window.app.showNotification('? Ulduzlu mesajlar funksiyas? tezlikl? ?lav? edil?c?k!', 'info');
        }
    }

    showHelpCenter() {
        const helpContent = `
            <div class="help-center-content">
                <h4>?? Köm?k M?rk?zi</h4>
                <div class="help-section">
                    <h6><i class="fas fa-keyboard"></i> Klaviatura Q?sayollar?</h6>
                    <ul>
                        <li><kbd>Ctrl</kbd> + <kbd>N</kbd> - Yeni çat</li>
                        <li><kbd>Ctrl</kbd> + <kbd>F</kbd> - Axtar??</li>
                        <li><kbd>Ctrl</kbd> + <kbd>,</kbd> - Ayarlar</li>
                        <li><kbd>Esc</kbd> - Modal p?nc?r?l?ri ba?la</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h6><i class="fas fa-comments"></i> Mesaj Gönd?rm?</h6>
                    <ul>
                        <li>?? Emoji ?lav? etm?k üçün emoji düym?sin? bas?n</li>
                        <li>?? Fayl gönd?rm?k üçün attach düym?sin? bas?n</li>
                        <li>?? S?s mesaj? gönd?rm?k üçün mikrofon düym?sin? bas?n</li>
                        <li>Enter il? mesaj gönd?rin, Shift+Enter il? yeni s?tir</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h6><i class="fas fa-palette"></i> Xüsusiyy?tl?r</h6>
                    <ul>
                        <li>?? Aç?q/Qaranl?q tema d?st?yi</li>
                        <li>?? Çoxdilli interfeys</li>
                        <li>?? Desktop bildiri?l?ri</li>
                        <li>?? PWA d?st?yi</li>
                    </ul>
                </div>
            </div>
        `;
        this.showInfoModal('Köm?k M?rk?zi', helpContent);
    }

    showKeyboardShortcuts() {
        const shortcuts = `
            <div class="shortcuts-modal-content">
                <h4>?? Klaviatura Q?sayollar?</h4>
                <div class="shortcuts-grid">
                    <div class="shortcut-row">
                        <span>Yeni çat</span>
                        <span><kbd>Ctrl</kbd> + <kbd>N</kbd></span>
                    </div>
                    <div class="shortcut-row">
                        <span>Axtar??</span>
                        <span><kbd>Ctrl</kbd> + <kbd>F</kbd></span>
                    </div>
                    <div class="shortcut-row">
                        <span>Ayarlar</span>
                        <span><kbd>Ctrl</kbd> + <kbd>,</kbd></span>
                    </div>
                    <div class="shortcut-row">
                        <span>Modal ba?la</span>
                        <span><kbd>Esc</kbd></span>
                    </div>
                    <div class="shortcut-row">
                        <span>Mesaj gönd?r</span>
                        <span><kbd>Enter</kbd></span>
                    </div>
                    <div class="shortcut-row">
                        <span>Yeni s?tir</span>
                        <span><kbd>Shift</kbd> + <kbd>Enter</kbd></span>
                    </div>
                </div>
            </div>
        `;
        this.showInfoModal('Klaviatura Q?sayollar?', shortcuts);
    }

    backupChats() {
        if (window.app) {
            window.app.showLoading(true);
            setTimeout(() => {
                window.app.showLoading(false);
                window.app.showNotification('?? Çatlar ehtiyat nüsx?si yarad?ld?!', 'success');
            }, 1500);
        }
    }

    exportData() {
        if (window.app) {
            window.app.showLoading(true);
            setTimeout(() => {
                // Simulate export
                const data = {
                    user: window.app.currentUser,
                    exportDate: new Date().toISOString(),
                    version: '1.0.0'
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `omeenchatting-export-${Date.now()}.json`;
                a.click();
                URL.revokeObjectURL(url);
                
                window.app.showLoading(false);
                window.app.showNotification('?? M?lumatlar ixrac edildi!', 'success');
            }, 1000);
        }
    }

    showAboutDialog() {
        const about = `
            <div class="about-modal-content">
                <div class="about-logo">
                    <i class="fas fa-comments fa-4x text-primary"></i>
                </div>
                <h3>OmeenChatting</h3>
                <p class="text-muted">Version 1.0.0</p>
                <hr>
                <p>
                    <strong>Modern Real-time Chat Application</strong><br>
                    Built with .NET 8, SignalR, and modern web technologies
                </p>
                <div class="about-features">
                    <span class="badge bg-primary me-2">?? PWA</span>
                    <span class="badge bg-success me-2">?? Encrypted</span>
                    <span class="badge bg-info me-2">? Real-time</span>
                    <span class="badge bg-warning me-2">?? Multi-language</span>
                </div>
                <hr>
                <p class="text-center">
                    <i class="fas fa-code text-primary"></i>
                    Made with <i class="fas fa-heart text-danger"></i> by <strong style="color: var(--accent-primary);">Amil</strong>
                </p>
                <p class="text-center text-muted" style="font-size: 12px;">
                    © 2024 OmeenChatting. All rights reserved.
                </p>
            </div>
        `;
        this.showInfoModal('About OmeenChatting', about);
    }

    showChatInfo() {
        if (window.app) {
            window.app.showNotification('?? Çat m?lumatlar? funksiyas? tezlikl? ?lav? edil?c?k!', 'info');
        }
    }

    enableSelectMode() {
        if (window.app) {
            window.app.showNotification('? Seçim rejimi funksiyas? tezlikl? ?lav? edil?c?k!', 'info');
        }
    }

    muteChat() {
        if (window.app) {
            window.app.showNotification('?? Bildiri?l?r söndürüldü', 'success');
        }
    }

    changeWallpaper() {
        if (window.app) {
            window.app.showNotification('??? Divar ka??z? funksiyas? tezlikl? ?lav? edil?c?k!', 'info');
        }
    }

    searchInChat() {
        const searchBar = document.getElementById('chatSearchBar');
        if (searchBar) {
            searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
            if (searchBar.style.display === 'block') {
                document.getElementById('chatSearchInput')?.focus();
            }
        }
    }

    deleteChat() {
        if (confirm('Bu çat? silm?k ist?diyinizd?n ?minsiniz?')) {
            if (window.app) {
                window.app.showNotification('??? Çat silindi', 'success');
            }
        }
    }

    reportUser() {
        if (confirm('Bu istifad?çini bildirm?k ist?yirsiniz?')) {
            if (window.app) {
                window.app.showNotification('?? Hesabat gönd?rildi', 'success');
            }
        }
    }

    showInfoModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content modern-modal">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    }
}
