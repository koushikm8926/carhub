module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFilesAfterEnv: [],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/path/to/your/source/files/**/*.js'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};