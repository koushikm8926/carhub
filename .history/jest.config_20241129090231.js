module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: [],
  collectCoverage: true,
  collectCoverageFrom: ['./carhub.js'],
  coverageReporters: ['text'],
};