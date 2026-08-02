(function() {
    'use strict';

    function getEl(id) {
        return document.getElementById(id);
    }
    
    var lengthInp = getEl('length');
    var widthInp = getEl('width');
    var heightInp = getEl('height');
    var radiusInp = getEl('radius');
    var posE = getEl('posE');
    var posN = getEl('posN');
    var posU = getEl('posU');
    var orientation = getEl('orientation');
    var chatContainer = getEl('chatContainer');
    var voiceBtn = getEl('voiceBtn');
    var clearChatBtn = getEl('clearChatBtn');
    var voiceStatus = getEl('voiceStatus');
    var exportBtn = getEl('exportBtn');

    function appendChatMessage(text, isBot) {
        isBot = (isBot !== undefined) ? isBot : true;
        var div = document.createElement('div');
        div.className = 'chat-message ' + (isBot ? 'bot' : 'user');
        var icon = document.createElement('i');
        icon.className = isBot ? 'fa-solid fa-robot' : 'fa-solid fa-user';
        var span = document.createElement('span');
        span.textContent = text;
        div.appendChild(icon);
        div.appendChild(span);
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function updateVoiceStatus(text, isListeningMode) {
        isListeningMode = isListeningMode || false;
        voiceStatus.textContent = text;
        if (isListeningMode) {
            voiceBtn.classList.add('listening');
            voiceBtn.innerHTML = '<i class="fa-solid fa-circle-stop"></i> Stop Listening';
        } else {
            voiceBtn.classList.remove('listening');
            voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Start Listening';
        }
    }

    function parseDimensionsFromText(transcript) {
        var lower = transcript.toLowerCase();
        
        var engLength = lower.match(/\b(length)\s*[:]?\s*(\d+)/i);
        var engWidth = lower.match(/\b(width)\s*[:]?\s*(\d+)/i);
        var engHeight = lower.match(/\b(height)\s*[:]?\s*(\d+)/i);
        var engRadius = lower.match(/\b(radius)\s*[:]?\s*(\d+)/i);
        
        var vnLength = lower.match(/\b(chiều dài|chieu dai|dài)\s*[:]?\s*(\d+)/i);
        var vnWidth = lower.match(/\b(chiều rộng|chieu rong|rộng|ngang)\s*[:]?\s*(\d+)/i);
        var vnHeight = lower.match(/\b(chiều cao|chieu cao|cao)\s*[:]?\s*(\d+)/i);
        var vnRadius = lower.match(/\b(bán kính|ban kinh|radius)\s*[:]?\s*(\d+)/i);
        
        var lengthMatch = engLength || vnLength;
        var widthMatch = engWidth || vnWidth;
        var heightMatch = engHeight || vnHeight;
        var radiusMatch = engRadius || vnRadius;
        
        var updated = {};
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
        
        var parts = [];
        if (updated.length) parts.push('Length = ' + updated.length);
        if (updated.width) parts.push('Width = ' + updated.width);
        if (updated.height) parts.push('Height = ' + updated.height);
        if (updated.radius) parts.push('Radius = ' + updated.radius);
        
        if (parts.length === 0) {
            appendChatMessage('⚠️ No dimensions found. Please say: Length, Width, Height, Radius.');
        } else {
            appendChatMessage('✅ Updated: ' + parts.join(', '));
        }
    }

    // Initialize Speech Manager
    var speechManager = null;
    
    try {
        speechManager = new SpeechManager();
    } catch (e) {
        console.error('Failed to initialize SpeechManager:', e);
        speechManager = null;
    }
    
    if (!speechManager || !speechManager.isSupported()) {
        appendChatMessage('❌ Browser doesn\'t support Voice Chat. Use Chrome/Edge.');
        if (voiceBtn) {
            voiceBtn.disabled = true;
            voiceBtn.style.opacity = '0.5';
        }
    }

    if (speechManager && speechManager.isSupported()) {
        speechManager.setCallbacks(
            function(transcript) {
                appendChatMessage('🗣️ "' + transcript + '"', false);
                parseDimensionsFromText(transcript);
            },
            function(text, isListening) {
                updateVoiceStatus(text, isListening);
            }
        );
    }

    // Voice Button
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            if (!speechManager || !speechManager.isSupported()) {
                appendChatMessage('❌ Voice chat not supported in this browser.');
                return;
            }
            speechManager.startListening();
        });
    }

    // Clear Chat Button
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', function() {
            chatContainer.innerHTML = '';
            appendChatMessage('🧹 Chat cleared.');
        });
    }

    // ============================================
    // EXPORT BUTTON - Lưu file TXT
    // ============================================
    if (exportBtn) {
        console.log('✅ Export button found!'); // Debug
        exportBtn.addEventListener('click', function() {
            console.log('🔄 Export button clicked!'); // Debug
            try {
                // Lấy dữ liệu từ các input
                var data = {
                    length: lengthInp ? lengthInp.value : '5000',
                    width: widthInp ? widthInp.value : '5000',
                    height: heightInp ? heightInp.value : '1500',
                    radius: radiusInp ? radiusInp.value : '100',
                    posE: posE ? posE.value : '1000',
                    posN: posN ? posN.value : '2000',
                    posU: posU ? posU.value : '500',
                    orientation: orientation ? orientation.value : 'Y IS N AND Z IS U'
                };
                
                console.log('📊 Data to export:', data); // Debug
                
                // Tạo nội dung file
                var content = 'AVEVA Equipment Studio\n';
                content += '================================\n';
                content += 'Dimensions:\n';
                content += '  Length: ' + data.length + '\n';
                content += '  Width: ' + data.width + '\n';
                content += '  Height: ' + data.height + '\n';
                content += '  Corner Radius: ' + data.radius + '\n';
                content += '--------------------------------\n';
                content += 'Position:\n';
                content += '  E: ' + data.posE + '\n';
                content += '  N: ' + data.posN + '\n';
                content += '  U: ' + data.posU + '\n';
                content += '--------------------------------\n';
                content += 'Orientation: ' + data.orientation + '\n';
                content += '================================\n';
                content += 'Generated: ' + new Date().toLocaleString();
                
                // Tạo và tải file
                var blob = new Blob([content], { type: 'text/plain' });
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'equipment_config.txt';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Giải phóng URL sau khi tải
                setTimeout(function() {
                    URL.revokeObjectURL(link.href);
                }, 1000);
                
                appendChatMessage('💾 TXT file exported successfully!');
                console.log('✅ File exported successfully!'); // Debug
                
            } catch (e) {
                console.error('❌ Error exporting file:', e);
                appendChatMessage('❌ Error exporting file: ' + e.message);
                alert('❌ Error: ' + e.message);
            }
        });
    } else {
        console.error('❌ Export button not found!');
    }

    // Welcome messages
    appendChatMessage('👋 Welcome! Use voice or manual input.');
    appendChatMessage('💡 Say: "Length 2000, Width 1000, Height 1500, Radius 100"');
    appendChatMessage('📝 I\'ll update the fields automatically.');
    appendChatMessage('💾 Click "Export TXT" to save the configuration.');

    console.log('✅ AVEVA Equipment Studio loaded successfully!');

})();
