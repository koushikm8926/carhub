module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: [],
  rootDir: './',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/carhub.js'],
  coverageReporters: ['text'],
};