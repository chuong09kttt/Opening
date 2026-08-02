// Template utilities for chat messages
const Templates = {
    // Welcome message
    welcome: function() {
        return {
            bot: true,
            text: '👋 Welcome! Use voice or manual input.'
        };
    },

    // Help message
    help: function() {
        return {
            bot: true,
            text: '💡 Say: "Length 2000, Width 1000, Height 1500, Radius 100"'
        };
    },

    // Generic bot message
    bot: function(text) {
        return {
            bot: true,
            text: text
        };
    },

    // Generic user message
    user: function(text) {
        return {
            bot: false,
            text: text
        };
    },

    // Success message
    success: function(text) {
        return {
            bot: true,
            text: '✅ ' + text
        };
    },

    // Error message
    error: function(text) {
        return {
            bot: true,
            text: '❌ ' + text
        };
    },

    // Info message
    info: function(text) {
        return {
            bot: true,
            text: 'ℹ️ ' + text
        };
    },

    // Warning message
    warning: function(text) {
        return {
            bot: true,
            text: '⚠️ ' + text
        };
    },

    // Format dimension update
    dimensionUpdate: function(dimensions) {
        const parts = [];
        if (dimensions.length) parts.push(`Length = ${dimensions.length}`);
        if (dimensions.width) parts.push(`Width = ${dimensions.width}`);
        if (dimensions.height) parts.push(`Height = ${dimensions.height}`);
        if (dimensions.radius) parts.push(`Radius = ${dimensions.radius}`);
        
        return {
            bot: true,
            text: '✅ Updated: ' + parts.join(', ')
        };
    },

    // Format listening message
    listening: function() {
        return {
            bot: true,
            text: '🎙️ Listening...'
        };
    },

    // Format transcript
    transcript: function(text) {
        return {
            bot: false,
            text: '🗣️ "' + text + '"'
        };
    }
};

// Global export
if (typeof window !== 'undefined') {
    window.Templates = Templates;
}
