const { spawn } = require('child_process');
const { expect } = require('@jest/globals');
const path = require('path');
const os = require('os');

test('TC 1', (done) => {
  const filePath = path.resolve(__dirname, '../cars.JSON');
  const child = spawn('node', ['./carhub.js', 'carhub', filePath]);

  child.stdout.on('data', (data) => {
    try {
      expect(data.toString().trim()).toBe('ERROR: You should introduce the option.\n Usage: carhub <options><input_file>');
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

test('TC 2', (done) => {
  const filePath = path.resolve(__dirname, '../cars.JSON');
  const child = spawn('node', ['./carhub.js', 'carhub a', filePath]);

  child.stdout.on('data', (data) => {
    try {
      expect(data.toString().trim()).toBe('ERROR: The option introduced is invalid. Please introduce a valid option');
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

test('TC 3', (done) => {
  const child = spawn('node', ['./carhub.js', 'carhub add']);

  child.stdout.on('data', (data) => {
    try {
      expect(data.toString().trim()).toBe('ERROR: The file field is missing. \n Usage: carhub <options><input_file>');
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

test('TC 4', (done) => {
  const filePath = path.resolve(__dirname, 'cars.txt');
  const child = spawn('node', ['./carhub.js', 'carhub list', filePath]);

  child.stdout.on('data', (data) => {
    try {
      expect(data.toString().trim()).toBe('ERROR: The input file could not be found or is invalid. Please introduce an input file with a valid format');
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
        \n Version: 1.0.0`);
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