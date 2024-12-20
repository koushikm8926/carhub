const { spawn } = require('child_process');
const { expect } = require('@jest/globals');

test('TC 1', (done) => {
  const child = spawn('node', ['./carhub.js', 'carhub cars.JSON']);

  //below is currently just placeholder showing format
  child.stdout.on('data', (data) => {
      expect(data.toString()).toContain('Usage: carhub <command> [options]');
      done();
  });

  child.stderr.on('data', (data) => {
      done(new Error(data.toString()));
  });
});