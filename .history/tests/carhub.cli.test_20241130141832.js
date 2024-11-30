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
    expect(stdout).toBe('ERROR: You should introduce a valid option.\n Usage: carhub <options><input_file>');
  });

  it('TC2', async () => {
    const { stdout } = await execa('node', [CLI_PATH, 'a', filePath]);
    expect(stdout).toBe('ERROR: You should introduce a valid option.\n Usage: carhub <options><input_file>');
  });

  it('TC3', async () => {
    const { stdout } = await execa('node', [CLI_PATH, 'add']);
    expect(stdout).toBe('ERROR: You should introduce a valid file. \n Usage: carhub <options><input_file>');
  });

  it('TC4', async () => {
    let wrongFile = path.resolve(__dirname, 'cars.txt');
    const { stdout } = await execa('node', [CLI_PATH, 'list', wrongFile]);
    expect(stdout).toBe('ERROR: You should introduce a valid file. \n Usage: carhub <options><input_file>');
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
    const testFilePath = path.resolve(__dirname, 'test_cars6.json');
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
    const testFilePath = path.resolve(__dirname, 'test_cars7.json');
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
    const testFilePath = path.resolve(__dirname, 'test_cars8.json');
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
    const testFilePath = path.resolve(__dirname, 'test_cars10.json');
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
    const testFilePath = path.resolve(__dirname, 'test_cars11.json');
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
    const testFilePath = path.resolve(__dirname, 'test_cars12.json');
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
    const testFilePath = path.resolve(__dirname, 'test_cars13.json');
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
    const testFilePath = path.resolve(__dirname, 'test_cars14.json');
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

  it('TC15', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars15.json');
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

  it('TC16', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars16.json');
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

  it('TC17', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars17.json');
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
    
 
    fs.unlinkSync(testFilePath);
  });

  it('TC18', async () => {
    // Step 1: Prepare a test JSON file
    const testFilePath = path.resolve(__dirname, 'test_cars18.json');
    const initialData = [{ "id": 3, "model": "ModelC", "brand": "BMW", "colour": "Black", "price": 35000, "units": 8, "sold": 2 },
      { "id": 4, "model": "ModelD", "brand": "BMW", "colour": "white", "price": 28000, "units": 6, "sold": 4 },
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
    
   
    fs.unlinkSync(testFilePath);
  });

  it('TC19', async () => {
  // Step 1: Prepare a test JSON file
  const testFilePath = path.resolve(__dirname, 'testFile19.json');
  const initialData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 5, "sold": 2 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 40000, "units": 8, "sold": 3 },
    { "id": 3, "model": "i30", "brand": "Hyundai", "colour": "green", "price": 20000, "units": 10, "sold": 5 },
    { "id": 4, "model": "i20", "brand": "Hyundai", "colour": "blue", "price": 22000, "units": 7, "sold": 3 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Step 2: Run the `search` command with the filters
  const { stdout } = await execa('node', ['carhub.js', 'search', '--model=i30', '--brand=Hyundai', '--colour=blue', '--price-range=25000:35000', testFilePath]);

  
  const tableData = [
    ['id', 'model', 'brand', 'colour', 'price', 'units', 'sold'],
    ...[{ "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 5, "sold": 2 }].map(
      car => [car.id, car.model, car.brand, car.colour, car.price, car.units, car.sold]
    )
  ];
  const expectedTable = table(tableData);

  
  expect(stdout.trim()).toBe(expectedTable.trim());

  
  fs.unlinkSync(testFilePath);
});

it('TC20', async () => {
  // Step 1: Prepare two test JSON files
  const testFilePath = path.resolve(__dirname, 'testFile20.json');
  const toAddFilePath = path.resolve(__dirname, 'toAdd20.json');

  
  const initialData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 5, "sold": 2 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 40000, "units": 8, "sold": 3 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  
  const toAddData = [
    { "id": 1, "model": "ModelA", "brand": "Toyota", "colour": "green", "price": 25000, "units": 4, "sold": 1 },
    { "id": 2, "model": "ModelB", "brand": "Nissan", "colour": "black", "price": 35000, "units": 6, "sold": 0 }
  ];
  fs.writeFileSync(toAddFilePath, JSON.stringify(toAddData, null, 2));

  // Step 2: Run the `import` command
  await execa('node', ['carhub.js', 'import', toAddFilePath, testFilePath]);

 
  const updatedData = JSON.parse(fs.readFileSync(testFilePath, 'utf-8'));

  const resultData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 5, "sold": 2 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 40000, "units": 8, "sold": 3 },
    { "id": 3, "model": "ModelA", "brand": "Toyota", "colour": "green", "price": 25000, "units": 4, "sold": 1 },
    { "id": 4, "model": "ModelB", "brand": "Nissan", "colour": "black", "price": 35000, "units": 6, "sold": 0 }
  ]
  expect(updatedData).toEqual(resultData); 
  
  toAddData.forEach(car => {
    expect(updatedData).toEqual(expect.arrayContaining([expect.objectContaining(car)]));
  });


  fs.unlinkSync(testFilePath);
  fs.unlinkSync(toAddFilePath);
});

it('TC21', async () => {
  // Step 1: Prepare two test JSON files
  const testFilePath = path.resolve(__dirname, 'testFile21.json');
  const toAddFilePath = path.resolve(__dirname, 'toAdd21.json');

  // Initial data for testFile.json
  const initialData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 5, "sold": 2 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 40000, "units": 8, "sold": 3 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Data for toAdd.json (new cars to be added)
  const toAddData = [
    { "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 3, "sold": 1 }, // Same car as in testFile.json
    { "model": "ModelA", "brand": "Toyota", "colour": "green", "price": 25000, "units": 4, "sold": 1 }
  ];
  fs.writeFileSync(toAddFilePath, JSON.stringify(toAddData, null, 2));

  // Step 2: Run the `import` command
  await execa('node', ['carhub.js', 'import', toAddFilePath, testFilePath]);

  
  const updatedData = JSON.parse(fs.readFileSync(testFilePath, 'utf-8'));


  const expectedData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 8, "sold": 3 }, // Merged car
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 40000, "units": 8, "sold": 3 },
    { "id": 3, "model": "ModelA", "brand": "Toyota", "colour": "green", "price": 25000, "units": 4, "sold": 1 }
  ];


  console.log("Expected Data:\n", JSON.stringify(expectedData, null, 2));
  console.log("\nReceived Data:\n", JSON.stringify(updatedData, null, 2));


  expect(updatedData.length).toBe(expectedData.length);

  
  expectedData.forEach(expectedCar => {
    expect(updatedData).toEqual(expect.arrayContaining([expect.objectContaining(expectedCar)]));
  });


  fs.unlinkSync(testFilePath);
  fs.unlinkSync(toAddFilePath);
});

it('TC22', async () => {
  // Step 1: Prepare two test JSON files
  const testFilePath = path.resolve(__dirname, 'testFile22.json');
  const toAddFilePath = path.resolve(__dirname, 'toAdd22.json');

  // Initial data for testFile.json (cars already populated)
  const initialData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 5, "sold": 2 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 40000, "units": 8, "sold": 3 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // toAdd.json is empty (no cars to add)
  const toAddData = [];
  fs.writeFileSync(toAddFilePath, JSON.stringify(toAddData, null, 2));

  // Step 2: Run the `import` command with an empty `toAdd.json`
  await execa('node', ['carhub.js', 'import', toAddFilePath, testFilePath]);

  
  const updatedData = JSON.parse(fs.readFileSync(testFilePath, 'utf-8'));

  
  expect(updatedData.length).toBe(initialData.length);
  expect(updatedData).toEqual(expect.arrayContaining(initialData)); 

 
  fs.unlinkSync(testFilePath);
  fs.unlinkSync(toAddFilePath);
});

it('TC23', async () => {
  // Step 1: Prepare a test JSON file
  const testFilePath = path.resolve(__dirname, 'testFile23.json');

 
  const initialData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 5, "sold": 2 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 40000, "units": 8, "sold": 3 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Step 2: Run the `import` command with only one file
  try {
    await execa('node', ['carhub.js', 'import', testFilePath]);
  } catch (error) {

    const expectedErrorMessage = 'Error: Insufficient arguments. Usage: carhub import <file_cars> <input_file>';
    expect(error.stdout).toContain(expectedErrorMessage);
  }

  fs.unlinkSync(testFilePath);
});

it('TC24', async () => {
  // Step 1: Prepare a test JSON file with cars
  const testFilePath = path.resolve(__dirname, 'testFile24.json');

  // Initial data for testFile.json (cars with multiple available units)
  const initialData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 10000, "units": 3, "sold": 2 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 5000, "units": 2, "sold": 3 },
    { "id": 3, "model": "ModelX", "brand": "Tesla", "colour": "black", "price": 10000, "units": 1, "sold": 0 }
  ];

  // Write the data to the test file
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Step 2: Run the `total` command
  const { stdout } = await execa('node', ['carhub.js', 'total', testFilePath]);


  const expectedOutput = 'Total inventory value: 50000€';
  expect(stdout.trim()).toBe(expectedOutput);


  fs.unlinkSync(testFilePath);
});

it('TC25', async () => {
  // Step 1: Prepare a test JSON file with cars that each have one unit available
  const testFilePath = path.resolve(__dirname, 'testFile25.json');
  const initialData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 5000, "units": 1, "sold": 0 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 15000, "units": 1, "sold": 0 },
    { "id": 3, "model": "i10", "brand": "Hyundai", "colour": "yellow", "price": 10000, "units": 1, "sold": 0 },
    { "id": 4, "model": "i20", "brand": "Hyundai", "colour": "green", "price": 20000, "units": 1, "sold": 0 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Step 2: Run the `total` command
  const { stdout } = await execa('node', ['carhub.js', 'total', testFilePath]);

 
  const expectedOutput = 'Total inventory value: 50000€';


  expect(stdout.trim()).toBe(expectedOutput);


  fs.unlinkSync(testFilePath);
});


it('TC26', async () => {
  // Step 1: Prepare an empty test JSON file
  const testFilePath = path.resolve(__dirname, 'testFile26.json');

  
  const initialData = [];
  
 
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Step 2: Run the `total` command
  const { stdout } = await execa('node', ['carhub.js', 'total', testFilePath]);

 
  const expectedOutput = 'Total inventory value: 0€';
  expect(stdout.trim()).toBe(expectedOutput);


  fs.unlinkSync(testFilePath);
});

it('TC27', async () => {
  // Step 1: Prepare a test JSON file
  const testFilePath = path.resolve(__dirname, 'testFile27.json');
  const initialData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 5, "sold": 2 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 40000, "units": 8, "sold": 3 },
    { "id": 3, "model": "i10", "brand": "Hyundai", "colour": "yellow", "price": 15000, "units": 10, "sold": 7 },
    { "id": 4, "model": "i20", "brand": "Hyundai", "colour": "green", "price": 25000, "units": 12, "sold": 5 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Step 2: Run the `best-selling` command
  const { stdout } = await execa('node', ['carhub.js', 'best-selling', '2', testFilePath]);

  // Step 3: Expected table data with top 2 best-selling cars
  const expectedTable = [
    ['Ranking', 'ID', 'Model', 'Brand', 'Colour', 'UA', 'Price', 'US'],
    [1, 3, 'i10', 'Hyundai', 'yellow', 10, 15000, 7],
    [2, 4, 'i20', 'Hyundai', 'green', 12, 25000, 5]
  ];

  
  const formattedExpectedTable = table(expectedTable);

 
  expect(stdout.trim()).toBe(formattedExpectedTable.trim());

  
  fs.unlinkSync(testFilePath);
});


it('TC28', async () => {
  // Step 1: Prepare a test JSON file with 4 cars
  const testFilePath = path.resolve(__dirname, 'testFile28.json');
  const initialData = [
    { "id": 1, "model": "i30", "brand": "Hyundai", "colour": "blue", "price": 30000, "units": 5, "sold": 2 },
    { "id": 2, "model": "i40", "brand": "Hyundai", "colour": "red", "price": 40000, "units": 8, "sold": 3 },
    { "id": 3, "model": "i10", "brand": "Hyundai", "colour": "yellow", "price": 15000, "units": 10, "sold": 7 },
    { "id": 4, "model": "i20", "brand": "Hyundai", "colour": "green", "price": 25000, "units": 12, "sold": 5 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Step 2: Run the `best-selling` command with a higher number (5) than cars in the file
  const { stdout } = await execa('node', ['carhub.js', 'best-selling', '5', testFilePath]);

  // Step 3: Expected table data with all 4 cars
  const expectedTable = [
    ['Ranking', 'ID', 'Model', 'Brand', 'Colour', 'UA', 'Price', 'US'],
    [1, 3, 'i10', 'Hyundai', 'yellow', 10, 15000, 7],
    [2, 4, 'i20', 'Hyundai', 'green', 12, 25000, 5],
    [3, 1, 'i30', 'Hyundai', 'blue', 5, 30000, 2],
    [4, 2, 'i40', 'Hyundai', 'red', 8, 40000, 3]
  ];

  // Format the expected output as a table
  const formattedExpectedTable = table(expectedTable);

  
  expect(stdout.trim()).toBe(formattedExpectedTable.trim());

 
  fs.unlinkSync(testFilePath);
});

it('TC29', async () => {
  // Step 1: Prepare an empty test JSON file
  const testFilePath = path.resolve(__dirname, 'testFile29.json');
  fs.writeFileSync(testFilePath, JSON.stringify([]));  // Empty file

  // Step 2: Run the `best-selling` command
  const { stdout } = await execa('node', ['carhub.js', 'best-selling', '3', testFilePath]);

  // Step 3: Verify the output contains only the headers and no entries
  const expectedOutput = `Ranking ID Model Brand Colour UA Price US
`;

  // Step 4: Check that the output matches the expected result
  expect(stdout.trim()).toBe(expectedOutput.trim());

  // Step 5: Clean up
  fs.unlinkSync(testFilePath);
});

it('TC30', async () => {
  // Step 1: Prepare a test JSON file with some data
  const testFilePath = path.resolve(__dirname, 'testFile30.json');
  const initialData = [
    { "id": 1, "model": "ModelA", "brand": "BrandA", "colour": "Red", "price": 20000, "units": 5, "sold": 2 },
    { "id": 2, "model": "ModelB", "brand": "BrandB", "colour": "Blue", "price": 25000, "units": 3, "sold": 1 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Step 2: Run the `best-selling` command with an invalid number (-1)
  const { stdout } = await execa('node', ['carhub.js', 'best-selling', '-1', testFilePath]);

  
  const expectedOutput = `Ranking ID Model Brand Colour UA Price US`;


  expect(stdout.trim()).toBe(expectedOutput.trim());


  fs.unlinkSync(testFilePath);
});

it('TC31', async () => {
  // Step 1: Prepare a test JSON file with some data
  const testFilePath = path.resolve(__dirname, 'testFile31.json');
  const initialData = [
    { "id": 1, "model": "ModelA", "brand": "BrandA", "colour": "Red", "price": 20000, "units": 5, "sold": 2 },
    { "id": 2, "model": "ModelB", "brand": "BrandB", "colour": "Blue", "price": 25000, "units": 3, "sold": 1 }
  ];
  fs.writeFileSync(testFilePath, JSON.stringify(initialData, null, 2));

  // Step 2: Run the `best-selling` command without a number
  const { stdout, stderr } = await execa('node', ['carhub.js', 'best-selling', testFilePath]);

  // Log the outputs to inspect the error message
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);

  // Step 3: Verify the error message
  const expectedErrorMessage = 'Error: Missing number of cars to display. Usage: Carhub best-selling <number> <file>';

  // Step 4: Check that the error output matches the expected result
  expect(stderr.trim()).toContain(expectedErrorMessage);

  // Step 5: Clean up
  fs.unlinkSync(testFilePath);
});


});