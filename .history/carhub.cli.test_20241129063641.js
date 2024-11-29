const { spawn } = require('child_process');
const { expect } = require('@jest/globals');

test('TC 1', (done) => {
  const child = spawn('node', ['./carhub.js', 'carhub cars.JSON']);

  child.stdout.on('data', (data) => {
      expect(data.toString()).toBe('ERROR: You should introduce the option.\n Usage: carhub <options><input_file>');
      done();
  });

/
});