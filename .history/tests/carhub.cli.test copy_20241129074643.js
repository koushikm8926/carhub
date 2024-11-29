const { spawn } = require('child_process');
const { expect } = require('@jest/globals');
const path = require('path');
const os = require('os');

test('TC 5', (done) => {
  const child = spawn('node', ['./carhub.js', 'carhub help']);

  child.stdout.on('data', (data) => {
    try {
      expect(data.toString().trim()).toBe(`CarHub - Manage a car concessionnaire
        Usage: carhub <options> <input_file>
        Options:
        - help: Show this help information
        - add: Add a car
        - remove: Remove a car by ID
        - list: List all cars
        - search: Search for cars by filters
        - import: Import cars from another file
        - total: Calculate total inventory value
        - best-selling: Display top X best-selling cars
        Operating System: ${os.platform()} ${os.release()}
        Version: 1.0.0`);
      done();
    } catch (error) {
      done(error);
    }
  });

  child.on('close', (code) => {
    if (code !== 0) {
      done(new Error(`Process exited with code ${code}`));
    }
  });
});