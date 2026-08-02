// File management utilities
const FileManager = {
    // Simulate folder selection
    selectFolder: function() {
        // In real app, use showDirectoryPicker or similar
        const fakePath = '/home/user/projects/aveva_output';
        return fakePath;
    },

    // Save data to TXT file
    saveToTXT: function(data, filename = 'equipment_config.txt') {
        const content = this.formatData(data);
        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
        return true;
    },

    // Format data for TXT export
    formatData: function(data) {
        return `AVEVA Equipment Studio
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
    }
};

// Global export
if (typeof window !== 'undefined') {
    window.FileManager = FileManager;
}
