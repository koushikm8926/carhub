const { spawn } = require('child_process');
const { expect } = require('@jest/globals');

test('simulate command line input', (done) => {
    const child = spawn('node', ['path/to/your/cli/script.js', 'input1', 'input2']);

    child.stdout.on('data', (data) => {
        expect(data.toString()).toContain('expected output');
        done();
    });

    child.stderr.on('data', (data) => {
        done(new Error(data.toString()));
    });
});