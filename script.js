(function() {
    'use strict';

    function getEl(id) {
        return document.getElementById(id);
    }
    
    var lengthInp = getEl('length');
    var widthInp = getEl('width');
    var heightInp = getEl('height');
    var radiusInp = getEl('radius');
    var posX = getEl('posX');
    var posY = getEl('posY');
    var posZ = getEl('posZ');
    var orientation = getEl('orientation');
    var chatContainer = getEl('chatContainer');
    var voiceBtn = getEl('voiceBtn');
    var clearChatBtn = getEl('clearChatBtn');
    var voiceStatus = getEl('voiceStatus');
    var exportBtn = getEl('exportBtn');

    var hasGreeted = false;
    var isProcessing = false; // CHỈNH SỬA: Ngăn xử lý trùng lặp

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
            voiceBtn.innerHTML = '<i class="fa-solid fa-circle-stop"></i> Dừng nghe';
        } else {
            voiceBtn.classList.remove('listening');
            voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Bắt đầu nghe';
        }
    }

    function parseDimensionsFromText(transcript) {
        var lower = transcript.toLowerCase();
        
        // English patterns
        var engLength = lower.match(/\b(length)\s*[:]?\s*(\d+)/i);
        var engWidth = lower.match(/\b(width)\s*[:]?\s*(\d+)/i);
        var engHeight = lower.match(/\b(height)\s*[:]?\s*(\d+)/i);
        var engRadius = lower.match(/\b(radius)\s*[:]?\s*(\d+)/i);
        
        // Vietnamese patterns
        var vnLength = lower.match(/\b(chiều dài|chieu dai|dài)\s*[:]?\s*(\d+)/i);
        var vnWidth = lower.match(/\b(chiều rộng|chieu rong|rộng|ngang)\s*[:]?\s*(\d+)/i);
        var vnHeight = lower.match(/\b(chiều cao|chieu cao|cao)\s*[:]?\s*(\d+)/i);
        var vnRadius = lower.match(/\b(bán kính|ban kinh|radius)\s*[:]?\s*(\d+)/i);
        
        // Position patterns - X, Y, Z
        var posXMatch = lower.match(/\b(x)\s*[:]?\s*(\d+)/i);
        var posYMatch = lower.match(/\b(y)\s*[:]?\s*(\d+)/i);
        var posZMatch = lower.match(/\b(z)\s*[:]?\s*(\d+)/i);
        
        // Vietnamese position patterns
        var vnPosX = lower.match(/\b(hoành độ|x)\s*[:]?\s*(\d+)/i);
        var vnPosY = lower.match(/\b(tung độ|y)\s*[:]?\s*(\d+)/i);
        var vnPosZ = lower.match(/\b(cao độ|z)\s*[:]?\s*(\d+)/i);
        
        var lengthMatch = engLength || vnLength;
        var widthMatch = engWidth || vnWidth;
        var heightMatch = engHeight || vnHeight;
        var radiusMatch = engRadius || vnRadius;
        
        var posXFinal = posXMatch || vnPosX;
        var posYFinal = posYMatch || vnPosY;
        var posZFinal = posZMatch || vnPosZ;
        
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
        if (posXFinal) {
            posX.value = posXFinal[2];
            updated.posX = posXFinal[2];
        }
        if (posYFinal) {
            posY.value = posYFinal[2];
            updated.posY = posYFinal[2];
        }
        if (posZFinal) {
            posZ.value = posZFinal[2];
            updated.posZ = posZFinal[2];
        }
        
        var parts = [];
        if (updated.length) parts.push('Chiều dài = ' + updated.length);
        if (updated.width) parts.push('Chiều rộng = ' + updated.width);
        if (updated.height) parts.push('Chiều cao = ' + updated.height);
        if (updated.radius) parts.push('Bán kính = ' + updated.radius);
        if (updated.posX) parts.push('X = ' + updated.posX);
        if (updated.posY) parts.push('Y = ' + updated.posY);
        if (updated.posZ) parts.push('Z = ' + updated.posZ);
        
        if (parts.length === 0) {
            appendChatMessage('⚠️ Không tìm thấy kích thước. Hãy nói rõ: Chiều dài, Chiều rộng, Chiều cao, Bán kính.');
            return false;
        } else {
            appendChatMessage('✅ Đã cập nhật: ' + parts.join(', '));
            return true;
        }
    }

    function handleSpeechResult(transcript) {
        // CHỈNH SỬA: Ngăn xử lý trùng lặp
        if (isProcessing) {
            console.log('Đang xử lý, bỏ qua kết quả này');
            return;
        }
        
        isProcessing = true;
        appendChatMessage('🗣️ "' + transcript + '"', false);
        
        var hasData = parseDimensionsFromText(transcript);
        
        if (hasData) {
            var responseText = 'File model 3D đã được tạo, hãy click vào nút Export để lưu file';
            appendChatMessage('🤖 ' + responseText, true);
            
            // CHỈNH SỬA: Đợi 1.5 giây trước khi nói để tránh xung đột
            setTimeout(function() {
                speakVietnamese(responseText, function() {
                    isProcessing = false;
                });
            }, 1500);
        } else {
            isProcessing = false;
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
        appendChatMessage('❌ Trình duyệt không hỗ trợ Voice Chat. Dùng Chrome/Edge.');
        if (voiceBtn) {
            voiceBtn.disabled = true;
            voiceBtn.style.opacity = '0.5';
        }
    }

    if (speechManager && speechManager.isSupported()) {
        speechManager.setCallbacks(
            function(transcript) {
                handleSpeechResult(transcript);
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
                appendChatMessage('❌ Voice chat không được hỗ trợ trong trình duyệt này.');
                return;
            }
            
            // CHỈNH SỬA: Nếu đang xử lý, không làm gì cả
            if (isProcessing) {
                appendChatMessage('⏳ Đang xử lý, vui lòng đợi...');
                return;
            }
            
            if (!hasGreeted) {
                hasGreeted = true;
                var greetingText = 'HELLO, TÔI LÀ TRỢ LÝ ẢO, BẠN HÃY NÓI RÕ KÍCH THƯỚC VÀ VỊ TRÍ CỦA LỖ MỞ NHÉ';
                appendChatMessage('🤖 ' + greetingText, true);
                
                // CHỈNH SỬA: Đợi 2 giây để nói xong rồi mới bắt đầu nghe
                speakVietnamese(greetingText, function() {
                    setTimeout(function() {
                        speechManager.startListening();
                    }, 500);
                });
            } else {
                speechManager.startListening();
            }
        });
    }

    // Clear Chat Button
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', function() {
            chatContainer.innerHTML = '';
            hasGreeted = false;
            isProcessing = false;
            appendChatMessage('🧹 Chat đã được xóa.');
        });
    }

    // Export Button
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            try {
                var data = {
                    length: lengthInp ? lengthInp.value : '7000',
                    width: widthInp ? widthInp.value : '5000',
                    height: heightInp ? heightInp.value : '10000',
                    radius: radiusInp ? radiusInp.value : '100',
                    posX: posX ? posX.value : '1000',
                    posY: posY ? posY.value : '2000',
                    posZ: posZ ? posZ.value : '500',
                    orientation: orientation ? orientation.value : 'Y IS N AND Z IS U'
                };
                
                var content = 'AVEVA Equipment Studio\n';
                content += '================================\n';
                content += 'THÔNG SỐ LỖ MỞ (OPENING DIMENSIONS)\n';
                content += '================================\n';
                content += 'Kích thước (Dimensions):\n';
                content += '  Chiều dài (Length): ' + data.length + '\n';
                content += '  Chiều rộng (Width): ' + data.width + '\n';
                content += '  Chiều cao (Height): ' + data.height + '\n';
                content += '  Bán kính (Radius): ' + data.radius + '\n';
                content += '--------------------------------\n';
                content += 'Vị trí (Position):\n';
                content += '  X: ' + data.posX + '\n';
                content += '  Y: ' + data.posY + '\n';
                content += '  Z: ' + data.posZ + '\n';
                content += '--------------------------------\n';
                content += 'Hướng (Orientation): ' + data.orientation + '\n';
                content += '================================\n';
                content += 'Ngày tạo: ' + new Date().toLocaleString();
                
                var blob = new Blob([content], { type: 'text/plain' });
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'opening_config.txt';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                setTimeout(function() {
                    URL.revokeObjectURL(link.href);
                }, 1000);
                
                var exportMsg = 'File đã được xuất thành công';
                appendChatMessage('💾 ' + exportMsg, true);
                
                // CHỈNH SỬA: Đợi 1 giây rồi mới nói
                setTimeout(function() {
                    speakVietnamese(exportMsg);
                }, 1000);
                
            } catch (e) {
                console.error('❌ Error exporting file:', e);
                appendChatMessage('❌ Lỗi khi lưu file: ' + e.message);
                alert('❌ Lỗi: ' + e.message);
            }
        });
    }

    // Welcome messages
    appendChatMessage('👋 Xin chào! Tôi là trợ lý giọng nói.');
    appendChatMessage('💡 Hãy nói: "Chiều dài 2000, Chiều rộng 1000, Chiều cao 1500, Bán kính 100"');
    appendChatMessage('📝 Tôi sẽ tự động cập nhật các trường.');
    appendChatMessage('💾 Click "Export TXT" để lưu file cấu hình.');

    console.log('✅ AVEVA Equipment Studio loaded successfully!');

})();
