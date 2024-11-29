const { spawn } = require('child_process');
const { expect } = require('@jest/globals');

test('TC 1', (done) => {
  const filePath = path.resolve(__dirname, '../cars.JSON');
  const child = spawn('node', ['./carhub.js', 'carhub', cars.JSON]);

  child.stdout.on('data', (data) => {
      expect(data.toString()).toBe('ERROR: You should introduce the option.\n Usage: carhub <options><input_file>');
      done();
  });

  child.stderr.on('data', (data) => {
      done(new Error(data.toString()));
  });
});