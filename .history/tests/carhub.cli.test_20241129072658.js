const { spawn } = require('child_process');
const { expect } = require('@jest/globals');
const path = require('path');

test('TC 1', (done) => {
  const filePath = path.resolve(__dirname, '../cars.JSON');
  const child = spawn('node', ['./carhub.js', 'carhub', filePath]);

  child.stdout.on('data', (data) => {
    expect(data.toString().trim()).toBe('ERROR: You should introduce the option.\n Usage: carhub <options><input_file>');
    done();
  });

  child.stderr.on('data', (data) => {
    done(new Error(data.toString()));
  });

  child.on('error', (error) => {
    done(new Error(error.message));
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