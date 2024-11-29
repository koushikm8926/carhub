module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: [],
  root
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/carhub.js'],
  coverageReporters: ['text'],
};