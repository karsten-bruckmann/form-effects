module.exports = {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/projects/demo'],
    testMatch: ['<rootDir>/projects/demo/src/**/+(*.)+(spec).+(ts)'],
    collectCoverage: false,
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    moduleNameMapper: {
        '@kbru/form-effects': '<rootDir>/projects/form-effects/src/public-api',
    },
};
