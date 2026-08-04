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
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        var self = this;
        this.recognition.onstart = function() {
            self.isListening = true;
            if (self.onStatusCallback) {
                self.onStatusCallback('🎤 Listening...', true);
            }
        };

        this.recognition.onresult = function(event) {
            try {
                var transcript = event.results[0][0].transcript;
                if (self.onResultCallback) {
                    self.onResultCallback(transcript);
                }
            } catch (e) {
                console.error('Error processing speech result:', e);
            }
        };

        this.recognition.onerror = function(event) {
            self.isListening = false;
            if (self.onStatusCallback) {
                self.onStatusCallback('❌ Error: ' + event.error, false);
            }
        };

        this.recognition.onend = function() {
            self.isListening = false;
            if (self.onStatusCallback) {
                self.onStatusCallback('🔴 Ready', false);
            }
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
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
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
                var transcript = event.results[0][0].transcript;
                if (self.onResultCallback) {
                    self.onResultCallback(transcript);
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
// TEXT-TO-SPEECH (Nói bằng tiếng Việt)
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
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    // Tìm giọng nói tiếng Việt nếu có
    var voices = window.speechSynthesis.getVoices();
    var vietnameseVoice = voices.find(function(voice) {
        return voice.lang && voice.lang.startsWith('vi');
    });
    if (vietnameseVoice) {
        utterance.voice = vietnameseVoice;
    }
    
    if (callback) {
        utterance.onend = callback;
    }
    
    window.speechSynthesis.speak(utterance);
}

// Preload voices (cần thiết trên một số trình duyệt)
if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = function() {
        window.speechSynthesis.getVoices();
    };
}
