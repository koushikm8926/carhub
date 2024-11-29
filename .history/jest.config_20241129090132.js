module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: [],
  rootDir: './',
  collectCoverage: true,
  coverageDirectory: 'coverage
  collectCoverageFrom: ['<rootDir>/carhub.js'],
  coverageReporters: ['text'],
};