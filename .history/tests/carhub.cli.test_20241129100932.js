const execa = require('execa');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { table } = require('table');


describe('CLI App', () => {
  const CLI_PATH = './carhub.js'; // Path to your CLI file
  const filePath = path.resolve(__dirname, './cars.JSON');

  it('TC1', async () => {
    const { stdout } = await execa('node', [CLI_PATH, filePath]);
    expect(stdout).toBe('ERROR: You should introduce the option.\n Usage: carhub <options><input_file>');
  });

  it('TC2', async () => {
    const { stdout } = await execa('node', [CLI_PATH, 'a', filePath]);
    expect(stdout).toBe('ERROR: The option introduced is invalid. Please introduce a valid option');
  });

  it('TC3', async () => {
    const { stdout } = await execa('node', [CLI_PATH, 'add']);
    expect(stdout).toBe('ERROR: The file field is missing. \n Usage: carhub <options><input_file>');
  });

  it('TC4', async () => {
    let wrongFile = path.resolve(__dirname, 'cars.txt');
    const { stdout } = await execa('node', [CLI_PATH, 'list', wrongFile]);
    expect(stdout).toBe('ERROR: The input file could not be found or is invalid. Please introduce an input file with a valid format');
  });

  it('TC5', async () => {
    const { stdout } = await execa('node', [CLI_PATH, 'help']);
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

  it('TC6', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [
      { "id": 3, "model": "ModelC", "brand": "BrandZ", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BrandA", "colour": "White", "price": 28000, "units": 6, "sold": 4 }
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    await execa('node', [CLI_PATH, 'add', 'Aventador', 'Lamborghini', 'yellow', '80000', '3', testFilePath]);
    
    // Step 3: Read and verify the JSON file
    const newCar = { "id": 5, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 };
    const updatedData = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(updatedData).toEqual([...initialData, newCar]);
  
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC7', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    await execa('node', [CLI_PATH, 'add', 'Aventador', 'Lamborghini', 'yellow', '80000', '3', testFilePath]);
    
    // Step 3: Read and verify the JSON file
    const newCar = { "id": 1, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 };
    const updatedData = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(updatedData).toEqual([...initialData, newCar]);
  
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC8', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [{ "id": 3, "model": "ModelC", "brand": "BrandZ", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BrandA", "colour": "White", "price": 28000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 }
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    await execa('node', [CLI_PATH, 'add', 'Aventador', 'Lamborghini', 'yellow', '80000', '3', testFilePath]);
    
    // Step 3: Read and verify the JSON file
    const updatedData = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(updatedData).toEqual([{ "id": 3, "model": "ModelC", "brand": "BrandZ", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BrandA", "colour": "White", "price": 28000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 6, "sold": 0 }
    ]);
  
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC9', async () => {
    const { stdout } = await execa('node', [CLI_PATH, 'add', 'Aventador', 'yellow', '80000', '3', filePath]);
    expect(stdout).toBe("Error: Insufficient arguments. Usage: carhub add <model> <brand> <colour> <price> <units> <input_file>");
  });

  it('TC10', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [{ "id": 3, "model": "ModelC", "brand": "BrandZ", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BrandA", "colour": "White", "price": 28000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 }
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    await execa('node', [CLI_PATH, 'remove', '3', testFilePath]);
    
    // Step 3: Read and verify the JSON file
    const updatedData = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(updatedData).toEqual([{ "id": 4, "model": "ModelD", "brand": "BrandA", "colour": "White", "price": 28000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 }
    ]);
  
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC11', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [{ "id": 3, "model": "ModelC", "brand": "BrandZ", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BrandA", "colour": "White", "price": 28000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 }
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    const { stdout } = await execa('node', [CLI_PATH, 'remove', testFilePath]);
    expect(stdout).toBe("Error: ID missing. Usage: carhub remove <id> <input_file>");
  
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC12', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [{ "id": 3, "model": "ModelC", "brand": "BrandZ", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BrandA", "colour": "White", "price": 28000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 }
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    const { stdout } = await execa('node', [CLI_PATH, 'list', testFilePath]);
    
    
    const tableData = [
      ['id', 'model', 'brand', 'colour', 'price', 'units', 'sold'],
      ...initialData.map(car => [car.id, car.model, car.brand, car.colour, car.price, car.units, car.sold])
    ];
    const expectedTable = table(tableData);
    expect(stdout.trim()).toBe(expectedTable.trim());

    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC13', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    const { stdout } = await execa('node', [CLI_PATH, 'list', testFilePath]);
    
    
    const tableData = [
      ['id', 'model', 'brand', 'colour', 'price', 'units', 'sold'],
      ...initialData.map(car => [car.id, car.model, car.brand, car.colour, car.price, car.units, car.sold])
    ];
    const expectedTable = table(tableData);
    expect(stdout.trim()).toBe(expectedTable.trim());
    
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC14', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [{ "id": 3, "model": "ModelC", "brand": "BrandZ", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BrandA", "colour": "White", "price": 28000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 },
      { "id": 7, "model": "Murcielago", "brand": "Lamborghini", "colour": "black", "price": 70000, "units": 2, "sold": 1 }
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    const { stdout } = await execa('node', [CLI_PATH, 'search', '--model=Murcielago', testFilePath]);
    
    
    const tableData = [
      ['id', 'model', 'brand', 'colour', 'price', 'units', 'sold'],
      ...[{ "id": 7, "model": "Murcielago", "brand": "Lamborghini", "colour": "black", "price": 70000, "units": 2, "sold": 1 }].map(
        car => [car.id, car.model, car.brand, car.colour, car.price, car.units, car.sold]
      )
    ];
    const expectedTable = table(tableData);
    expect(stdout.trim()).toBe(expectedTable.trim());
    
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC14', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [{ "id": 3, "model": "ModelC", "brand": "BMW", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BMW", "colour": "White", "price": 28000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 },
      { "id": 7, "model": "Murcielago", "brand": "Lamborghini", "colour": "black", "price": 70000, "units": 2, "sold": 1 }
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    const { stdout } = await execa('node', [CLI_PATH, 'search', '--brand=BMW', testFilePath]);
    
    
    const tableData = [
      ['id', 'model', 'brand', 'colour', 'price', 'units', 'sold'],
      ...[{ "id": 3, "model": "ModelC", "brand": "BMW", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
          { "id": 4, "model": "ModelD", "brand": "BMW", "colour": "White", "price": 28000, "units": 6, "sold": 4 }
        ].map(
        car => [car.id, car.model, car.brand, car.colour, car.price, car.units, car.sold]
      )
    ];
    const expectedTable = table(tableData);
    expect(stdout.trim()).toBe(expectedTable.trim());
    
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC15', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [{ "id": 3, "model": "ModelC", "brand": "BMW", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BMW", "colour": "purple", "price": 28000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 },
      { "id": 7, "model": "Murcielago", "brand": "Lamborghini", "colour": "black", "price": 70000, "units": 2, "sold": 1 }
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    const { stdout } = await execa('node', [CLI_PATH, 'search', '--colour=purple', testFilePath]);
    
    
    const tableData = [
      ['id', 'model', 'brand', 'colour', 'price', 'units', 'sold'],
      ...[{ "id": 4, "model": "ModelD", "brand": "BMW", "colour": "purple", "price": 28000, "units": 6, "sold": 4 }].map(
        car => [car.id, car.model, car.brand, car.colour, car.price, car.units, car.sold]
      )
    ];
    const expectedTable = table(tableData);
    expect(stdout.trim()).toBe(expectedTable.trim());
    
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });

  it('TC16', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars.json');
    const initialData = [{ "id": 3, "model": "ModelC", "brand": "BMW", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BMW", "colour": "purple", "price": 18000, "units": 6, "sold": 4 },
      { "id": 6, "model": "Aventador", "brand": "Lamborghini", "colour": "yellow", "price": 80000, "units": 3, "sold": 0 },
      { "id": 7, "model": "Murcielago", "brand": "Lamborghini", "colour": "black", "price": 70000, "units": 2, "sold": 1 }
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));
  
    // Step 2: Run the `add` command
    const { stdout } = await execa('node', [CLI_PATH, 'search', '--price-range=10000:20000', testFilePath]);
    
    
    const tableData = [
      ['id', 'model', 'brand', 'colour', 'price', 'units', 'sold'],
      ...[{ "id": 4, "model": "ModelD", "brand": "BMW", "colour": "purple", "price": 18000, "units": 6, "sold": 4 }].map(
        car => [car.id, car.model, car.brand, car.colour, car.price, car.units, car.sold]
      )
    ];
    const expectedTable = table(tableData);
    expect(stdout.trim()).toBe(expectedTable.trim());
    
    // Step 4: Clean up
    fs.unlinkSync(testFilePath);
  });
});