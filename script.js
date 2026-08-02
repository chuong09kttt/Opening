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

    // Parse dimensions from speech (supports English & Vietnamese)
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
        
        // Use whichever matches first (English preferred, then Vietnamese)
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
    let speechManager = null;
    
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

    // Set speech callbacks if available
    if (speechManager && speechManager.isSupported()) {
        speechManager.setCallbacks(
            // onResult - khi nhận được kết quả từ microphone
            (transcript) => {
                appendChatMessage('🗣️ "' + transcript + '"', false);
                parseDimensionsFromText(transcript);
            },
            // onStatus - khi trạng thái thay đổi
            (text, isListening) => {
                updateVoiceStatus(text, isListening);
            }
        );
    }

    // ============================================
    // VOICE BUTTON - Bắt đầu/Dừng nghe
    // ============================================
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            if (!speechManager || !speechManager.isSupported()) {
                appendChatMessage('❌ Voice chat not supported in this browser.');
                return;
            }
            speechManager.startListening();
        });
    }

    // ============================================
    // CLEAR CHAT BUTTON - Xóa tin nhắn
    // ============================================
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', function() {
            chatContainer.innerHTML = '';
            appendChatMessage('🧹 Chat cleared.');
        });
    }

    // ============================================
    // SELECT FOLDER BUTTON - Chọn thư mục
    // ============================================
    if (selectFolderBtn) {
        selectFolderBtn.addEventListener('click', function() {
            try {
                // Sử dụng FileManager nếu có
                if (typeof FileManager !== 'undefined' && FileManager.selectFolder) {
                    const path = FileManager.selectFolder();
                    folderPath.textContent = path;
                    appendChatMessage('📁 Selected folder: ' + path);
                } else {
                    // Fallback: giả lập chọn folder
                    const fakePath = '/home/user/projects/aveva_output';
                    folderPath.textContent = fakePath;
                    appendChatMessage('📁 Selected folder: ' + fakePath);
                }
            } catch (e) {
                console.error('Error selecting folder:', e);
                appendChatMessage('❌ Error selecting folder.');
            }
        });
    }

    // ============================================
    // GENERATE BUTTON - Tạo cấu hình
    // ============================================
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            try {
                // Thu thập dữ liệu từ form
                const data = {
                    name: eqName ? eqName.value : 'EQ001',
                    profile: profile ? profile.value : 'ROUNDRECT',
                    length: lengthInp ? lengthInp.value : '5000',
                    width: widthInp ? widthInp.value : '5000',
                    height: heightInp ? heightInp.value : '1500',
                    radius: radiusInp ? radiusInp.value : '100',
                    posE: posE ? posE.value : '1000',
                    posN: posN ? posN.value : '2000',
                    posU: posU ? posU.value : '500',
                    orientation: orientation ? orientation.value : 'Y IS N AND Z IS U'
                };
                
                // Kiểm tra Generator có tồn tại không
                if (typeof Generator !== 'undefined' && Generator.generate) {
                    const result = Generator.generate(data);
                    
                    if (result.success) {
                        const summary = Generator.getSummary ? Generator.getSummary(result) : 'Generated successfully';
                        appendChatMessage('📦 ' + summary);
                        console.log('Config data:', result.data);
                        alert('✅ Configuration generated successfully!');
                    } else {
                        const errors = result.errors.join('\n');
                        appendChatMessage('❌ Generation failed:\n' + errors);
                        alert('❌ Errors:\n' + errors);
                    }
                } else {
                    // Fallback: hiển thị thông tin cơ bản
                    let msg = '📦 Generate: ';
                    msg += `L=${data.length}, W=${data.width}, H=${data.height}, R=${data.radius}`;
                    msg += ` | Pos(E,N,U)=(${data.posE},${data.posN},${data.posU})`;
                    appendChatMessage(msg);
                    console.log('Config data:', data);
                    alert('✅ Configuration generated (check Console)');
                }
            } catch (e) {
                console.error('Error generating:', e);
                appendChatMessage('❌ Error generating configuration.');
                alert('❌ Error: ' + e.message);
            }
        });
    }

    // ============================================
    // SAVE BUTTON - Lưu file TXT
    // ============================================
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            try {
                // Thu thập dữ liệu từ form
                const data = {
                    name: eqName ? eqName.value : 'EQ001',
                    profile: profile ? profile.value : 'ROUNDRECT',
                    length: lengthInp ? lengthInp.value : '5000',
                    width: widthInp ? widthInp.value : '5000',
                    height: heightInp ? heightInp.value : '1500',
                    radius: radiusInp ? radiusInp.value : '100',
                    posE: posE ? posE.value : '1000',
                    posN: posN ? posN.value : '2000',
                    posU: posU ? posU.value : '500',
                    orientation: orientation ? orientation.value : 'Y IS N AND Z IS U'
                };
                
                // Tạo nội dung file
                const content = `AVEVA Equipment Studio
================================
Equipment: ${data.name}
Profile: ${data.profile}
--------------------------------
Dimensions:
  Length: ${data.length}
  Width: ${data.width}
  Height: ${data.height}
  Corner Radius: ${data.radius}
--------------------------------
Position:
  E: ${data.posE}
  N: ${data.posN}
  U: ${data.posU}
--------------------------------
Orientation: ${data.orientation}
================================
Generated: ${new Date().toLocaleString()}`;
                
                // Tạo và tải file
                const blob = new Blob([content], { type: 'text/plain' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'equipment_config.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(a.href);
                
                appendChatMessage('💾 TXT file saved successfully!');
            } catch (e) {
                console.error('Error saving file:', e);
                appendChatMessage('❌ Error saving file.');
                alert('❌ Error: ' + e.message);
            }
        });
    }

    // ============================================
    // WELCOME MESSAGES
    // ============================================
    appendChatMessage('👋 Welcome! Use voice or manual input.');
    appendChatMessage('💡 Say: "Length 2000, Width 1000, Height 1500, Radius 100"');
    appendChatMessage('📝 I\'ll update the fields automatically.');

    console.log('✅ AVEVA Equipment Studio loaded successfully!');
    console.log('📋 All features ready to use.');

})();
