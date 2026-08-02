// Speech Recognition Module
class SpeechManager {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.onResultCallback = null;
        this.onStatusCallback = null;
        this.supported = false;
        this.initSpeech();
    }

    initSpeech() {
        try {
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                console.warn('Speech recognition not supported');
                this.supported = false;
                return false;
            }
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SR();
            this.recognition.lang = 'vi-VN';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 1;

            this.recognition.onstart = () => {
                this.isListening = true;
                if (this.onStatusCallback) {
                    this.onStatusCallback('🎤 Listening...', true);
                }
            };

            this.recognition.onresult = (event) => {
                try {
                    const transcript = event.results[0][0].transcript;
                    if (this.onResultCallback) {
                        this.onResultCallback(transcript);
                    }
                } catch (e) {
                    console.error('Error processing speech result:', e);
                }
            };

            this.recognition.onerror = (event) => {
                this.isListening = false;
                if (this.onStatusCallback) {
                    this.onStatusCallback('❌ Error: ' + event.error, false);
                }
                if (event.error === 'not-allowed') {
                    console.warn('Microphone permission denied');
                } else if (event.error === 'no-speech') {
                    console.warn('No speech detected');
                }
            };

            this.recognition.onend = () => {
                this.isListening = false;
                if (this.onStatusCallback) {
                    this.onStatusCallback('🔴 Ready', false);
                }
            };

            this.supported = true;
            return true;
        } catch (e) {
            console.error('Failed to initialize speech recognition:', e);
            this.supported = false;
            return false;
        }
    }

    startListening() {
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
                setTimeout(() => {
                    try {
                        this.recognition.start();
                    } catch (err) {
                        console.error('Cannot restart recognition:', err);
                    }
                }, 300);
                return true;
            }
            console.error('Cannot start microphone:', e);
            return false;
        }
    }

    stopListening() {
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
    }

    setCallbacks(onResult, onStatus) {
        this.onResultCallback = onResult;
        this.onStatusCallback = onStatus;
    }

    isSupported() {
        return this.supported;
    }
}

// Global export
if (typeof window !== 'undefined') {
    window.SpeechManager = SpeechManager;
}
