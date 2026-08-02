// Configuration and DOM references
const CONFIG = {
    // DOM element IDs
    elements: {
        eqName: 'eqName',
        profile: 'profile',
        length: 'length',
        width: 'width',
        height: 'height',
        radius: 'radius',
        posE: 'posE',
        posN: 'posN',
        posU: 'posU',
        orientation: 'orientation',
        folderPath: 'folderPath',
        chatContainer: 'chatContainer',
        voiceBtn: 'voiceBtn',
        clearChatBtn: 'clearChatBtn',
        voiceStatus: 'voiceStatus',
        generateBtn: 'generateBtn',
        saveBtn: 'saveBtn',
        selectFolder: 'selectFolder'
    },
    
    // Default values
    defaults: {
        eqName: 'EQ001',
        length: 5000,
        width: 5000,
        height: 1500,
        radius: 100,
        posE: 1000,
        posN: 2000,
        posU: 500,
        profile: 'ROUNDRECT',
        orientation: 'Y IS N AND Z IS U'
    },
    
    // Helper function to get all elements
    getElements: function() {
        const els = {};
        for (const [key, id] of Object.entries(this.elements)) {
            els[key] = document.getElementById(id);
        }
        return els;
    }
};

// Global export
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
