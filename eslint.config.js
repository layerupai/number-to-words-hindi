const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: [
            'node_modules/**',
            'numberToWords.js',
            'numberToWords.min.js',
            'spec/**'
        ]
    },
    js.configs.recommended,
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 5,
            sourceType: 'script',
            globals: Object.assign({}, globals.browser, globals.node)
        },
        rules: {
            'no-redeclare': 'off'
        }
    },
    {
        files: ['eslint.config.js', 'gulpfile.js'],
        languageOptions: {
            ecmaVersion: 2015,
            sourceType: 'script',
            globals: Object.assign({}, globals.node)
        }
    }
];
