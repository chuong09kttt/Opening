// File management utilities
const FileManager = {
    // Simulate folder selection
    selectFolder: function() {
        // Trong ứng dụng thực tế, sử dụng showDirectoryPicker hoặc tương tự
        const fakePath = '/home/user/projects/aveva_output';
        return fakePath;
    },

    // Save data to TXT file
    saveToTXT: function(data, filename = 'equipment_config.txt') {
        try {
            const content = this.formatData(data);
            const blob = new Blob([content], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(a.href), 1000);
            return true;
        } catch (e) {
            console.error('Error saving file:', e);
            return false;
        }
    },

    // Format data for TXT export
    formatData: function(data) {
        return `AVEVA Equipment Studio
================================
Equipment: ${data.name || 'N/A'}
Profile: ${data.profile || 'N/A'}
--------------------------------
Dimensions:
  Length: ${data.length || 'N/A'}
  Width: ${data.width || 'N/A'}
  Height: ${data.height || 'N/A'}
  Corner Radius: ${data.radius || 'N/A'}
--------------------------------
Position:
  E: ${data.posE || 'N/A'}
  N: ${data.posN || 'N/A'}
  U: ${data.posU || 'N/A'}
--------------------------------
Orientation: ${data.orientation || 'N/A'}
================================
Generated: ${new Date().toLocaleString()}`;
    }
};

// Global export
if (typeof window !== 'undefined') {
    window.FileManager = FileManager;
}
