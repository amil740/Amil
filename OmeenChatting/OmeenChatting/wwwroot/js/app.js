class OmeenChatting {
    constructor() {
        this.apiUrl = '/api';
        this.connection = null;
        this.currentUser = null;
        this.currentChatId = null;
        this.currentReceiverId = null;
        this.token = localStorage.getItem('token');
        this.typingTimeout = null;
        this.isMobile = window.innerWidth <= 768;
        this.unreadCounts = new Map();
        
        this.init();
    }

    init() {
        // Check if user is already logged in
        if (this.token) {
            // Validate stored user data
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    this.currentUser = JSON.parse(storedUser);
                    console.log('User logged in:', this.currentUser);
                    this.showChatScreen();
                    this.connectSignalR();
                    this.updateUserProfile();
                } catch (error) {
                    console.error('Error parsing stored user data:', error);
                    this.logout();
                }
            } else {
                console.warn('Token exists but no user data found');
                this.logout();
            }
        } else {
            console.log('No token found, showing auth screen');
            this.showAuthScreen();
        }

        this.bindEvents();
        this.handleResize();
    }

    bindEvents() {
        // Auth form events
        document.getElementById('loginFormElement')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerFormElement')?.addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('showRegister')?.addEventListener('click', (e) => this.showRegisterForm(e));
        document.getElementById('showLogin')?.addEventListener('click', (e) => this.showLoginForm(e));

        // Password toggle events
        this.bindPasswordToggle('loginPasswordToggle', 'loginPassword');
        this.bindPasswordToggle('registerPasswordToggle', 'registerPassword');

        // Chat events
        document.getElementById('messageForm')?.addEventListener('submit', (e) => this.sendMessage(e));
        document.getElementById('searchUsers')?.addEventListener('click', () => this.showSearchModal());
        document.getElementById('newChatBtn')?.addEventListener('click', () => this.showSearchModal());
        document.getElementById('logout')?.addEventListener('click', () => this.logout());
        document.getElementById('profileSettings')?.addEventListener('click', () => this.showProfileModal());
        document.getElementById('userSearchInput')?.addEventListener('input', (e) => this.searchUsers(e.target.value));
        document.getElementById('messageText')?.addEventListener('input', () => this.handleTyping());
        document.getElementById('messageText')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage(e);
            }
        });

        // Mobile back button
        document.getElementById('mobileBackBtn')?.addEventListener('click', () => this.showSidebar());

        // Search functionality
        document.getElementById('chatSearch')?.addEventListener('input', (e) => this.filterChats(e.target.value));
        document.getElementById('searchClear')?.addEventListener('click', () => this.clearSearch());

        // Profile form
        document.getElementById('profileForm')?.addEventListener('submit', (e) => this.updateProfile(e));

        // Settings button
        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('settingsModal'));
            modal.show();
        });

        // Voice and video call buttons
        document.getElementById('voiceCallBtn')?.addEventListener('click', () => {
            this.showNotification('S?sli z?ng funksiyas? tezlikl? ?lav? edil?c?k!', 'info');
        });
        
        document.getElementById('videoCallBtn')?.addEventListener('click', () => {
            this.showNotification('Video z?ng funksiyas? tezlikl? ?lav? edil?c?k!', 'info');
        });

        // Voice recording button
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                console.log('Voice button clicked');
                if (window.voiceRecorder) {
                    window.voiceRecorder.toggleRecording();
                } else {
                    this.showNotification('S?s yaz?s? funksiyas? yükl?nir...', 'info');
                }
            });
        }

        // Attach button
        const attachBtn = document.getElementById('attachBtn');
        if (attachBtn) {
            attachBtn.addEventListener('click', (e) => {
                console.log('Attach button clicked');
                e.stopPropagation();
                const menu = document.getElementById('attachmentMenu');
                if (menu) {
                    const isVisible = menu.style.display === 'grid';
                    menu.style.display = isVisible ? 'none' : 'grid';
                }
            });
        }

        // Emoji button
        const emojiBtn = document.getElementById('emojiBtn');
        if (emojiBtn) {
            emojiBtn.addEventListener('click', (e) => {
                console.log('Emoji button clicked');
                e.stopPropagation();
                const messageInput = document.getElementById('messageText');
                if (window.emojiPicker) {
                    window.emojiPicker.toggle(messageInput);
                } else {
                    this.showNotification('Emoji seçici yükl?nir...', 'info');
                }
            });
        }

        // Welcome screen buttons
        document.getElementById('welcomeStartChat')?.addEventListener('click', () => this.showSearchModal());
        document.getElementById('welcomeCreateGroup')?.addEventListener('click', () => {
            this.showNotification('Qrup yaratma funksiyas? tezlikl? ?lav? edil?c?k!', 'info');
        });

        // Create group button
        document.getElementById('createGroupBtn')?.addEventListener('click', () => {
            this.showNotification('Qrup yaratma funksiyas? tezlikl? ?lav? edil?c?k!', 'info');
        });

        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const filter = tab.dataset.filter;
                this.filterChatsByType(filter);
                
                // Update active state
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Language change event
        document.getElementById('languageSelect')?.addEventListener('change', (e) => {
            if (window.i18n) {
                window.i18n.setLanguage(e.target.value);
            }
        });

        // Prevent form submission on Enter in search inputs
        document.getElementById('chatSearch')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });

        // Auto-resize message input
        const messageInput = document.getElementById('messageText');
        if (messageInput) {
            messageInput.addEventListener('input', () => {
                messageInput.style.height = 'auto';
                messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
            });
        }

        // Send button visibility toggle
        if (messageInput) {
            const sendBtn = document.getElementById('sendBtn');
            const voiceBtn = document.getElementById('voiceBtn');
            
            const updateButtons = () => {
                const hasText = messageInput.value.trim().length > 0;
                if (sendBtn && voiceBtn) {
                    if (hasText) {
                        sendBtn.classList.add('show');
                        voiceBtn.classList.remove('show');
                    } else {
                        sendBtn.classList.remove('show');
                        voiceBtn.classList.add('show');
                    }
                }
            };

            messageInput.addEventListener('input', updateButtons);
            // Set initial state after a small delay
            setTimeout(updateButtons, 100);
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            // Close attachment menu
            const attachMenu = document.getElementById('attachmentMenu');
            if (attachMenu && attachMenu.style.display === 'grid') {
                if (!e.target.closest('#attachBtn') && !e.target.closest('#attachmentMenu')) {
                    attachMenu.style.display = 'none';
                }
            }
        });

        console.log('All event listeners bound successfully');
    }

    bindPasswordToggle(toggleId, inputId) {
        const toggleBtn = document.getElementById(toggleId);
        const input = document.getElementById(inputId);
        
        if (toggleBtn && input) {
            toggleBtn.addEventListener('click', () => {
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                const icon = toggleBtn.querySelector('i');
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            });
        }
    }

    handleResize() {
        this.isMobile = window.innerWidth <= 768;
        
        if (this.isMobile && this.currentChatId) {
            this.hideSidebar();
        } else if (!this.isMobile) {
            this.showSidebar();
        }
    }

    showSidebar() {
        const sidebar = document.getElementById('sidebar');
        const chatMain = document.getElementById('chatMain');
        
        if (this.isMobile) {
            sidebar?.classList.add('show');
            if (chatMain) chatMain.style.display = 'none';
        } else {
            sidebar?.classList.remove('show');
            if (chatMain) chatMain.style.display = 'flex';
        }
    }

    hideSidebar() {
        const sidebar = document.getElementById('sidebar');
        const chatMain = document.getElementById('chatMain');
        
        if (this.isMobile) {
            sidebar?.classList.remove('show');
            if (chatMain) chatMain.style.display = 'flex';
        }
    }

    showNotImplemented(feature) {
        this.showNotification(`${feature} feature will be implemented soon!`, 'info');
    }

    showNotification(message, type = 'success') {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : type === 'info' ? '#17a2b8' : '#28a745'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showAuthScreen() {
        document.getElementById('authScreen').style.display = 'flex';
        document.getElementById('chatScreen').style.display = 'none';
    }

    showChatScreen() {
        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('chatScreen').style.display = 'block';
        this.loadChats();
    }

    showRegisterForm(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    }

    showLoginForm(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    }

    updateUserProfile() {
        if (this.currentUser) {
            const userNameEl = document.getElementById('currentUserName');
            const userAvatarEl = document.getElementById('currentUserAvatar');
            
            if (userNameEl) {
                userNameEl.textContent = this.currentUser.name || 'User';
            }
            
            if (userAvatarEl) {
                userAvatarEl.innerHTML = `<i class="fas fa-user"></i>`;
                if (this.currentUser.name) {
                    userAvatarEl.textContent = this.currentUser.name.charAt(0).toUpperCase();
                }
            }
        }
    }

    showProfileModal() {
        if (this.currentUser) {
            document.getElementById('profileName').value = this.currentUser.name || '';
            document.getElementById('profilePhone').value = this.currentUser.phoneNumber || '';
            document.getElementById('profileStatus').value = this.currentUser.status || '';
            
            const modal = new bootstrap.Modal(document.getElementById('profileModal'));
            modal.show();
        }
    }

    async updateProfile(e) {
        e.preventDefault();
        const name = document.getElementById('profileName').value.trim();
        const status = document.getElementById('profileStatus').value.trim();

        if (!name) {
            this.showNotification('Name is required', 'error');
            return;
        }

        this.showLoading(true);

        try {
            // Here you would typically make an API call to update the profile
            // For now, we'll just update the local storage
            this.currentUser.name = name;
            this.currentUser.status = status;
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            
            this.updateUserProfile();
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
            modal.hide();
            
            this.showNotification('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            this.showNotification('Failed to update profile', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    filterChats(searchTerm) {
        const chatItems = document.querySelectorAll('.chat-item');
        const clearBtn = document.getElementById('searchClear');
        
        if (searchTerm) {
            clearBtn.style.display = 'block';
        } else {
            clearBtn.style.display = 'none';
        }
        
        chatItems.forEach(item => {
            const chatName = item.querySelector('.chat-name')?.textContent.toLowerCase() || '';
            const lastMessage = item.querySelector('.chat-last-message')?.textContent.toLowerCase() || '';
            
            if (chatName.includes(searchTerm.toLowerCase()) || lastMessage.includes(searchTerm.toLowerCase())) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    clearSearch() {
        const searchInput = document.getElementById('chatSearch');
        const clearBtn = document.getElementById('searchClear');
        
        searchInput.value = '';
        clearBtn.style.display = 'none';
        
        document.querySelectorAll('.chat-item').forEach(item => {
            item.style.display = 'flex';
        });
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = show ? 'flex' : 'none';
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const phone = document.getElementById('loginPhone').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!phone || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        this.showLoading(true);

        try {
            const response = await fetch(`${this.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber: phone, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                
                this.showChatScreen();
                this.connectSignalR();
                this.updateUserProfile();
                this.showNotification('Logged in successfully');
            } else {
                this.showNotification(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('Network error occurred', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const phone = document.getElementById('registerPhone').value.trim();
        const password = document.getElementById('registerPassword').value;

        if (!name || !phone || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        this.showLoading(true);

        try {
            const response = await fetch(`${this.apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phoneNumber: phone, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                
                this.showChatScreen();
                this.connectSignalR();
                this.updateUserProfile();
                this.showNotification('Registered successfully');
            } else {
                this.showNotification(data.message || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showNotification('Network error occurred', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async connectSignalR() {
        try {
            console.log('Connecting to SignalR with token:', this.token ? 'Present' : 'Missing');
            
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl("/chatHub", {
                    accessTokenFactory: () => {
                        console.log('Providing access token to SignalR');
                        return this.token;
                    }
                })
                .configureLogging(signalR.LogLevel.Information)
                .build();

            await this.connection.start();
            console.log("SignalR Connected successfully");

            // Handle incoming messages
            this.connection.on("ReceiveMessage", (message) => {
                console.log('Received message:', message);
                this.displayMessage(message);
                this.updateChatListItem(message.chatId);
            });

            this.connection.on("NewMessage", (message) => {
                console.log('New message notification:', message);
                this.updateChatList();
                if (this.currentChatId === message.chatId) {
                    this.displayMessage(message);
                } else {
                    // Show notification for new message in other chat
                    if (window.notificationManager) {
                        window.notificationManager.show('Yeni mesaj', {
                            body: `${message.senderName}: ${message.content}`,
                            tag: `message-${message.id}`
                        });
                    } else {
                        this.showNotification(`New message from ${message.senderName}`);
                    }
                    this.incrementUnreadCount(message.chatId);
                }
            });

            this.connection.on("UserTyping", (data) => {
                console.log('User typing:', data);
                if (data.chatId === this.currentChatId && data.userId !== this.currentUser.id) {
                    this.showTypingIndicator();
                }
            });

            this.connection.on("UserStoppedTyping", (data) => {
                console.log('User stopped typing:', data);
                if (data.chatId === this.currentChatId) {
                    this.hideTypingIndicator();
                }
            });

        } catch (err) {
            console.error("SignalR connection error:", err);
            
            // If connection fails due to authentication, logout
            if (err.message && err.message.includes('401')) {
                console.log('Authentication error, logging out');
                this.logout();
            } else {
                this.showNotification('Connection failed. Retrying...', 'error');
                // Retry connection after 5 seconds
                setTimeout(() => this.connectSignalR(), 5000);
            }
        }
    }

    incrementUnreadCount(chatId) {
        const currentCount = this.unreadCounts.get(chatId) || 0;
        this.unreadCounts.set(chatId, currentCount + 1);
        this.updateUnreadBadge(chatId);
    }

    clearUnreadCount(chatId) {
        this.unreadCounts.delete(chatId);
        this.updateUnreadBadge(chatId);
    }

    updateUnreadBadge(chatId) {
        const chatItem = document.querySelector(`[data-chat-id="${chatId}"]`);
        if (!chatItem) return;

        let badge = chatItem.querySelector('.unread-badge');
        const count = this.unreadCounts.get(chatId) || 0;

        if (count > 0) {
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'unread-badge';
                chatItem.appendChild(badge);
            }
            badge.textContent = count > 99 ? '99+' : count;
        } else if (badge) {
            badge.remove();
        }
    }

    async loadChats() {
        try {
            const response = await fetch(`${this.apiUrl}/chat`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const chats = await response.json();
                this.displayChats(chats);
            } else if (response.status === 401) {
                this.logout();
            }
        } catch (error) {
            console.error('Error loading chats:', error);
            this.showNotification('Failed to load chats', 'error');
        }
    }

    displayChats(chats) {
        const chatList = document.getElementById('chatList');
        if (!chatList) return;
        
        chatList.innerHTML = '';

        if (chats.length === 0) {
            chatList.innerHTML = `
                <div class="no-chats">
                    <div class="no-chats-icon">
                        <i class="fas fa-comments"></i>
                    </div>
                    <p class="no-chats-text">${window.i18n.get('no_chats_yet') || 'No chats yet'}</p>
                    <button class="btn btn-primary" onclick="app.showSearchModal()">
                        ${window.i18n.get('start_chat') || 'Start Chat'}
                    </button>
                </div>
            `;
            return;
        }

        chats.forEach(chat => {
            const otherParticipant = chat.participants?.find(p => p.id !== this.currentUser.id);
            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.dataset.chatId = chat.id;
            chatItem.datasetReceiverId = otherParticipant?.id || '';

            const lastMessage = chat.lastMessage;
            const lastMessageText = lastMessage ? 
                (lastMessage.content.length > 30 ? lastMessage.content.substring(0, 30) + '...' : lastMessage.content) : 
                window.i18n.get('new_chat');

            const isOnline = otherParticipant?.isOnline;
            const statusClass = isOnline ? 'online-status' : 'offline-status';
            const userName = otherParticipant?.name || chat.name || 'Unknown';
            const userInitial = userName.charAt(0).toUpperCase();

            chatItem.innerHTML = `
                <div class="chat-avatar">
                    ${userInitial}
                    <div class="${statusClass}"></div>
                </div>
                <div class="chat-info">
                    <div class="chat-name">${this.escapeHtml(userName)}</div>
                    <div class="chat-last-message">${this.escapeHtml(lastMessageText)}</div>
                </div>
                <div class="chat-time">${lastMessage ? window.i18n.formatTime(lastMessage.sentAt) : ''}</div>
            `;

            chatItem.addEventListener('click', () => {
                this.selectChat(chat.id, otherParticipant?.id || null, userName);
                if (this.isMobile) {
                    this.hideSidebar();
                }
            });
            
            chatList.appendChild(chatItem);
            
            // Update unread badge if exists
            this.updateUnreadBadge(chat.id);
        });
    }

    updateChatListItem(chatId) {
        // Reload the specific chat item or entire chat list
        this.loadChats();
    }

    async selectChat(chatId, receiverId, chatName) {
        this.currentChatId = chatId;
        this.currentReceiverId = receiverId;

        // Clear unread count for this chat
        this.clearUnreadCount(chatId);

        // Update UI
        document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
        const selectedItem = document.querySelector(`[data-chat-id="${chatId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        document.getElementById('noChatSelected').style.display = 'none';
        document.getElementById('chatArea').style.display = 'flex';
        
        const chatTitle = document.getElementById('chatTitle');
        const chatAvatar = document.getElementById('chatAvatar');
        
        if (chatTitle) chatTitle.textContent = chatName;
        if (chatAvatar) {
            chatAvatar.textContent = chatName.charAt(0).toUpperCase();
        }

        // Join SignalR group
        if (this.connection) {
            try {
                await this.connection.invoke("JoinChat", chatId.toString());
            } catch (error) {
                console.error('Error joining chat:', error);
            }
        }

        // Load messages
        await this.loadMessages(chatId);
        
        // Focus message input
        const messageInput = document.getElementById('messageText');
        if (messageInput && !this.isMobile) {
            setTimeout(() => messageInput.focus(), 100);
        }
    }

    async loadMessages(chatId) {
        try {
            const response = await fetch(`${this.apiUrl}/chat/${chatId}/messages`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const messages = await response.json();
                this.displayMessages(messages);
            } else if (response.status === 401) {
                this.logout();
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            this.showNotification('Failed to load messages', 'error');
        }
    }

    displayMessages(messages) {
        const messagesArea = document.getElementById('messagesArea');
        if (!messagesArea) return;
        
        messagesArea.innerHTML = '';

        messages.forEach(message => {
            this.displayMessage(message);
        });

        this.scrollToBottom();
    }

    displayMessage(message) {
        const messagesArea = document.getElementById('messagesArea');
        if (!messagesArea) return;

        const messageDiv = document.createElement('div');
        const isSent = message.senderId === this.currentUser.id;
        
        messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <div class="message-content">${this.escapeHtml(message.content)}</div>
                <div class="message-time">
                    ${window.i18n.formatTime(message.sentAt)}
                    ${isSent ? '<i class="fas fa-check message-status sent"></i>' : ''}
                </div>
            </div>
        `;

        messagesArea.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        const messagesArea = document.getElementById('messagesArea');
        if (messagesArea) {
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }
    }

    async sendMessage(e) {
        e.preventDefault();
        const messageInput = document.getElementById('messageText');
        const messageText = messageInput?.value.trim();
        
        if (!messageText || !this.currentChatId || !this.connection) return;

        try {
            await this.connection.invoke("SendMessage", this.currentChatId, this.currentReceiverId, messageText);
            messageInput.value = '';
            
            // Auto-resize textarea if it's a textarea
            if (messageInput.tagName === 'TEXTAREA') {
                messageInput.style.height = 'auto';
            }
        } catch (error) {
            console.error('Error sending message:', error);
            this.showNotification('Failed to send message', 'error');
        }
    }

    handleTyping() {
        if (this.currentChatId && this.connection) {
            try {
                this.connection.invoke("UserTyping", this.currentChatId, this.currentReceiverId);
                
                // Clear typing timeout
                clearTimeout(this.typingTimeout);
                this.typingTimeout = setTimeout(() => {
                    this.connection.invoke("UserStoppedTyping", this.currentChatId);
                }, 3000);
            } catch (error) {
                console.error('Error sending typing indicator:', error);
            }
        }
    }

    showTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.style.display = 'block';
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }

    showSearchModal() {
        const modal = new bootstrap.Modal(document.getElementById('searchUsersModal'));
        modal.show();
        
        // Focus search input
        setTimeout(() => {
            const searchInput = document.getElementById('userSearchInput');
            if (searchInput) searchInput.focus();
        }, 300);
    }

    async searchUsers(searchTerm) {
        if (!searchTerm || searchTerm.length < 2) {
            document.getElementById('userSearchResults').innerHTML = '';
            return;
        }

        try {
            console.log('Searching for users with term:', searchTerm);
            
            const response = await fetch(`${this.apiUrl}/user/search?q=${encodeURIComponent(searchTerm)}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            console.log('Search response status:', response.status);

            if (response.ok) {
                const users = await response.json();
                console.log('Search results:', users);
                this.displaySearchResults(users);
            } else if (response.status === 401) {
                this.logout();
            } else {
                const errorData = await response.text();
                console.error('Search error:', errorData);
            }
        } catch (error) {
            console.error('Error searching users:', error);
        }
    }

    displaySearchResults(users) {
        const resultsContainer = document.getElementById('userSearchResults');
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = '';

        if (users.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-user-slash"></i>
                    <p>${window.i18n.get('no_users_found') || 'No users found'}</p>
                </div>
            `;
            return;
        }

        users.forEach(user => {
            if (user.id === this.currentUser.id) return; // Skip current user

            const userItem = document.createElement('div');
            userItem.className = 'user-search-item';
            userItem.innerHTML = `
                <div class="user-search-avatar">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <div class="flex-grow-1">
                    <div class="fw-bold">${this.escapeHtml(user.name)}</div>
                    <div class="text-muted small">${this.escapeHtml(user.phoneNumber)}</div>
                    ${user.status ? `<div class="text-muted smaller">${this.escapeHtml(user.status)}</div>` : ''}
                </div>
                <button class="start-chat-btn">
                    ${window.i18n.get('start_chat')}
                </button>
            `;
            
            // Add event listener to the button
            const startChatBtn = userItem.querySelector('.start-chat-btn');
            startChatBtn.addEventListener('click', () => {
                this.startChat(user.id, user.name);
            });
            
            resultsContainer.appendChild(userItem);
        });
    }

    async startChat(userId, userName) {
        try {
            console.log('Starting chat with user:', userId, userName);
            
            this.showLoading(true);
            
            const response = await fetch(`${this.apiUrl}/chat/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ userId })
            });

            console.log('Start chat response status:', response.status);
            
            if (response.ok) {
                const chat = await response.json();
                console.log('Chat created/found:', chat);
                
                // Close modal
                const modalElement = document.getElementById('searchUsersModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }

                // Reload chats and select the new one
                await this.loadChats();
                this.selectChat(chat.id, userId, userName);
                
                this.showNotification(`Chat started with ${userName}`);
                
                if (this.isMobile) {
                    this.hideSidebar();
                }
            } else if (response.status === 401) {
                this.logout();
            } else {
                const errorData = await response.text();
                console.error('Error response:', errorData);
                this.showNotification(`Failed to start chat: ${response.status}`, 'error');
            }
        } catch (error) {
            console.error('Error starting chat:', error);
            this.showNotification('Network error occurred', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('language'); // Keep language preference
        
        if (this.connection) {
            this.connection.stop();
        }
        
        this.token = null;
        this.currentUser = null;
        this.currentChatId = null;
        this.currentReceiverId = null;
        this.unreadCounts.clear();
        
        location.reload();
    }

    formatTime(timestamp) {
        return window.i18n.formatTime(timestamp);
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateChatList() {
        this.loadChats();
    }

    filterChatsByType(filter) {
        const chatItems = document.querySelectorAll('.chat-item');
        
        chatItems.forEach(item => {
            switch(filter) {
                case 'all':
                    item.style.display = 'flex';
                    break;
                case 'unread':
                    const hasUnread = item.querySelector('.unread-badge');
                    item.style.display = hasUnread ? 'flex' : 'none';
                    break;
                case 'groups':
                    // Show only group chats (you can add data attribute to identify groups)
                    item.style.display = 'none';
                    break;
                case 'starred':
                    // Show only starred chats
                    item.style.display = 'none';
                    break;
                default:
                    item.style.display = 'flex';
            }
        });
    }

    // Debug function for testing
    testStartChat() {
        console.log('Test start chat function called');
        console.log('Current user:', this.currentUser);
        console.log('Token:', this.token ? 'Present' : 'Missing');
        
        if (this.currentUser && this.token) {
            // Test with a dummy user ID
            this.startChat(999, 'Test User');
        } else {
            console.error('Not logged in or missing data');
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .no-chats {
            text-align: center;
            padding: 60px 40px;
            color: var(--text-secondary);
        }
        .no-chats-icon {
            font-size: 48px;
            margin-bottom: 20px;
            color: var(--text-tertiary);
        }
        .no-chats-text {
            margin-bottom: 20px;
            font-size: 16px;
        }
        .no-results {
            text-align: center;
            padding: 40px 20px;
            color: var(--text-secondary);
        }
        .no-results i {
            font-size: 32px;
            margin-bottom: 12px;
            color: var(--text-tertiary);
        }
        .unread-badge {
            position: absolute;
            top: 8px;
            right: 12px;
            background: var(--accent-primary);
            color: white;
            border-radius: 10px;
            padding: 2px 6px;
            font-size: 11px;
            font-weight: bold;
            min-width: 18px;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize app
    window.app = new OmeenChatting();
    
    // Add debug function to window for testing
    window.testStartChat = () => {
        if (window.app) {
            window.app.testStartChat();
        } else {
            console.error('App not initialized');
        }
    };
});