var Templates = {
    welcome: function() {
        return {
            bot: true,
            text: '👋 Welcome! Use voice or manual input.'
        };
    },

    help: function() {
        return {
            bot: true,
            text: '💡 Say: "Length 2000, Width 1000, Height 1500, Radius 100"'
        };
    },

    bot: function(text) {
        return {
            bot: true,
            text: text
        };
    },

    user: function(text) {
        return {
            bot: false,
            text: text
        };
    },

    success: function(text) {
        return {
            bot: true,
            text: '✅ ' + text
        };
    },

    error: function(text) {
        return {
            bot: true,
            text: '❌ ' + text
        };
    },

    info: function(text) {
        return {
            bot: true,
            text: 'ℹ️ ' + text
        };
    },

    warning: function(text) {
        return {
            bot: true,
            text: '⚠️ ' + text
        };
    },

    dimensionUpdate: function(dimensions) {
        var parts = [];
        if (dimensions.length) parts.push('Length = ' + dimensions.length);
        if (dimensions.width) parts.push('Width = ' + dimensions.width);
        if (dimensions.height) parts.push('Height = ' + dimensions.height);
        if (dimensions.radius) parts.push('Radius = ' + dimensions.radius);
        
        return {
            bot: true,
            text: '✅ Updated: ' + parts.join(', ')
        };
    },

    listening: function() {
        return {
            bot: true,
            text: '🎙️ Listening...'
        };
    },

    transcript: function(text) {
        return {
            bot: false,
            text: '🗣️ "' + text + '"'
        };
    }
};
