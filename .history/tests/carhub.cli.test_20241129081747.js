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
      // 'Usage: carhub <options> <input_file>\n' +
      // 'Options:\n' +
      // '    - help: Show this help information\n' +
      // '    - add: Add a car\n' +
      // '    - remove: Remove a car by ID\n' +
      // '    - list: List all cars\n' +
      // '    - search: Search for cars by filters\n' +
      // '    - import: Import cars from another file\n' +
      // '    - total: Calculate total inventory value\n' +
      // '    - best-selling: Display top X best-selling cars\n' +
      // 'Operating System: win32 10.0.19045\n' +
      // 'Version: 1.0.0');
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
const path = require('path');

describe('CLI App', () => {
  const CLI_PATH = '../carhub.js'; // Path to your CLI file
  const filePath = path.resolve(__dirname, '../cars.JSON');

  it('TC1', async () => {
    const { stdout } = await execa('node', ['carhub', filePath]);
    expect(stdout).toBe('ERROR: You should introduce the option.\n Usage: carhub <options><input_file>');
  });

  it('TC2', async () => {
    let wrongFile =
    const { stdout } = await execa('node', ['carhub', 'a', filePath]);
    expect(stdout).toBe('ERROR: The option introduced is invalid. Please introduce a valid option');
  });

  it('TC3', async () => {
    const { stdout } = await execa('node', ['carhub', 'add']);
    expect(stdout).toBe('ERROR: The file field is missing. \n Usage: carhub <options><input_file>');
  });

  it('TC4', async () => {
    const { stdout } = await execa('node', ['carhub', 'list', filePath]);
    expect(stdout).toBe('ERROR: The input file could not be found or is invalid. Please introduce an input file with a valid format');
  });

  it('TC5', async () => {
    const { stdout } = await execa('node', ['carhub', 'help']);
    expect(stdout).toBe(`CarHub - Manage a car concessionnaire\n` +
      'Usage: carhub <options> <input_file>\n' +
      'Options:\n' +
      '    - help: Show this help information\n' +
      '    - add: Add a car\n' +
      '    - remove: Remove a car by ID\n' +
      '    - list: List all cars\n' +
      '    - search: Search for cars by filters\n' +
      '    - import: Import cars from another file\n' +
      '    - total: Calculate total inventory value\n' +
      '    - best-selling: Display top X best-selling cars\n' +
      'Operating System: win32 10.0.19045\n' +
      'Version: 1.0.0');
  });

});