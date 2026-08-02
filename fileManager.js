var FileManager = {
    selectFolder: function() {
        return '/home/user/projects/aveva_output';
    },

    saveToTXT: function(data, filename) {
        filename = filename || 'equipment_config.txt';
        try {
            var content = this.formatData(data);
            var blob = new Blob([content], { type: 'text/plain' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function() { URL.revokeObjectURL(a.href); }, 1000);
            return true;
        } catch (e) {
            console.error('Error saving file:', e);
            return false;
        }
    },

    formatData: function(data) {
        return 'AVEVA Equipment Studio\n' +
               '================================\n' +
               'Equipment: ' + (data.name || 'N/A') + '\n' +
               'Profile: ' + (data.profile || 'N/A') + '\n' +
               '--------------------------------\n' +
               'Dimensions:\n' +
               '  Length: ' + (data.length || 'N/A') + '\n' +
               '  Width: ' + (data.width || 'N/A') + '\n' +
               '  Height: ' + (data.height || 'N/A') + '\n' +
               '  Corner Radius: ' + (data.radius || 'N/A') + '\n' +
               '--------------------------------\n' +
               'Position:\n' +
               '  E: ' + (data.posE || 'N/A') + '\n' +
               '  N: ' + (data.posN || 'N/A') + '\n' +
               '  U: ' + (data.posU || 'N/A') + '\n' +
               '--------------------------------\n' +
               'Orientation: ' + (data.orientation || 'N/A') + '\n' +
               '================================\n' +
               'Generated: ' + new Date().toLocaleString();
    }
};
