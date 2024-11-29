module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: [],
  collectCoverage: true,
  collectCoverageFrom: ['./*.js', '!./node_modules/**'],
  coverageReporters: ['text'],
};