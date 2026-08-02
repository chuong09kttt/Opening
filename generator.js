// Generator utilities
const Generator = {
    // Generate configuration
    generate: function(data) {
        // Validate data
        const validated = this.validate(data);
        if (!validated.valid) {
            return {
                success: false,
                errors: validated.errors,
                data: null
            };
        }

        // Generate config object
        const config = {
            equipment: {
                name: data.name,
                profile: data.profile
            },
            dimensions: {
                length: parseFloat(data.length),
                width: parseFloat(data.width),
                height: parseFloat(data.height),
                radius: parseFloat(data.radius)
            },
            position: {
                e: parseFloat(data.posE),
                n: parseFloat(data.posN),
                u: parseFloat(data.posU)
            },
            orientation: data.orientation,
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
        if (!data.name) errors.push('Equipment name is required');
        if (!data.profile) errors.push('Profile is required');
        
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
        if (!config || !config.success) return 'Invalid configuration';
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
