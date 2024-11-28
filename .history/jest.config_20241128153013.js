module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFilesAfterEnv: [],
  collectCoverage: true,
  collectCoverageFrom: ['./*.js', '!./node_modules/**'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};