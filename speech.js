// Speech Recognition Module
class SpeechManager {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.onResultCallback = null;
        this.onStatusCallback = null;
        this.initSpeech();
    }

    initSpeech() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.error('Speech recognition not supported');
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
            const transcript = event.results[0][0].transcript;
            if (this.onResultCallback) {
                this.onResultCallback(transcript);
            }
        };

        this.recognition.onerror = (event) => {
            this.isListening = false;
            if (this.onStatusCallback) {
                this.onStatusCallback('❌ Error: ' + event.error, false);
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            if (this.onStatusCallback) {
                this.onStatusCallback('🔴 Ready', false);
            }
        };

        return true;
    }

    startListening() {
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
            if (e.message.includes('already started')) {
                this.recognition.stop();
                setTimeout(() => this.recognition.start(), 300);
                return true;
            }
            console.error('Cannot start microphone:', e);
            return false;
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            return true;
        }
        return false;
    }

    setCallbacks(onResult, onStatus) {
        this.onResultCallback = onResult;
        this.onStatusCallback = onStatus;
    }

    isSupported() {
        return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    }
}

// Global export
if (typeof window !== 'undefined') {
    window.SpeechManager = SpeechManager;
}
