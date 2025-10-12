// Internationalization (i18n) support
const translations = {
    en: {
        // Basic translations
        welcome_message: "Connect with friends and family instantly",
        phone_number: "Phone Number",
        password: "Password",
        login: "Login",
        no_account: "Don't have an account?",
        register_here: "Register here",
        full_name: "Full Name",
        register: "Register",
        have_account: "Already have an account?",
        login_here: "Login here",
        chats: "Chats",
        search_users: "Search Users",
        logout: "Logout",
        search_chats: "Search or start new chat",
        select_chat: "Select a chat to start messaging",
        typing: "typing...",
        type_message: "Type a message",
        search_by_name_phone: "Search by name or phone...",
        online: "online",
        offline: "offline",
        last_seen: "last seen",
        new_chat: "New Chat",
        start_chat: "Start Chat",
        profile: "Profile",
        status: "Status",
        save_changes: "Save Changes",
        loading: "Loading...",
        welcome_title: "OmeenChatting Web",
        welcome_text: "Send and receive messages instantly.\nUse OmeenChatting on your computer to stay connected.",
        end_to_end: "End-to-end encrypted",
        multi_language: "Multi-language support",
        chat_info: "Chat Info",
        clear_chat: "Clear Chat",
        voice_call: "Voice Call",
        video_call: "Video Call",
        attach_file: "Attach File",
        send_emoji: "Send Emoji",
        voice_message: "Voice Message",
        
        // Advanced features
        settings: "Settings",
        notifications: "Notifications",
        privacy: "Privacy",
        security: "Security",
        theme: "Theme",
        light_mode: "Light Mode",
        dark_mode: "Dark Mode",
        auto_mode: "Auto Mode",
        font_size: "Font Size",
        small: "Small",
        medium: "Medium",
        large: "Large",
        xlarge: "Extra Large",
        
        // Group chat features
        create_group: "Create Group",
        group_name: "Group Name",
        group_description: "Group Description",
        add_members: "Add Members",
        remove_member: "Remove Member",
        make_admin: "Make Admin",
        group_settings: "Group Settings",
        leave_group: "Leave Group",
        delete_group: "Delete Group",
        group_created: "Group created successfully",
        member_added: "Member added to group",
        member_removed: "Member removed from group",
        
        // File sharing
        send_image: "Send Image",
        send_document: "Send Document",
        send_video: "Send Video",
        send_audio: "Send Audio",
        file_too_large: "File is too large",
        unsupported_file: "Unsupported file type",
        upload_failed: "Upload failed",
        downloading: "Downloading...",
        
        // Message features
        reply_to_message: "Reply to message",
        forward_message: "Forward message",
        delete_message: "Delete message",
        edit_message: "Edit message",
        copy_message: "Copy message",
        pin_message: "Pin message",
        unpin_message: "Unpin message",
        star_message: "Star message",
        unstar_message: "Unstar message",
        message_deleted: "Message deleted",
        message_edited: "Message edited",
        
        // Search and filter
        search_in_chat: "Search in chat",
        search_messages: "Search messages",
        filter_media: "Media",
        filter_documents: "Documents",
        filter_links: "Links",
        no_results: "No results found",
        
        // Status and presence
        set_status: "Set Status",
        available: "Available",
        busy: "Busy",
        away: "Away",
        do_not_disturb: "Do Not Disturb",
        invisible: "Invisible",
        custom_status: "Custom Status",
        
        // Backup and sync
        backup_chats: "Backup Chats",
        restore_chats: "Restore Chats",
        sync_contacts: "Sync Contacts",
        export_chat: "Export Chat",
        
        // Notifications and sounds
        sound_notifications: "Sound Notifications",
        desktop_notifications: "Desktop Notifications",
        notification_sound: "Notification Sound",
        vibrate: "Vibrate",
        
        // Privacy and security
        block_user: "Block User",
        unblock_user: "Unblock User",
        report_user: "Report User",
        read_receipts: "Read Receipts",
        last_seen_privacy: "Last Seen Privacy",
        profile_photo_privacy: "Profile Photo Privacy",
        everyone: "Everyone",
        contacts_only: "My Contacts",
        nobody: "Nobody",
        
        // Keyboard shortcuts
        keyboard_shortcuts: "Keyboard Shortcuts",
        send_message_shortcut: "Send Message: Enter",
        new_line_shortcut: "New Line: Shift + Enter",
        search_shortcut: "Search: Ctrl + F",
        
        // Time and date
        today: "Today",
        yesterday: "Yesterday",
        just_now: "just now",
        minutes_ago: "minutes ago",
        hours_ago: "hours ago",
        days_ago: "days ago",
        weeks_ago: "weeks ago",
        
        // Error messages
        connection_lost: "Connection lost",
        reconnecting: "Reconnecting...",
        message_failed: "Message failed to send",
        retry: "Retry",
        network_error: "Network error",
        server_error: "Server error",
        
        // Confirmations
        confirm_delete: "Are you sure you want to delete?",
        confirm_leave_group: "Are you sure you want to leave this group?",
        confirm_block_user: "Are you sure you want to block this user?",
        yes: "Yes",
        no: "No",
        cancel: "Cancel",
        
        // Media viewer
        view_image: "View Image",
        download_image: "Download Image",
        share_image: "Share Image",
        
        // Call features
        incoming_call: "Incoming call",
        outgoing_call: "Outgoing call",
        call_ended: "Call ended",
        call_duration: "Call duration",
        missed_call: "Missed call",
        
        // Draft messages
        draft: "Draft",
        
        // Contact management
        add_contact: "Add Contact",
        contact_added: "Contact added",
        invite_friend: "Invite Friend",
        
        // App info
        about: "About",
        version: "Version",
        help: "Help",
        feedback: "Feedback",
        privacy_policy: "Privacy Policy",
        terms_of_service: "Terms of Service"
    },
    az: {
        // Basic translations
        welcome_message: "Dostlar və ailə ilə dərhal əlaqə saxlayın",
        phone_number: "Telefon Nömrəsi",
        password: "Şifrə",
        login: "Daxil ol",
        no_account: "Hesabınız yoxdur?",
        register_here: "Burada qeydiyyatdan keçin",
        full_name: "Ad Soyad",
        register: "Qeydiyyat",
        have_account: "Hesabınız var?",
        login_here: "Burada daxil olun",
        chats: "Söhbətlər",
        search_users: "İstifadəçi Axtar",
        logout: "Çıxış",
        search_chats: "Axtar və ya yeni söhbət başlat",
        select_chat: "Mesajlaşmağa başlamaq üçün söhbət seçin",
        typing: "yazır...",
        type_message: "Mesaj yazın",
        search_by_name_phone: "Ad və ya telefona görə axtar...",
        online: "onlayn",
        offline: "oflayn",
        last_seen: "son görünmə",
        new_chat: "Yeni Söhbət",
        start_chat: "Söhbətə Başla",
        profile: "Profil",
        status: "Status",
        save_changes: "Dəyişiklikləri Saxla",
        loading: "Yüklənir...",
        welcome_title: "OmeenChatting Web",
        welcome_text: "Dərhal mesaj göndərin və qəbul edin.\nKompüterinizdə OmeenChatting istifadə edərək əlaqədə qalın.",
        end_to_end: "Uçtan-uca şifrələmə",
        multi_language: "Çox dilli dəstək",
        chat_info: "Söhbət Məlumatı",
        clear_chat: "Söhbəti Təmizlə",
        voice_call: "Səsli Zəng",
        video_call: "Video Zəng",
        attach_file: "Fayl Əlavə Et",
        send_emoji: "Emoji Göndər",
        voice_message: "Səsli Mesaj",
        
        // Advanced features
        settings: "Parametrlər",
        notifications: "Bildirişlər",
        privacy: "Məxfilik",
        security: "Təhlükəsizlik",
        theme: "Tema",
        light_mode: "İşıqlı Rejim",
        dark_mode: "Qaranlıq Rejim",
        auto_mode: "Avtomatik Rejim",
        font_size: "Şrift Ölçüsü",
        small: "Kiçik",
        medium: "Orta",
        large: "Böyük",
        xlarge: "Çox Böyük",
        
        // Group chat features
        create_group: "Qrup Yarat",
        group_name: "Qrup Adı",
        group_description: "Qrup Təsviri",
        add_members: "Üzvlər Əlavə Et",
        remove_member: "Üzvü Sil",
        make_admin: "Admin Et",
        group_settings: "Qrup Parametrləri",
        leave_group: "Qrupdan Çıx",
        delete_group: "Qrupu Sil",
        group_created: "Qrup uğurla yaradıldı",
        member_added: "Üzv qrupa əlavə edildi",
        member_removed: "Üzv qrupdan silindi",
        
        // File sharing
        send_image: "Şəkil Göndər",
        send_document: "Sənəd Göndər",
        send_video: "Video Göndər",
        send_audio: "Audio Göndər",
        file_too_large: "Fayl çox böyükdür",
        unsupported_file: "Dəstəklənməyən fayl növü",
        upload_failed: "Yükləmə uğursuz oldu",
        downloading: "Yüklənir...",
        
        // Message features
        reply_to_message: "Mesaja cavab ver",
        forward_message: "Mesajı ötür",
        delete_message: "Mesajı sil",
        edit_message: "Mesajı redaktə et",
        copy_message: "Mesajı kopyala",
        pin_message: "Mesajı sancaqla",
        unpin_message: "Sancağı götür",
        star_message: "Mesajı ulduzla",
        unstar_message: "Ulduzu götür",
        message_deleted: "Mesaj silindi",
        message_edited: "Mesaj redaktə olundu",
        
        // Search and filter
        search_in_chat: "Söhbətdə axtar",
        search_messages: "Mesajları axtar",
        filter_media: "Media",
        filter_documents: "Sənədlər",
        filter_links: "Linklər",
        no_results: "Nəticə tapılmadı",
        
        // Status and presence
        set_status: "Status Təyin Et",
        available: "Əlçatan",
        busy: "Məşğul",
        away: "Uzaqda",
        do_not_disturb: "Narahat Etməyin",
        invisible: "Gizli",
        custom_status: "Fərdi Status",
        
        // Backup and sync
        backup_chats: "Söhbətləri Ehtiyatla",
        restore_chats: "Söhbətləri Bərpa Et",
        sync_contacts: "Kontaktları Sinxronlaşdır",
        export_chat: "Söhbəti İxrac Et",
        
        // Notifications and sounds
        sound_notifications: "Səsli Bildirişlər",
        desktop_notifications: "Masaüstü Bildirişləri",
        notification_sound: "Bildiriş Səsi",
        vibrate: "Titrəmə",
        
        // Privacy and security
        block_user: "İstifadəçini Blokla",
        unblock_user: "Blokdan Çıxar",
        report_user: "İstifadəçini Şikayət Et",
        read_receipts: "Oxunma Qəbzləri",
        last_seen_privacy: "Son Görünmə Məxfiliyi",
        profile_photo_privacy: "Profil Şəkli Məxfiliyi",
        everyone: "Hamı",
        contacts_only: "Yalnız Kontaktlarım",
        nobody: "Heç Kim",
        
        // Keyboard shortcuts
        keyboard_shortcuts: "Klaviatura Qısayolları",
        send_message_shortcut: "Mesaj Göndər: Enter",
        new_line_shortcut: "Yeni Sətir: Shift + Enter",
        search_shortcut: "Axtar: Ctrl + F",
        
        // Time and date
        today: "Bu gün",
        yesterday: "Dünən",
        just_now: "indicə",
        minutes_ago: "dəqiqə əvvəl",
        hours_ago: "saat əvvəl",
        days_ago: "gün əvvəl",
        weeks_ago: "həftə əvvəl",
        
        // Error messages
        connection_lost: "Əlaqə itdi",
        reconnecting: "Yenidən qoşulur...",
        message_failed: "Mesaj göndərilmədi",
        retry: "Yenidən cəhd et",
        network_error: "Şəbəkə xətası",
        server_error: "Server xətası",
        
        // Confirmations
        confirm_delete: "Silmək istədiyinizə əminsiniz?",
        confirm_leave_group: "Qrupdan çıxmaq istədiyinizə əminsiniz?",
        confirm_block_user: "Bu istifadəçini bloklamaq istədiyinizə əminsiniz?",
        yes: "Bəli",
        no: "Xeyr",
        cancel: "Ləğv et",
        
        // Media viewer
        view_image: "Şəkli Göstər",
        download_image: "Şəkli Yüklə",
        share_image: "Şəkli Paylaş",
        
        // Call features
        incoming_call: "Gələn zəng",
        outgoing_call: "Gedən zəng",
        call_ended: "Zəng bitdi",
        call_duration: "Zəng müddəti",
        missed_call: "Buraxılmış zəng",
        
        // Draft messages
        draft: "Qaralama",
        
        // Contact management
        add_contact: "Kontakt Əlavə Et",
        contact_added: "Kontakt əlavə edildi",
        invite_friend: "Dostu Dəvət Et",
        
        // App info
        about: "Haqqında",
        version: "Versiya",
        help: "Kömək",
        feedback: "Rəy",
        privacy_policy: "Məxfilik Siyasəti",
        terms_of_service: "Xidmət Şərtləri"
    },
    tr: {
        // Basic translations
        welcome_message: "Arkadaşlar ve aile ile anında bağlantı kurun",
        phone_number: "Telefon Numarası",
        password: "Şifre",
        login: "Giriş Yap",
        no_account: "Hesabınız yok mu?",
        register_here: "Buradan kayıt olun",
        full_name: "Ad Soyad",
        register: "Kayıt Ol",
        have_account: "Hesabınız var mı?",
        login_here: "Buradan giriş yapın",
        chats: "Sohbetler",
        search_users: "Kullanıcı Ara",
        logout: "Çıkış",
        search_chats: "Ara veya yeni sohbet başlat",
        select_chat: "Mesajlaşmaya başlamak için bir sohbet seçin",
        typing: "yazıyor...",
        type_message: "Bir mesaj yazın",
        search_by_name_phone: "İsim veya telefon ile ara...",
        online: "çevrimiçi",
        offline: "çevrimdışı",
        last_seen: "son görülme",
        new_chat: "Yeni Sohbet",
        start_chat: "Sohbeti Başlat",
        profile: "Profil",
        status: "Durum",
        save_changes: "Değişiklikleri Kaydet",
        loading: "Yükleniyor...",
        welcome_title: "OmeenChatting Web",
        welcome_text: "Anında mesaj gönderin ve alın.\nBilgisayarınızda OmeenChatting kullanarak bağlantıda kalın.",
        end_to_end: "Uçtan uca şifreleme",
        multi_language: "Çok dil desteği",
        chat_info: "Sohbet Bilgisi",
        clear_chat: "Sohbeti Temizle",
        voice_call: "Sesli Arama",
        video_call: "Video Arama",
        attach_file: "Dosya Ekle",
        send_emoji: "Emoji Gönder",
        voice_message: "Sesli Mesaj",
        
        // Advanced features
        settings: "Ayarlar",
        notifications: "Bildirimler",
        privacy: "Gizlilik",
        security: "Güvenlik",
        theme: "Tema",
        light_mode: "Açık Mod",
        dark_mode: "Karanlık Mod",
        auto_mode: "Otomatik Mod",
        font_size: "Yazı Boyutu",
        small: "Küçük",
        medium: "Orta",
        large: "Büyük",
        xlarge: "Çok Büyük",
        
        // Group chat features
        create_group: "Grup Oluştur",
        group_name: "Grup Adı",
        group_description: "Grup Açıklaması",
        add_members: "Üye Ekle",
        remove_member: "Üyeyi Kaldır",
        make_admin: "Yönetici Yap",
        group_settings: "Grup Ayarları",
        leave_group: "Gruptan Ayrıl",
        delete_group: "Grubu Sil",
        group_created: "Grup başarıyla oluşturuldu",
        member_added: "Üye gruba eklendi",
        member_removed: "Üye gruptan kaldırıldı",
        
        // File sharing
        send_image: "Resim Gönder",
        send_document: "Belge Gönder",
        send_video: "Video Gönder",
        send_audio: "Ses Gönder",
        file_too_large: "Dosya çok büyük",
        unsupported_file: "Desteklenmeyen dosya türü",
        upload_failed: "Yükleme başarısız",
        downloading: "İndiriliyor...",
        
        // Message features
        reply_to_message: "Mesajı yanıtla",
        forward_message: "Mesajı ilet",
        delete_message: "Mesajı sil",
        edit_message: "Mesajı düzenle",
        copy_message: "Mesajı kopyala",
        pin_message: "Mesajı sabitle",
        unpin_message: "Sabitlenmesini kaldır",
        star_message: "Mesajı yıldızla",
        unstar_message: "Yıldızı kaldır",
        message_deleted: "Mesaj silindi",
        message_edited: "Mesaj düzenlendi",
        
        // Search and filter
        search_in_chat: "Sohbette ara",
        search_messages: "Mesajları ara",
        filter_media: "Medya",
        filter_documents: "Belgeler",
        filter_links: "Bağlantılar",
        no_results: "Sonuç bulunamadı",
        
        // Status and presence
        set_status: "Durum Ayarla",
        available: "Müsait",
        busy: "Meşgul",
        away: "Uzakta",
        do_not_disturb: "Rahatsız Etmeyin",
        invisible: "Görünmez",
        custom_status: "Özel Durum",
        
        // Backup and sync
        backup_chats: "Sohbetleri Yedekle",
        restore_chats: "Sohbetleri Geri Yükle",
        sync_contacts: "Kişileri Senkronize Et",
        export_chat: "Sohbeti Dışa Aktar",
        
        // Notifications and sounds
        sound_notifications: "Sesli Bildirimler",
        desktop_notifications: "Masaüstü Bildirimleri",
        notification_sound: "Bildirim Sesi",
        vibrate: "Titreşim",
        
        // Privacy and security
        block_user: "Kullanıcıyı Engelle",
        unblock_user: "Engellemesini Kaldır",
        report_user: "Kullanıcıyı Şikayet Et",
        read_receipts: "Okundu Bildirimleri",
        last_seen_privacy: "Son Görülme Gizliliği",
        profile_photo_privacy: "Profil Fotoğrafı Gizliliği",
        everyone: "Herkes",
        contacts_only: "Sadece Kişilerim",
        nobody: "Kimse",
        
        // Keyboard shortcuts
        keyboard_shortcuts: "Klavye Kısayolları",
        send_message_shortcut: "Mesaj Gönder: Enter",
        new_line_shortcut: "Yeni Satır: Shift + Enter",
        search_shortcut: "Ara: Ctrl + F",
        
        // Time and date
        today: "Bugün",
        yesterday: "Dün",
        just_now: "şimdi",
        minutes_ago: "dakika önce",
        hours_ago: "saat önce",
        days_ago: "gün önce",
        weeks_ago: "hafta önce",
        
        // Error messages
        connection_lost: "Bağlantı kesildi",
        reconnecting: "Yeniden bağlanıyor...",
        message_failed: "Mesaj gönderilemedi",
        retry: "Yeniden dene",
        network_error: "Ağ hatası",
        server_error: "Sunucu hatası",
        
        // Confirmations
        confirm_delete: "Silmek istediğinize emin misiniz?",
        confirm_leave_group: "Gruptan ayrılmak istediğinize emin misiniz?",
        confirm_block_user: "Bu kullanıcıyı engellemek istediğinize emin misiniz?",
        yes: "Evet",
        no: "Hayır",
        cancel: "İptal",
        
        // Media viewer
        view_image: "Resmi Görüntüle",
        download_image: "Resmi İndir",
        share_image: "Resmi Paylaş",
        
        // Call features
        incoming_call: "Gelen arama",
        outgoing_call: "Gedен arama",
        call_ended: "Arama sona erdi",
        call_duration: "Arama süresi",
        missed_call: "Cevapsız arama",
        
        // Draft messages
        draft: "Taslak",
        
        // Contact management
        add_contact: "Kişi Ekle",
        contact_added: "Kişi eklendi",
        invite_friend: "Arkadaş Davet Et",
        
        // App info
        about: "Hakkında",
        version: "Sürüm",
        help: "Yardım",
        feedback: "Geri Bildirim",
        privacy_policy: "Gizlilik Politikası",
        terms_of_service: "Hizmet Şartları"
    }
};

class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        // Set language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
        }
        
        // Wait for DOM to be ready before updating
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updateUI();
                this.bindEvents();
            });
        } else {
            this.updateUI();
            this.bindEvents();
        }
    }

    bindEvents() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.updateUI();
            
            // Update language selector if it exists
            const languageSelect = document.getElementById('languageSelect');
            if (languageSelect) {
                languageSelect.value = lang;
            }
            
            // Trigger custom event for language change
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
        }
    }

    get(key) {
        return translations[this.currentLanguage][key] || translations.en[key] || key;
    }

    updateUI() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.get(key);
            
            // Handle multiline text
            if (translation && translation.includes('\n')) {
                element.innerHTML = translation.replace(/\n/g, '<br>');
            } else {
                element.textContent = translation || key;
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.get(key);
        });

        // Update titles and aria-labels
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.get(key);
        });

        // Update document language
        document.documentElement.lang = this.currentLanguage;
    }

    // Format relative time (like "5 minutes ago")
    formatRelativeTime(timestamp) {
        const now = new Date();
        const date = new Date(timestamp);
        const diffInSeconds = Math.floor((now - date) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);

        if (diffInSeconds < 60) {
            return this.get('just_now');
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} ${this.get('minutes_ago')}`;
        } else if (diffInHours < 24) {
            return `${diffInHours} ${this.get('hours_ago')}`;
        } else if (diffInDays < 7) {
            return `${diffInDays} ${this.get('days_ago')}`;
        } else if (diffInWeeks < 4) {
            return `${diffInWeeks} ${this.get('weeks_ago')}`;
        } else {
            return date.toLocaleDateString(this.currentLanguage);
        }
    }

    // Format time based on current language
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: this.currentLanguage === 'en'
        };
        
        if (isToday) {
            return date.toLocaleTimeString(this.currentLanguage, timeOptions);
        } else {
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (date.toDateString() === yesterday.toDateString()) {
                return this.get('yesterday');
            } else {
                return date.toLocaleDateString(this.currentLanguage, {
                    month: 'short',
                    day: 'numeric'
                });
            }
        }
    }

    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    formatCallDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    }

    getAvailableLanguages() {
        return Object.keys(translations);
    }

    isRTL() {
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        return rtlLanguages.includes(this.currentLanguage);
    }
}

window.i18n = new I18n();