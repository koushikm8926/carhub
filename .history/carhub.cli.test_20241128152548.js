const { spawn } = require('child_process');
const { expect } = require('@jest/globals');

test('simulate command line input for help', (done) => {
  const child = spawn('node', ['../carhub.js', 'carhub help']);

  child.stdout.on('data', (data) => {
      expect(data.toString()).toContain('Usage: carhub <command> [options]');
      done();
  });

  child.stderr.on('data', (data) => {
      done(new Error(data.toString()));
  });
});