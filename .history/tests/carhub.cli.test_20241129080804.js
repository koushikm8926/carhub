// const { spawn } = require('child_process');
// const { expect } = require('@jest/globals');
// const path = require('path');
// const os = require('os');

// test('TC 1', (done) => {
//   const filePath = path.resolve(__dirname, '../cars.JSON');
//   const child = spawn('node', ['carhub', filePath]);

//   child.stdout.on('data', (data) => {
//     try {
//       expect(data.toString().trim()).toBe('ERROR: You should introduce the option.\n Usage: carhub <options><input_file>');
//       done();
//     } catch (error) {
//       done(error);
//     }
//   });

//   child.on('close', (code) => {
//     if (code !== 0) {
//       done(new Error(`Process exited with code ${code}`));
//     }
//   });
// });

// test('TC 2', (done) => {
//   const filePath = path.resolve(__dirname, '../cars.JSON');
//   const child = spawn('node', ['carhub', 'a', filePath]);

//   child.stdout.on('data', (data) => {
//     try {
//       expect(data.toString().trim()).toBe('ERROR: The option introduced is invalid. Please introduce a valid option');
//       done();
//     } catch (error) {
//       done(error);
//     }
//   });

//   child.on('close', (code) => {
//     if (code !== 0) {
//       done(new Error(`Process exited with code ${code}`));
//     }
//   });
// });

// test('TC 3', (done) => {
//   const child = spawn('node', ['carhub', 'add']);

//   child.stdout.on('data', (data) => {
//     try {
//       expect(data.toString().trim()).toBe('ERROR: The file field is missing. \n Usage: carhub <options><input_file>');
//       done();
//     } catch (error) {
//       done(error);
//     }
//   });

//   child.on('close', (code) => {
//     if (code !== 0) {
//       done(new Error(`Process exited with code ${code}`));
//     }
//   });
// });

// test('TC 4', (done) => {
//   const filePath = path.resolve(__dirname, 'cars.txt');
//   const child = spawn('node', ['carhub', 'list', filePath]);

//   child.stdout.on('data', (data) => {
//     try {
//       expect(data.toString().trim()).toBe('ERROR: The input file could not be found or is invalid. Please introduce an input file with a valid format');
//       done();
//     } catch (error) {
//       done(error);
//     }
//   });

//   child.on('close', (code) => {
//     if (code !== 0) {
//       done(new Error(`Process exited with code ${code}`));
//     }
//   });
// });

// test('TC 5', (done) => {
//   const child = spawn('node', ['carhub', 'help']);

//   child.stdout.on('data', (data) => {
//     try {
//       expect(data.toString().trim()).toBe(
//       'Usage: carhub <options> <input_file>\n' +
//       'Options:\n' +
//       '    - help: Show this help information\n' +
//       '    - add: Add a car\n' +
//       '    - remove: Remove a car by ID\n' +
//       '    - list: List all cars\n' +
//       '    - search: Search for cars by filters\n' +
//       '    - import: Import cars from another file\n' +
//       '    - total: Calculate total inventory value\n' +
//       '    - best-selling: Display top X best-selling cars\n' +
//       'Operating System: win32 10.0.19045\n' +
//       'Version: 1.0.0');
//       done();
//     } catch (error) {
//       done(error);
//     }
//   });

//   child.on('close', (code) => {
//     if (code !== 0) {
//       done(new Error(`Process exited with code ${code}`));
//     }
//   });
// });

const execa = require('execa');

describe('CLI App', () => {
  const CLI_PATH = '../carhub.js'; // Path to your CLI file

  it('TC', async () => {
    const { stdout } = await execa('node', [CLI_PATH, '--help']);
    expect(stdout).toBe('Usage: cli [options]');
  });

  it('greets the user', async () => {
    const { stdout } = await execa('node', [CLI_PATH, '--greet']);
    expect(stdout).toBe('Hello, world!');
  });

  it('shows error for unknown commands', async () => {
    await expect(execa('node', [CLI_PATH, '--unknown'])).rejects.toThrow('Unknown command');
  });
});