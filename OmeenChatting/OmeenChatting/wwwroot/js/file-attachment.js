// File Attachment Handler for OmeenChatting
class FileAttachmentHandler {
    constructor() {
        this.maxFileSize = 50 * 1024 * 1024; // 50MB
        this.maxFiles = 10;
        this.selectedFiles = [];
        
        this.attachBtn = null;
        this.attachmentMenu = null;
        this.previewContainer = null;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing File Attachment Handler...');
        this.attachBtn = document.getElementById('attachBtn');
        this.attachmentMenu = document.getElementById('attachmentMenu');
        
        if (!this.attachBtn) {
            console.warn('Attach button not found');
            return;
        }
        
        this.createPreviewContainer();
        this.bindEvents();
        this.setupDragAndDrop();
        console.log('File Attachment Handler initialized');
    }

    createPreviewContainer() {
        const container = document.querySelector('.message-input-container');
        if (!container) return;

        const preview = document.createElement('div');
        preview.id = 'filePreviewContainer';
        preview.className = 'file-preview-container';
        preview.style.display = 'none';
        preview.innerHTML = `
            <div class="file-preview-header">
                <span class="file-preview-title">Seçilmi? fayllar</span>
                <button type="button" class="file-preview-close" id="closeFilePreview">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="file-preview-list" id="filePreviewList"></div>
            <div class="file-preview-actions">
                <button type="button" class="btn btn-secondary" id="cancelFiles">L??v et</button>
                <button type="button" class="btn btn-primary" id="sendFiles">
                    <i class="fas fa-paper-plane me-2"></i>
                    Gönd?r
                </button>
            </div>
        `;

        container.insertBefore(preview, container.firstChild);
        this.previewContainer = preview;
    }

    bindEvents() {
        // Attach button
        if (this.attachBtn) {
            this.attachBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleAttachmentMenu();
            });
        }

        // File input buttons
        document.getElementById('attachImageBtn')?.addEventListener('click', () => {
            document.getElementById('imageInput').click();
            this.hideAttachmentMenu();
        });

        document.getElementById('attachDocumentBtn')?.addEventListener('click', () => {
            document.getElementById('documentInput').click();
            this.hideAttachmentMenu();
        });

        document.getElementById('attachVideoBtn')?.addEventListener('click', () => {
            document.getElementById('videoInput').click();
            this.hideAttachmentMenu();
        });

        document.getElementById('attachAudioBtn')?.addEventListener('click', () => {
            document.getElementById('audioInput').click();
            this.hideAttachmentMenu();
        });

        // File inputs
        document.getElementById('imageInput')?.addEventListener('change', (e) => this.handleFileSelect(e));
        document.getElementById('documentInput')?.addEventListener('change', (e) => this.handleFileSelect(e));
        document.getElementById('videoInput')?.addEventListener('change', (e) => this.handleFileSelect(e));
        document.getElementById('audioInput')?.addEventListener('change', (e) => this.handleFileSelect(e));

        // Preview actions
        document.getElementById('closeFilePreview')?.addEventListener('click', () => this.hidePreview());
        document.getElementById('cancelFiles')?.addEventListener('click', () => this.clearFiles());
        document.getElementById('sendFiles')?.addEventListener('click', () => this.sendFiles());

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.attachmentMenu?.style.display === 'grid' && 
                !this.attachBtn?.contains(e.target) && 
                !this.attachmentMenu?.contains(e.target)) {
                this.hideAttachmentMenu();
            }
        });
    }

    toggleAttachmentMenu() {
        if (this.attachmentMenu) {
            const isVisible = this.attachmentMenu.style.display === 'grid';
            this.attachmentMenu.style.display = isVisible ? 'none' : 'grid';
            
            if (!isVisible) {
                this.attachmentMenu.style.animation = 'fadeIn 0.2s ease';
            }
        }
    }

    hideAttachmentMenu() {
        if (this.attachmentMenu) {
            this.attachmentMenu.style.display = 'none';
        }
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        
        if (files.length === 0) return;

        // Check file count
        if (this.selectedFiles.length + files.length > this.maxFiles) {
            if (window.app) {
                window.app.showNotification(`Maksimum ${this.maxFiles} fayl seç? bil?rsiniz`, 'error');
            }
            return;
        }

        // Validate and add files
        for (const file of files) {
            if (file.size > this.maxFileSize) {
                if (window.app) {
                    window.app.showNotification(`${file.name} çox böyükdür (maks. 50MB)`, 'error');
                }
                continue;
            }

            this.selectedFiles.push(file);
        }

        if (this.selectedFiles.length > 0) {
            this.showPreview();
        }

        // Reset file input
        e.target.value = '';
    }

    showPreview() {
        if (!this.previewContainer) return;

        const list = document.getElementById('filePreviewList');
        if (!list) return;

        list.innerHTML = '';

        this.selectedFiles.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'file-preview-item';
            
            const fileType = this.getFileType(file);
            const fileIcon = this.getFileIcon(fileType);
            const fileSize = this.formatFileSize(file.size);

            item.innerHTML = `
                <div class="file-preview-icon ${fileType}">
                    ${this.isImage(file) ? 
                        `<img src="${URL.createObjectURL(file)}" alt="${file.name}">` : 
                        `<i class="${fileIcon}"></i>`
                    }
                </div>
                <div class="file-preview-info">
                    <div class="file-preview-name">${this.escapeHtml(file.name)}</div>
                    <div class="file-preview-size">${fileSize}</div>
                </div>
                <button type="button" class="file-preview-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;

            // Remove button
            item.querySelector('.file-preview-remove').addEventListener('click', () => {
                this.removeFile(index);
            });

            list.appendChild(item);
        });

        this.previewContainer.style.display = 'flex';
        this.previewContainer.style.animation = 'slideUp 0.3s ease';
    }

    hidePreview() {
        if (this.previewContainer) {
            this.previewContainer.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                this.previewContainer.style.display = 'none';
            }, 300);
        }
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        
        if (this.selectedFiles.length === 0) {
            this.hidePreview();
        } else {
            this.showPreview();
        }
    }

    clearFiles() {
        this.selectedFiles = [];
        this.hidePreview();
    }

    async sendFiles() {
        if (this.selectedFiles.length === 0) return;

        if (window.app) {
            window.app.showLoading(true);
        }

        try {
            // Here you would upload files to your server
            // For now, we just show a notification
            console.log('Sending files:', this.selectedFiles);

            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (window.app) {
                window.app.showNotification('Fayl yükl?m? tezlikl? ?lav? edil?c?k!', 'info');
            }

            this.clearFiles();

        } catch (error) {
            console.error('Error sending files:', error);
            if (window.app) {
                window.app.showNotification('Fayl gönd?rm? u?ursuz oldu', 'error');
            }
        } finally {
            if (window.app) {
                window.app.showLoading(false);
            }
        }
    }

    setupDragAndDrop() {
        const dropZone = document.getElementById('messagesArea');
        if (!dropZone) return;

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // Highlight drop zone when dragging over
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-over');
            });
        });

        // Handle dropped files
        dropZone.addEventListener('drop', (e) => {
            const files = Array.from(e.dataTransfer.files);
            
            if (files.length > 0) {
                // Create a fake event for handleFileSelect
                const fakeEvent = {
                    target: {
                        files: files,
                        value: ''
                    }
                };
                this.handleFileSelect(fakeEvent);
            }
        });
    }

    getFileType(file) {
        const type = file.type.split('/')[0];
        if (type === 'image') return 'image';
        if (type === 'video') return 'video';
        if (type === 'audio') return 'audio';
        return 'document';
    }

    getFileIcon(type) {
        const icons = {
            image: 'fas fa-image',
            video: 'fas fa-video',
            audio: 'fas fa-music',
            document: 'fas fa-file'
        };
        return icons[type] || 'fas fa-file';
    }

    isImage(file) {
        return file.type.startsWith('image/');
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize file attachment handler
window.fileAttachmentHandler = null;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFileHandler);
} else {
    initFileHandler();
}

function initFileHandler() {
    console.log('Creating File Attachment Handler instance...');
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        window.fileAttachmentHandler = new FileAttachmentHandler();
    }, 100);
}
