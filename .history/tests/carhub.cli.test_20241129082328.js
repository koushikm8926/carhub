

const execa = require('execa');
const path = require('path');
const os = require('os');

describe('CLI App', () => {
  const CLI_PATH = '../carhub.js'; // Path to your CLI file
  const filePath = path.resolve(__dirname, '../cars.JSON');

  it('TC1', async () => {
    const { stdout } = await execa('node', ['carhub', filePath]);
    expect(stdout).toBe('ERROR: You should introduce the option.\n Usage: carhub <options><input_file>');
  });

  it('TC2', async () => {
    const { stdout } = await execa('node', ['carhub', 'a', filePath]);
    expect(stdout).toBe('ERROR: The option introduced is invalid. Please introduce a valid option');
  });

  it('TC3', async () => {
    const { stdout } = await execa('node', ['carhub', 'add']);
    expect(stdout).toBe('ERROR: The file field is missing. \n Usage: carhub <options><input_file>');
  });

  it('TC4', async () => {
    let wrongFile = path.resolve(__dirname, 'cars.txt');
    const { stdout } = await execa('node', ['carhub', 'list', wrongFile]);
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
      `Operating System: ${os.platform()} ${os.release()}\n` +
      'Version: 1.0.0');
  });

});