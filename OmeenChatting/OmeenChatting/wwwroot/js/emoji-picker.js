// Advanced Emoji Picker for OmeenChatting
class EmojiPicker {
    constructor() {
        this.isOpen = false;
        this.currentCategory = 'recent';
        this.searchTerm = '';
        this.picker = null;
        this.targetInput = null;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing Emoji Picker...');
        this.createPicker();
        this.bindEvents();
        console.log('Emoji Picker initialized');
    }

    createPicker() {
        const picker = document.getElementById('emojiPicker');
        if (!picker) {
            console.warn('Emoji picker element not found');
            return;
        }
        
        this.picker = picker;
        this.renderCategories();
        this.renderEmojis(this.currentCategory);
    }

    renderCategories() {
        const categories = this.picker.querySelector('.emoji-categories');
        if (!categories) return;

        const categoryNames = {
            recent: '??',
            people: '??',
            nature: '??',
            food: '??',
            activity: '?',
            travel: '??',
            objects: '??',
            symbols: '??',
            flags: '??'
        };

        categories.innerHTML = '';
        Object.entries(categoryNames).forEach(([key, icon]) => {
            const btn = document.createElement('button');
            btn.className = `emoji-cat-btn ${key === this.currentCategory ? 'active' : ''}`;
            btn.dataset.category = key;
            btn.textContent = icon;
            btn.title = this.getCategoryName(key);
            categories.appendChild(btn);
        });
    }

    getCategoryName(category) {
        const names = {
            recent: 'Son ?stifad? Edil?nl?r',
            people: '?nsanlar',
            nature: 'T?bi?t',
            food: 'Yem?k',
            activity: 'F?aliyy?t',
            travel: 'S?yah?t',
            objects: 'Obyektl?r',
            symbols: 'Simvollar',
            flags: 'Bayraqlar'
        };
        return names[category] || category;
    }

    renderEmojis(category) {
        const grid = this.picker.querySelector('.emoji-grid');
        if (!grid) return;

        const emojis = window.emojiData[category] || [];
        grid.innerHTML = '';

        if (emojis.length === 0 && category === 'recent') {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: var(--text-secondary);">
                    <div style="font-size: 32px; margin-bottom: 8px;">??</div>
                    <div style="font-size: 12px;">Son istifad? edil?n emoji yoxdur</div>
                </div>
            `;
            return;
        }

        emojis.forEach(emoji => {
            const item = document.createElement('button');
            item.className = 'emoji-item';
            item.textContent = emoji;
            item.title = emoji;
            item.dataset.emoji = emoji;
            grid.appendChild(item);
        });
    }

    bindEvents() {
        // Category buttons
        this.picker.addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji-cat-btn')) {
                this.switchCategory(e.target.dataset.category);
            } else if (e.target.classList.contains('emoji-item')) {
                this.selectEmoji(e.target.dataset.emoji);
            }
        });

        // Close picker when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.picker.contains(e.target) && !e.target.closest('#emojiBtn')) {
                this.close();
            }
        });
    }

    switchCategory(category) {
        this.currentCategory = category;
        
        // Update active button
        this.picker.querySelectorAll('.emoji-cat-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        // Render emojis for the category
        this.renderEmojis(category);
    }

    selectEmoji(emoji) {
        if (this.targetInput) {
            const start = this.targetInput.selectionStart;
            const end = this.targetInput.selectionEnd;
            const text = this.targetInput.value;
            
            this.targetInput.value = text.substring(0, start) + emoji + text.substring(end);
            this.targetInput.selectionStart = this.targetInput.selectionEnd = start + emoji.length;
            this.targetInput.focus();

            // Trigger input event for auto-resize
            this.targetInput.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // Add to recent emojis
        window.addRecentEmoji(emoji);
        
        // Update recent category if it's currently selected
        if (this.currentCategory === 'recent') {
            this.renderEmojis('recent');
        }

        // Keep picker open for multiple selections
        // Uncomment the line below to close after selection
        // this.close();
    }

    open(inputElement) {
        this.targetInput = inputElement;
        this.picker.style.display = 'flex';
        this.isOpen = true;

        // Position picker
        this.positionPicker();

        // Animate in
        requestAnimationFrame(() => {
            this.picker.style.opacity = '1';
            this.picker.style.transform = 'translateY(0) scale(1)';
        });
    }

    close() {
        this.picker.style.opacity = '0';
        this.picker.style.transform = 'translateY(10px) scale(0.95)';
        
        setTimeout(() => {
            this.picker.style.display = 'none';
            this.isOpen = false;
        }, 200);
    }

    toggle(inputElement) {
        if (this.isOpen) {
            this.close();
        } else {
            this.open(inputElement);
        }
    }

    positionPicker() {
        const picker = this.picker;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Center on mobile
            picker.style.position = 'fixed';
            picker.style.bottom = '80px';
            picker.style.left = '50%';
            picker.style.transform = 'translateX(-50%) translateY(10px) scale(0.95)';
            picker.style.right = 'auto';
        } else {
            // Position relative to input on desktop
            picker.style.position = 'absolute';
            picker.style.bottom = '70px';
            picker.style.right = '80px';
            picker.style.left = 'auto';
            picker.style.transform = 'translateY(10px) scale(0.95)';
        }

        picker.style.opacity = '0';
        picker.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    }

    search(term) {
        // Future implementation for emoji search
        this.searchTerm = term.toLowerCase();
        // Filter emojis based on search term
    }
}

// Initialize emoji picker
window.emojiPicker = null;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmojiPicker);
} else {
    initEmojiPicker();
}

function initEmojiPicker() {
    console.log('Creating Emoji Picker instance...');
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        window.emojiPicker = new EmojiPicker();
    }, 100);
}
