// Generator utilities
const Generator = {
    // Generate configuration
    generate: function(data) {
        // Validate data
        const validation = this.validate(data);
        if (!validation.valid) {
            return {
                success: false,
                errors: validation.errors,
                data: null
            };
        }

        // Generate config object
        const config = {
            equipment: {
                name: data.name || 'EQ001',
                profile: data.profile || 'ROUNDRECT'
            },
            dimensions: {
                length: parseFloat(data.length) || 0,
                width: parseFloat(data.width) || 0,
                height: parseFloat(data.height) || 0,
                radius: parseFloat(data.radius) || 0
            },
            position: {
                e: parseFloat(data.posE) || 0,
                n: parseFloat(data.posN) || 0,
                u: parseFloat(data.posU) || 0
            },
            orientation: data.orientation || 'Y IS N AND Z IS U',
            timestamp: new Date().toISOString()
        };

        return {
            success: true,
            errors: [],
            data: config
        };
    },

    // Validate input data
    validate: function(data) {
        const errors = [];
        
        // Check required fields
        if (!data.name || data.name.trim() === '') {
            errors.push('Equipment name is required');
        }
        if (!data.profile || data.profile.trim() === '') {
            errors.push('Profile is required');
        }
        
        // Validate numbers
        const numFields = ['length', 'width', 'height', 'radius', 'posE', 'posN', 'posU'];
        numFields.forEach(field => {
            const val = parseFloat(data[field]);
            if (isNaN(val) || val < 0) {
                errors.push(`${field} must be a positive number`);
            }
        });

        return {
            valid: errors.length === 0,
            errors: errors
        };
    },

    // Get config summary
    getSummary: function(config) {
        if (!config || !config.success || !config.data) {
            return 'Invalid configuration';
        }
        const d = config.data;
        return `Equipment: ${d.equipment.name} | ` +
               `Dimensions: ${d.dimensions.length}x${d.dimensions.width}x${d.dimensions.height} | ` +
               `Position: (${d.position.e}, ${d.position.n}, ${d.position.u})`;
    }
};

// Global export
if (typeof window !== 'undefined') {
    window.Generator = Generator;
}
