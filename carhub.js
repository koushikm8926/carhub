const fs = require('fs');
const os = require('os');

console.log("Starting carhub.js...");

const command = process.argv[2];
const inputFile = process.argv[process.argv.length - 1]; // The last argument is the input file
console.log("Command received:", command);

// Display help information
if (command === 'help') {
  console.log(`
    CarHub - Manage a car concessionaire
    Options:
      help               Show available commands
      list <input_file>  List all cars in inventory
      add <model> <brand> <colour> <price> <units> <input_file>  Add a new car or update units
  `);
}

// List cars in inventory
if (command === 'list') {
  if (!inputFile) {
    console.log("Error: Please provide an input file.");
    return;
  }

  if (!fs.existsSync(inputFile)) {
    console.log(`Error: The file ${inputFile} does not exist.`);
    return;
  }

  try {
    const cars = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    console.table(cars);
  } catch (error) {
    console.log("Error reading the file:", error.message);
  }
}

// Add a car or update units if it exists
if (command === 'add') {
  if (process.argv.length < 8) {
    console.log("Error: Insufficient arguments. Usage: carhub add <model> <brand> <colour> <price> <units> <input_file>");
    return;
  }

  const [model, brand, colour, price, units] = process.argv.slice(3, 8);
  const newCar = {
    model,
    brand,
    colour,
    price: Number(price),
    units: Number(units),
    sold: 0,
  };

  if (!fs.existsSync(inputFile)) {
    console.log(`Error: The file ${inputFile} does not exist.`);
    return;
  }

  const cars = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

  // Find if the car already exists
  const existingCar = cars.find(car =>
    car.model === newCar.model && 
    car.brand === newCar.brand && 
    car.colour === newCar.colour && 
    car.price === newCar.price
  );

  if (existingCar) {
    // If the car exists, increment the number of units
    existingCar.units += newCar.units;
    console.log(`Updated units for ${newCar.model} ${newCar.brand}.`);
  } else {
    // If the car does not exist, add it with a new ID
    newCar.id = cars.length ? cars[cars.length - 1].id + 1 : 1;  // Auto-generate ID
    cars.push(newCar);
    console.log(`Added new car: ${newCar.model} ${newCar.brand}.`);
  }

  // Write the updated data back to the file
  fs.writeFileSync(inputFile, JSON.stringify(cars, null, 2));
  console.log("Car data updated successfully.");
}
