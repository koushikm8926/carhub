const { spawn } = require('child_process');
const { expect } = require('@jest/globals');

test('TC 1', (done) => {
  const child = spawn('node', ['./carhub.js', 'carhub cars.JSON']);

  child.stdout.on('data', (data) => {
      expect(data.toString()).toContain('ERROR: You should introduce the option.\n Usage: carhub <options><input_file>');
      done();
  });

  child.stderr.on('data', (data) => {
      done(new Error(data.toString()));
  });
});