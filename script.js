// Main application script
(function() {
    'use strict';

    // Get DOM elements
    const getEl = (id) => document.getElementById(id);
    
    const eqName = getEl('eqName');
    const profile = getEl('profile');
    const lengthInp = getEl('length');
    const widthInp = getEl('width');
    const heightInp = getEl('height');
    const radiusInp = getEl('radius');
    const posE = getEl('posE');
    const posN = getEl('posN');
    const posU = getEl('posU');
    const orientation = getEl('orientation');
    const folderPath = getEl('folderPath');
    const chatContainer = getEl('chatContainer');
    const voiceBtn = getEl('voiceBtn');
    const clearChatBtn = getEl('clearChatBtn');
    const voiceStatus = getEl('voiceStatus');
    const generateBtn = getEl('generateBtn');
    const saveBtn = getEl('saveBtn');
    const selectFolderBtn = getEl('selectFolder');

    // Chat functions
    function appendChatMessage(text, isBot = true) {
        const div = document.createElement('div');
        div.className = 'chat-message ' + (isBot ? 'bot' : 'user');
        const icon = document.createElement('i');
        icon.className = isBot ? 'fa-solid fa-robot' : 'fa-solid fa-user';
        const span = document.createElement('span');
        span.textContent = text;
        div.appendChild(icon);
        div.appendChild(span);
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function updateVoiceStatus(text, isListeningMode = false) {
        voiceStatus.textContent = text;
        if (isListeningMode) {
            voiceBtn.classList.add('listening');
            voiceBtn.innerHTML = '<i class="fa-solid fa-circle-stop"></i> Stop Listening';
        } else {
            voiceBtn.classList.remove('listening');
            voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Start Listening';
        }
    }

    // Parse dimensions from speech
    function parseDimensionsFromText(transcript) {
        const lower = transcript.toLowerCase();
        
        // English patterns
        const engLength = lower.match(/\b(length)\s*[:]?\s*(\d+)/i);
        const engWidth = lower.match(/\b(width)\s*[:]?\s*(\d+)/i);
        const engHeight = lower.match(/\b(height)\s*[:]?\s*(\d+)/i);
        const engRadius = lower.match(/\b(radius)\s*[:]?\s*(\d+)/i);
        
        // Vietnamese patterns
        const vnLength = lower.match(/\b(chiều dài|chieu dai|dài)\s*[:]?\s*(\d+)/i);
        const vnWidth = lower.match(/\b(chiều rộng|chieu rong|rộng|ngang)\s*[:]?\s*(\d+)/i);
        const vnHeight = lower.match(/\b(chiều cao|chieu cao|cao)\s*[:]?\s*(\d+)/i);
        const vnRadius = lower.match(/\b(bán kính|ban kinh|radius)\s*[:]?\s*(\d+)/i);
        
        // Use whichever matches first
        const lengthMatch = engLength || vnLength;
        const widthMatch = engWidth || vnWidth;
        const heightMatch = engHeight || vnHeight;
        const radiusMatch = engRadius || vnRadius;
        
        const updated = {};
        if (lengthMatch) {
            lengthInp.value = lengthMatch[2];
            updated.length = lengthMatch[2];
        }
        if (widthMatch) {
            widthInp.value = widthMatch[2];
            updated.width = widthMatch[2];
        }
        if (heightMatch) {
            heightInp.value = heightMatch[2];
            updated.height = heightMatch[2];
        }
        if (radiusMatch) {
            radiusInp.value = radiusMatch[2];
            updated.radius = radiusMatch[2];
        }
        
        const parts = [];
        if (updated.length) parts.push(`Length = ${updated.length}`);
        if (updated.width) parts.push(`Width = ${updated.width}`);
        if (updated.height) parts.push(`Height = ${updated.height}`);
        if (updated.radius) parts.push(`Radius = ${updated.radius}`);
        
        if (parts.length === 0) {
            appendChatMessage('⚠️ No dimensions found. Please say: Length, Width, Height, Radius.');
        } else {
            appendChatMessage('✅ Updated: ' + parts.join(', '));
        }
    }

    // Initialize Speech Manager
    const speechManager = new SpeechManager();
    
    if (!speechManager.isSupported()) {
        appendChatMessage('❌ Browser doesn\'t support Voice Chat. Use Chrome/Edge.');
        voiceBtn.disabled = true;
        voiceBtn.style.opacity = '0.5';
    }

    // Set speech callbacks
    speechManager.setCallbacks(
        (transcript) => {
            appendChatMessage('🗣️ "' + transcript + '"', false);
            parseDimensionsFromText(transcript);
        },
        (text, isListening) => {
            updateVoiceStatus(text, isListening);
        }
    );

    // Voice button
    voiceBtn.addEventListener('click', function() {
        if (!speechManager.isSupported()) {
            return;
        }
        speechManager.startListening();
    });

    // Clear chat
    clearChatBtn.addEventListener('click', function() {
        chatContainer.innerHTML = '';
        appendChatMessage('🧹 Chat cleared.');
    });

    // Select folder
    selectFolderBtn.addEventListener('click', function() {
        const path = FileManager.selectFolder();
        folderPath.textContent = path;
        appendChatMessage('📁 Selected folder: ' + path);
    });

    // Generate
    generateBtn.addEventListener('click', function() {
        const data = {
            name: eqName.value,
            profile: profile.value,
            length: lengthInp.value,
            width: widthInp.value,
            height: heightInp.value,
            radius: radiusInp.value,
            posE: posE.value,
            posN: posN.value,
            posU: posU.value,
            orientation: orientation.value,
        };
        
        const result = Generator.generate(data);
        
        if (result.success) {
            const summary = Generator.getSummary(result);
            appendChatMessage('📦 ' + summary);
            console.log('Config data:', result.data);
            alert('✅ Configuration generated successfully!');
        } else {
            const errors = result.errors.join('\n');
            appendChatMessage('❌ Generation failed:\n' + errors);
            alert('❌ Errors:\n' + errors);
        }
    });

    // Save TXT
    saveBtn.addEventListener('click', function() {
        const data = {
            name: eqName.value,
            profile: profile.value,
            length: lengthInp.value,
            width: widthInp.value,
            height: heightInp.value,
            radius: radiusInp.value,
            posE: posE.value,
            posN: posN.value,
            posU: posU.value,
            orientation: orientation.value,
        };
        
        FileManager.saveToTXT(data);
        appendChatMessage('💾 TXT file saved.');
    });

    // Welcome message using Templates
    const welcomeMsg = Templates.welcome();
    appendChatMessage(welcomeMsg.text, welcomeMsg.bot);
    
    const helpMsg = Templates.help();
    appendChatMessage(helpMsg.text, helpMsg.bot);

})();
