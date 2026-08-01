// =========================================
// AVEVA Equipment Studio
// Voice Recognition Module - Chatbox Version
// =========================================

let recognition = null;
let listening = false;
let chatContainer = null;
let interimMessage = null;

// =========================================
// Initialize Speech Recognition
// =========================================

function initSpeech() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        alert("Your browser does not support Voice Recognition.\nPlease use Google Chrome or Edge.");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.lang = APP_CONFIG?.VOICE?.LANGUAGE || "en-US";
    recognition.continuous = APP_CONFIG?.VOICE?.CONTINUOUS || true;
    recognition.interimResults = APP_CONFIG?.VOICE?.INTERIM_RESULTS || true;
    recognition.maxAlternatives = 1;

    recognition.onstart = function() {
        listening = true;
        updateVoiceStatus("🎤 Listening...");
        updateVoiceButton(true);
        addBotMessage("🎤 Listening... Please speak your dimensions.");
    };

    recognition.onend = function() {
        listening = false;
        updateVoiceStatus("Ready");
        updateVoiceButton(false);
        // Remove interim message if exists
        if (interimMessage) {
            interimMessage.remove();
            interimMessage = null;
        }
    };

    recognition.onerror = function(event) {
        console.error("Speech error:", event.error);
        
        let errorMsg = "Voice Error";
        let botMsg = "⚠️ Speech recognition error occurred.";
        
        switch(event.error) {
            case "not-allowed":
                errorMsg = "❌ Microphone access denied";
                botMsg = "❌ Please allow microphone access and try again.";
                break;
            case "no-speech":
                errorMsg = "🔇 No speech detected";
                botMsg = "🔇 I didn't hear anything. Please speak clearly.";
                break;
            case "audio-capture":
                errorMsg = "🎤 Microphone not found";
                botMsg = "🎤 Please check your microphone connection.";
                break;
            case "network":
                errorMsg = "🌐 Network error";
                botMsg = "🌐 Please check your internet connection.";
                break;
            default:
                botMsg = `⚠️ Speech recognition error: ${event.error}`;
        }
        
        updateVoiceStatus(errorMsg);
        addBotMessage(botMsg);
        
        if (listening) {
            listening = false;
            updateVoiceButton(false);
        }
    };

    recognition.onresult = function(event) {
        let finalText = "";
        let interimText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalText += transcript;
            } else {
                interimText += transcript;
            }
        }

        // Handle interim results
        if (interimText) {
            showInterimMessage(interimText);
        }

        // Handle final results
        if (finalText) {
            // Remove interim message
            if (interimMessage) {
                interimMessage.remove();
                interimMessage = null;
            }
            
            console.log("Voice:", finalText);
            updateVoiceStatus(`Heard: ${finalText}`);
            processVoiceCommand(finalText);
        }
    };

    // Initialize chat container
    chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
        // Clear existing messages and add welcome
        chatContainer.innerHTML = '';
        addBotMessage("👋 Hello! I'm your voice assistant for equipment dimensions.");
        addBotMessage("💡 Please speak your dimensions. I'll listen for Length, Width, Height, and Corner Radius.");
        addBotMessage("📝 Example: 'Length 2000, Width 1000, Height 1500, Radius 100'");
    }
}

// =========================================
// Start / Stop Voice
// =========================================

function toggleVoice() {
    if (!recognition) {
        initSpeech();
        // Wait a moment for initialization
        setTimeout(() => {
            if (recognition) toggleVoice();
        }, 100);
        return;
    }

    if (listening) {
        recognition.stop();
        addBotMessage("⏹️ Stopped listening.");
    } else {
        try {
            recognition.start();
        } catch (e) {
            console.error("Failed to start:", e);
            addBotMessage("⚠️ Failed to start listening. Please try again.");
        }
    }
}

// =========================================
// Process Voice Command
// =========================================

function processVoiceCommand(text) {
    // Add user message to chat
    addUserMessage(text);

    const lowerText = text.toLowerCase();
    const extracted = {};

    // ===============================
    // Equipment Name (EQxxx)
    // ===============================
    let eq = text.match(/eq\s*(\d+)/i);
    if (eq) {
        const eqName = `EQ${eq[1].padStart(3, '0')}`;
        document.getElementById("eqName").value = eqName;
        extracted.eqName = eqName;
    }

    // ===============================
    // Extract all numbers first
    // ===============================
    const numbers = [];
    const numMatches = text.match(/\d+(?:\.\d+)?/g);
    if (numMatches) {
        numMatches.forEach(n => numbers.push(parseFloat(n)));
    }

    // ===============================
    // Length - with keywords
    // ===============================
    let length = extractNumber(text, ["length", "dài", "dai", "long", "l"]);
    if (length) {
        document.getElementById("length").value = length;
        extracted.length = length;
    }

    // ===============================
    // Width - with keywords
    // ===============================
    let width = extractNumber(text, ["width", "rộng", "rong", "wide", "w"]);
    if (width) {
        document.getElementById("width").value = width;
        extracted.width = width;
    }

    // ===============================
    // Height - with keywords
    // ===============================
    let height = extractNumber(text, ["height", "cao", "high", "h"]);
    if (height) {
        document.getElementById("height").value = height;
        extracted.height = height;
    }

    // ===============================
    // Radius - with keywords
    // ===============================
    let radius = extractNumber(text, ["radius", "bán kính", "ban kinh", "corner", "rad", "r"]);
    if (radius) {
        document.getElementById("radius").value = radius;
        extracted.radius = radius;
    }

    // ===============================
    // Position E N U
    // ===============================
    let pos = text.match(/e\s*(\d+).*n\s*(\d+).*u\s*(\d+)/i);
    if (pos) {
        document.getElementById("posE").value = pos[1];
        document.getElementById("posN").value = pos[2];
        document.getElementById("posU").value = pos[3];
        extracted.posE = pos[1];
        extracted.posN = pos[2];
        extracted.posU = pos[3];
    }

    // ===============================
    // If no specific keywords found but we have numbers
    // ===============================
    if (Object.keys(extracted).length === 0 && numbers.length >= 3) {
        // Try to intelligently assign numbers based on context
        const hasLength = lowerText.includes("length") || lowerText.includes("dài");
        const hasWidth = lowerText.includes("width") || lowerText.includes("rộng");
        const hasHeight = lowerText.includes("height") || lowerText.includes("cao");
        const hasRadius = lowerText.includes("radius") || lowerText.includes("bán kính");

        if (!hasLength && !hasWidth && !hasHeight && !hasRadius) {
            // Just numbers without keywords - assign in order
            if (numbers.length >= 4) {
                document.getElementById("length").value = numbers[0];
                document.getElementById("width").value = numbers[1];
                document.getElementById("height").value = numbers[2];
                document.getElementById("radius").value = numbers[3];
                extracted.length = numbers[0];
                extracted.width = numbers[1];
                extracted.height = numbers[2];
                extracted.radius = numbers[3];
            } else if (numbers.length >= 3) {
                document.getElementById("length").value = numbers[0];
                document.getElementById("width").value = numbers[1];
                document.getElementById("height").value = numbers[2];
                extracted.length = numbers[0];
                extracted.width = numbers[1];
                extracted.height = numbers[2];
            }
        }
    }

    // ===============================
    // Build response message
    // ===============================
    let response = "✅ I've processed your voice input:\n\n";
    let hasExtracted = false;

    if (extracted.eqName) {
        response += `📦 Equipment: ${extracted.eqName}\n`;
        hasExtracted = true;
    }

    if (extracted.length) {
        response += `📏 Length: ${extracted.length}\n`;
        hasExtracted = true;
    }
    if (extracted.width) {
        response += `📐 Width: ${extracted.width}\n`;
        hasExtracted = true;
    }
    if (extracted.height) {
        response += `📏 Height: ${extracted.height}\n`;
        hasExtracted = true;
    }
    if (extracted.radius) {
        response += `⭕ Corner Radius: ${extracted.radius}\n`;
        hasExtracted = true;
    }

    if (extracted.posE) {
        response += `📍 Position: E=${extracted.posE}, N=${extracted.posN}, U=${extracted.posU}\n`;
        hasExtracted = true;
    }

    if (hasExtracted) {
        response += "\n✅ Dimensions have been updated!";
        // Highlight updated fields
        highlightUpdatedFields(extracted);
    } else {
        response = "❌ I couldn't find any valid dimensions in your speech.\n\n";
        response += "💡 Please try saying something like:\n";
        response += "• 'Length 2000, Width 1000, Height 1500, Radius 100'\n";
        response += "• 'Equipment EQ001, length 2000, width 1000'";
    }

    addBotMessage(response);
    
    // Auto-generate preview
    if (typeof generateTXT === 'function') {
        generateTXT();
    }
}

// =========================================
// Extract Number with Multiple Keywords
// =========================================

function extractNumber(text, keywords) {
    for (let key of keywords) {
        // Try different patterns
        const patterns = [
            new RegExp(`${key}\\s*(?:is\\s*)?(?:of\\s*)?(?:about\\s*)?(?:around\\s*)?(?:approximately\\s*)?(\\d+(?:\\.\\d+)?)`, 'i'),
            new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:mm|cm|m|inch|feet)?\\s*(?:${key})`, 'i'),
            new RegExp(`${key}\\s*(?::\\s*)?(\\d+(?:\\.\\d+)?)`, 'i')
        ];
        
        for (let pattern of patterns) {
            let result = text.match(pattern);
            if (result && result[1]) {
                return Math.round(parseFloat(result[1]));
            }
        }
    }
    return null;
}

// =========================================
// Highlight Updated Fields
// =========================================

function highlightUpdatedFields(extracted) {
    const fieldMap = {
        length: 'length',
        width: 'width',
        height: 'height',
        radius: 'radius',
        posE: 'posE',
        posN: 'posN',
        posU: 'posU'
    };

    for (const [key, elementId] of Object.entries(fieldMap)) {
        if (extracted[key]) {
            const element = document.getElementById(elementId);
            if (element) {
                element.style.borderColor = '#4CAF50';
                element.style.backgroundColor = '#E8F5E9';
                setTimeout(() => {
                    element.style.borderColor = '';
                    element.style.backgroundColor = '';
                }, 3000);
            }
        }
    }
}

// =========================================
// Chat Functions
// =========================================

function addUserMessage(text) {
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.innerHTML = `
        <i class="fa-solid fa-user"></i>
        <span>${escapeHtml(text)}</span>
    `;
    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(text) {
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';
    messageDiv.innerHTML = `
        <i class="fa-solid fa-robot"></i>
        <span>${escapeHtml(text)}</span>
    `;
    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}

function showInterimMessage(text) {
    if (!chatContainer) return;
    
    // Remove existing interim message
    if (interimMessage) {
        interimMessage.remove();
        interimMessage = null;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user interim';
    messageDiv.innerHTML = `
        <i class="fa-solid fa-user"></i>
        <span>${escapeHtml(text)} <span class="typing-indicator">...</span></span>
    `;
    chatContainer.appendChild(messageDiv);
    interimMessage = messageDiv;
    scrollToBottom();
}

function clearChat() {
    if (!chatContainer) return;
    chatContainer.innerHTML = '';
    addBotMessage("🗑️ Chat cleared. You can start speaking again!");
    addBotMessage("💡 Remember to say Length, Width, Height, and Radius.");
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
}

function scrollToBottom() {
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// =========================================
// Update UI Functions
// =========================================

function updateVoiceStatus(msg) {
    let box = document.getElementById("voiceStatus");
    if (box) {
        box.innerHTML = msg;
    }
}

function updateVoiceButton(isListening) {
    let btn = document.getElementById("voiceBtn");
    if (btn) {
        if (isListening) {
            btn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop Listening';
            btn.classList.add('listening');
        } else {
            btn.innerHTML = '<i class="fa-solid fa-microphone"></i> Start Listening';
            btn.classList.remove('listening');
        }
    }
}

// =========================================
// Initialize on DOM Ready
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize chat container reference
    chatContainer = document.getElementById("chatContainer");
    
    // Add clear chat button listener
    const clearBtn = document.getElementById("clearChatBtn");
    if (clearBtn) {
        clearBtn.addEventListener('click', clearChat);
    }
    
    // Initialize speech recognition
    setTimeout(initSpeech, 500);
});

// =========================================
// Keyboard Shortcut: Space to toggle voice
// =========================================

document.addEventListener('keydown', function(event) {
    // Toggle voice with Ctrl+Shift+V
    if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        event.preventDefault();
        toggleVoice();
    }
});
