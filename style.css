/* =========================================
   AVEVA Equipment Studio
   Professional Light Theme - Full Width
   ========================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    background: #f0f2f5;
    color: #1a2332;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* =========================================
   HEADER
   ========================================= */

header {
    background: #ffffff;
    padding: 14px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e4e8;
    flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    height: 60px;
}

.logo {
    font-size: 18px;
    font-weight: 600;
    color: #0a2b4e;
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo i {
    font-size: 22px;
    color: #0066b3;
}

.status {
    font-size: 14px;
    color: #4a5a6e;
    display: flex;
    align-items: center;
    gap: 8px;
}

.green-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #22c55e;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
    animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* =========================================
   MAIN - Full Width
   ========================================= */

.main {
    flex: 1;
    padding: 20px;
    overflow: hidden;
    background: #f0f2f5;
    display: flex;
}

/* =========================================
   LEFT PANEL - Full Width Grid
   ========================================= */

.leftPanel {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 12px;
    padding: 24px 28px;
    overflow-y: auto;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 30px;
    align-content: start;
}

/* =========================================
   GROUPS
   ========================================= */

.group {
    background: #f8fafc;
    border-radius: 10px;
    padding: 16px 18px 18px;
    border: 1px solid #e8ecf0;
    transition: border-color 0.2s;
}

.group:hover {
    border-color: #d0d7de;
}

.group h2 {
    font-size: 14px;
    font-weight: 600;
    color: #1a3a5c;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.group h2 i {
    color: #0066b3;
    font-size: 16px;
    width: 20px;
}

.group label {
    font-size: 12px;
    font-weight: 500;
    color: #4a5a6e;
    display: block;
    margin-top: 10px;
    margin-bottom: 4px;
}

.group label:first-of-type {
    margin-top: 0;
}

.group input,
.group select {
    width: 100%;
    padding: 8px 12px;
    border: 1.5px solid #dce1e8;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    background: white;
    color: #1a2332;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.group input:focus,
.group select:focus {
    outline: none;
    border-color: #0066b3;
    box-shadow: 0 0 0 3px rgba(0, 102, 179, 0.12);
}

.group input[type="number"] {
    -moz-appearance: textfield;
}

.group input[type="number"]::-webkit-outer-spin-button,
.group input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.group .row {
    display: flex;
    gap: 12px;
}

.group .row > div {
    flex: 1;
}

.group .row label {
    font-size: 12px;
    font-weight: 600;
    color: #2a4a6e;
    margin-bottom: 2px;
}

.group .row input {
    padding: 8px 10px;
}

/* =========================================
   BUTTONS IN GROUPS
   ========================================= */

.group button {
    width: 100%;
    padding: 10px;
    background: #0066b3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s;
}

.group button:hover {
    background: #005299;
    transform: translateY(-1px);
}

.group button:active {
    transform: scale(0.98);
}

/* Output Folder */
#folderPath {
    margin-top: 10px;
    padding: 10px;
    background: #f0f2f5;
    border-radius: 5px;
    color: #4a5a6e;
    font-size: 12px;
    word-break: break-all;
}

/* =========================================
   VOICE CHAT GROUP
   ========================================= */

.voice-chat-group {
    grid-column: 1 / -1;
    min-height: 280px;
    display: flex;
    flex-direction: column;
}

.chat-container {
    flex: 1;
    min-height: 180px;
    max-height: 280px;
    overflow-y: auto;
    background: #ffffff;
    border-radius: 8px;
    padding: 12px;
    margin: 6px 0 10px;
    border: 1.5px solid #e0e4e8;
    scroll-behavior: smooth;
}

.chat-container::-webkit-scrollbar {
    width: 5px;
}

.chat-container::-webkit-scrollbar-track {
    background: #f0f2f5;
    border-radius: 10px;
}

.chat-container::-webkit-scrollbar-thumb {
    background: #c0c8d0;
    border-radius: 10px;
}

.chat-message {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 12px;
    margin-bottom: 8px;
    border-radius: 8px;
    animation: slideIn 0.3s ease;
    font-size: 13px;
    line-height: 1.5;
}

.chat-message.bot {
    background: #e8f0fe;
    color: #0d3a6e;
}

.chat-message.user {
    background: #e6f7e6;
    color: #1a5e1a;
}

.chat-message.interim {
    opacity: 0.7;
    background: #f3e8ff;
    color: #4a2a7a;
}

.chat-message i {
    font-size: 15px;
    margin-top: 2px;
    min-width: 20px;
}

.chat-message span {
    flex: 1;
    word-break: break-word;
    white-space: pre-wrap;
}

.typing-indicator {
    display: inline-block;
    animation: dots 1.4s infinite;
    font-weight: bold;
}

@keyframes dots {
    0%, 20% { content: ''; }
    40% { content: '.'; }
    60% { content: '..'; }
    80%, 100% { content: '...'; }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.voice-controls {
    display: flex;
    gap: 10px;
    margin: 4px 0 6px;
}

.voice-btn {
    flex: 1;
    padding: 10px 16px;
    background: #0066b3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.voice-btn:hover {
    background: #005299;
    transform: scale(1.01);
}

.voice-btn.listening {
    background: #dc3545;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

.voice-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.clear-btn {
    padding: 10px 16px;
    background: #6c7a8a;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
}

.clear-btn:hover {
    background: #5a6a7a;
}

.voice-status {
    font-size: 13px;
    color: #5a6a7e;
    text-align: center;
    padding: 4px 0;
    font-style: italic;
    min-height: 24px;
}

/* =========================================
   BUTTONS GROUP (Generate & Save)
   ========================================= */

.group.buttons {
    grid-column: 1 / -1;
    display: flex;
    gap: 14px;
    background: transparent;
    border: none;
    padding: 8px 0 0;
}

.group.buttons button {
    flex: 1;
    padding: 12px;
    font-weight: 600;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    height: 44px;
}

#generateBtn {
    background: #0066b3;
    color: white;
}

#generateBtn:hover {
    background: #005299;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 102, 179, 0.3);
}

#saveBtn {
    background: #1a3a5c;
    color: white;
}

#saveBtn:hover {
    background: #0f2a44;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(26, 58, 92, 0.3);
}

/* =========================================
   FOOTER
   ========================================= */

footer {
    background: #ffffff;
    padding: 10px 32px;
    border-top: 1px solid #e0e4e8;
    font-size: 12px;
    color: #6a7a8e;
    flex-shrink: 0;
    text-align: center;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* =========================================
   RESPONSIVE
   ========================================= */

@media (max-width: 1024px) {
    .leftPanel {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        padding: 20px;
    }
}

@media (max-width: 768px) {
    .main {
        padding: 12px;
    }
    
    .leftPanel {
        grid-template-columns: 1fr;
        padding: 16px;
        gap: 14px;
    }
    
    .voice-chat-group {
        min-height: 240px;
    }
    
    .chat-container {
        max-height: 200px;
        min-height: 120px;
    }
    
    header {
        padding: 10px 16px;
        height: 50px;
    }
    
    .logo {
        font-size: 15px;
    }
    
    .group.buttons {
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    .group .row {
        flex-direction: column;
        gap: 8px;
    }
    
    .voice-controls {
        flex-direction: column;
    }
    
    .clear-btn {
        width: 100%;
    }
}
