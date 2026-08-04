function SpeechManager() {
    this.recognition = null;
    this.isListening = false;
    this.onResultCallback = null;
    this.onStatusCallback = null;
    this.supported = false;
    this.initSpeech();
}

SpeechManager.prototype.initSpeech = function() {
    try {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Speech recognition not supported');
            this.supported = false;
            return false;
        }
        var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SR();
        this.recognition.lang = 'vi-VN';
        this.recognition.continuous = true; // CHỈNH SỬA: Cho phép ghi âm liên tục
        this.recognition.interimResults = true; // CHỈNH SỬA: Hiển thị kết quả tạm thời
        this.recognition.maxAlternatives = 1;

        var self = this;
        this.recognition.onstart = function() {
            self.isListening = true;
            if (self.onStatusCallback) {
                self.onStatusCallback('🎤 Đang lắng nghe...', true);
            }
        };

        this.recognition.onresult = function(event) {
            try {
                var finalTranscript = '';
                var interimTranscript = '';
                
                // Lấy tất cả kết quả
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    var transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }
                
                // Chỉ xử lý khi có kết quả cuối cùng (đã nói xong)
                if (finalTranscript !== '') {
                    if (self.onResultCallback) {
                        self.onResultCallback(finalTranscript);
                    }
                }
            } catch (e) {
                console.error('Error processing speech result:', e);
            }
        };

        this.recognition.onerror = function(event) {
            self.isListening = false;
            if (self.onStatusCallback) {
                self.onStatusCallback('❌ Lỗi: ' + event.error, false);
            }
            if (event.error === 'not-allowed') {
                console.warn('Microphone permission denied');
            } else if (event.error === 'no-speech') {
                console.warn('No speech detected');
            }
        };

        this.recognition.onend = function() {
            self.isListening = false;
            if (self.onStatusCallback) {
                self.onStatusCallback('🔴 Sẵn sàng', false);
            }
            // Nếu vẫn đang lắng nghe, tự động khởi động lại
            // (để tránh trường hợp dừng đột ngột)
        };

        this.supported = true;
        return true;
    } catch (e) {
        console.error('Failed to initialize speech recognition:', e);
        this.supported = false;
        return false;
    }
};

SpeechManager.prototype.startListening = function() {
    if (!this.supported) {
        console.warn('Speech recognition not supported');
        return false;
    }
    if (!this.recognition) {
        if (!this.initSpeech()) {
            return false;
        }
    }
    if (this.isListening) {
        this.stopListening();
        return true;
    }
    try {
        this.recognition.start();
        return true;
    } catch (e) {
        if (e.message && e.message.includes('already started')) {
            this.recognition.stop();
            var self = this;
            setTimeout(function() {
                try {
                    self.recognition.start();
                } catch (err) {
                    console.error('Cannot restart recognition:', err);
                }
            }, 300);
            return true;
        }
        console.error('Cannot start microphone:', e);
        return false;
    }
};

SpeechManager.prototype.stopListening = function() {
    if (this.recognition && this.isListening) {
        try {
            this.recognition.stop();
            this.isListening = false;
            return true;
        } catch (e) {
            console.error('Error stopping recognition:', e);
            return false;
        }
    }
    return false;
};

SpeechManager.prototype.setCallbacks = function(onResult, onStatus) {
    this.onResultCallback = onResult;
    this.onStatusCallback = onStatus;
};

SpeechManager.prototype.isSupported = function() {
    return this.supported;
};

// ============================================
// TEXT-TO-SPEECH (Nói bằng tiếng Việt - Tự nhiên hơn)
// ============================================
function speakVietnamese(text, callback) {
    if (!('speechSynthesis' in window)) {
        console.warn('Text-to-Speech not supported');
        if (callback) callback();
        return;
    }
    
    // Hủy bất kỳ giọng nói nào đang phát
    window.speechSynthesis.cancel();
    
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.85; // CHỈNH SỬA: Tốc độ chậm hơn, tự nhiên hơn
    utterance.pitch = 1.0; // CHỈNH SỬA: Cao độ tự nhiên
    utterance.volume = 1.0; // CHỈNH SỬA: Âm lượng tối đa
    
    // Tìm giọng nói tiếng Việt tốt nhất
    var voices = window.speechSynthesis.getVoices();
    
    // Ưu tiên giọng nữ tiếng Việt (thường tự nhiên hơn)
    var preferredVoices = voices.filter(function(voice) {
        return voice.lang && voice.lang.startsWith('vi');
    });
    
    // Chọn giọng nói đầu tiên có sẵn
    if (preferredVoices.length > 0) {
        // Ưu tiên giọng nữ nếu có
        var femaleVoice = preferredVoices.find(function(voice) {
            return voice.name && (voice.name.toLowerCase().includes('nữ') || 
                                  voice.name.toLowerCase().includes('female') ||
                                  voice.name.toLowerCase().includes('linh'));
        });
        utterance.voice = femaleVoice || preferredVoices[0];
    }
    
    if (callback) {
        utterance.onend = callback;
    }
    
    utterance.onerror = function(event) {
        console.error('Speech synthesis error:', event);
        if (callback) callback();
    };
    
    window.speechSynthesis.speak(utterance);
}

// Preload voices
if ('speechSynthesis' in window) {
    // Đợi voices tải xong
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = function() {
            window.speechSynthesis.getVoices();
        };
    }
}
