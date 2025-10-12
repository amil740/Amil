// Voice Recording for OmeenChatting
class VoiceRecorder {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isRecording = false;
        this.startTime = null;
        this.timerInterval = null;
        this.stream = null;
        
        this.voiceBtn = null;
        this.sendBtn = null;
        this.recordingUI = null;

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        console.log('Initializing Voice Recorder...');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.sendBtn = document.getElementById('sendBtn');
        
        if (!this.voiceBtn) {
            console.warn('Voice button not found');
            return;
        }

        this.createRecordingUI();
        this.bindEvents();
        console.log('Voice Recorder initialized');
    }

    createRecordingUI() {
        const container = document.querySelector('.message-input-container');
        if (!container) return;

        const recordingUI = document.createElement('div');
        recordingUI.id = 'recordingUI';
        recordingUI.className = 'recording-ui';
        recordingUI.style.display = 'none';
        recordingUI.innerHTML = `
            <div class="recording-indicator">
                <span class="recording-dot"></span>
                <span class="recording-text">S?s yaz?l?r...</span>
            </div>
            <div class="recording-timer">0:00</div>
            <div class="recording-actions">
                <button type="button" class="recording-cancel-btn" id="cancelRecording">
                    <i class="fas fa-times"></i>
                </button>
                <button type="button" class="recording-send-btn" id="sendRecording">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;

        container.appendChild(recordingUI);
        this.recordingUI = recordingUI;
    }

    bindEvents() {
        if (this.voiceBtn) {
            this.voiceBtn.addEventListener('click', () => this.toggleRecording());
        }

        const cancelBtn = document.getElementById('cancelRecording');
        const sendBtn = document.getElementById('sendRecording');

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.cancelRecording());
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendRecording());
        }
    }

    async toggleRecording() {
        if (this.isRecording) {
            await this.stopRecording();
        } else {
            await this.startRecording();
        }
    }

    async startRecording() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            this.mediaRecorder = new MediaRecorder(this.stream);
            this.audioChunks = [];

            this.mediaRecorder.addEventListener('dataavailable', (event) => {
                this.audioChunks.push(event.data);
            });

            this.mediaRecorder.addEventListener('stop', () => {
                this.handleRecordingComplete();
            });

            this.mediaRecorder.start();
            this.isRecording = true;
            this.startTime = Date.now();

            this.showRecordingUI();
            this.startTimer();

            if (window.app) {
                window.app.showNotification('S?s yaz?l??? ba?lad?', 'info');
            }

        } catch (error) {
            console.error('Error starting recording:', error);
            if (window.app) {
                window.app.showNotification('Mikrofona giri? u?ursuz oldu', 'error');
            }
        }
    }

    async stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.stopTimer();

            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
        }
    }

    cancelRecording() {
        this.stopRecording();
        this.audioChunks = [];
        this.hideRecordingUI();
        
        if (window.app) {
            window.app.showNotification('S?s yaz?l??? l??v edildi', 'info');
        }
    }

    async sendRecording() {
        await this.stopRecording();
        // The handleRecordingComplete will handle the sending
    }

    handleRecordingComplete() {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Here you would typically upload the audio to your server
        console.log('Recording complete:', audioUrl);
        
        this.hideRecordingUI();
        
        if (window.app) {
            window.app.showNotification('S?s yaz?l??? haz?rd?r', 'success');
            // In a real implementation, you would send this to your server
            // For now, we just show a notification
            window.app.showNotification('S?s mesajlar? tezlikl? ?lav? edil?c?k!', 'info');
        }
    }

    showRecordingUI() {
        if (this.recordingUI) {
            this.recordingUI.style.display = 'flex';
            
            // Hide other UI elements
            const messageForm = document.querySelector('.message-form');
            if (messageForm) {
                messageForm.style.display = 'none';
            }
        }
    }

    hideRecordingUI() {
        if (this.recordingUI) {
            this.recordingUI.style.display = 'none';
            
            // Show message form again
            const messageForm = document.querySelector('.message-form');
            if (messageForm) {
                messageForm.style.display = 'flex';
            }
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            
            const timerEl = this.recordingUI.querySelector('.recording-timer');
            if (timerEl) {
                timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }

            // Auto-stop after 5 minutes
            if (elapsed >= 300) {
                this.sendRecording();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
}

// Initialize voice recorder
window.voiceRecorder = null;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVoiceRecorder);
} else {
    initVoiceRecorder();
}

function initVoiceRecorder() {
    console.log('Creating Voice Recorder instance...');
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        window.voiceRecorder = new VoiceRecorder();
    }, 100);
}
