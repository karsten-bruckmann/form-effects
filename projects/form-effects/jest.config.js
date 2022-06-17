module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/projects/form-effects'],
  testMatch: ['<rootDir>/projects/form-effects/src/**/+(*.)+(spec).+(ts)'],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'json', 'text'],
  coverageDirectory: '<rootDir>/coverage/form-effects',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
};
