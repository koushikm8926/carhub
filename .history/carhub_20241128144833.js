// Import necessary modules
const fs = require('fs');
const os = require('os');

// Parse the command-line arguments
const args = process.argv.slice(2); // Declare args properly here
const command = args[0]; // First argument is the command (e.g., 'list')
//const inputFile = args[1]; // Second argument is the file name

if (args.length < 1) {
  console.log("ERROR: You should introduce the option.\nUsage: carhub <options><input_file>");
  process.exit(1);
}

// Step 2: Extract the input file
const inputFile = args[args.length - 1];

// Step 3: Validate the input file
if (option !== 'help' && !fs.existsSync(inputFile)) {
  console.log("ERROR: The input file could not be found or is invalid. Please introduce an input file with a valid format.");
  process.exit(1);
}


// Step 4: Handle each option
if (option === 'help') {
  console.log(`CarHub - Manage a car concessionnaire`);
  console.log(`Usage: carhub <options> <input_file>`);
  console.log(`Options:
    - help: Show this help information
    - add: Add a car
    - remove: Remove a car by ID
    - list: List all cars
    - search: Search for cars by filters
    - import: Import cars from another file
    - total: Calculate total inventory value
    - best-selling: Display top X best-selling cars
  `);
  console.log(`Operating System: ${os.platform()} ${os.release()}`);
  console.log(`Version: 1.0.0`);
  process.exit(0); // Exit the script after showing help
}

console.log("Arguments passed:", args);
console.log("Input file path:", inputFile);


// List cars in inventory
if (command === 'list') {
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


// Remove a car by ID
if (command === 'remove') {
    if (process.argv.length < 5) {
      console.log("Error: Insufficient arguments. Usage: carhub remove <id> <input_file>");
      return;
    }
  
    const id = Number(process.argv[3]);
  
    if (!fs.existsSync(inputFile)) {
      console.log(`Error: The file ${inputFile} does not exist.`);
      return;
    }
  
    const cars = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  
    // Find the car with the given ID
    const carIndex = cars.findIndex(car => car.id === id);
  
    if (carIndex === -1) {
      console.log(`Error: No car found with ID ${id}.`);
      return;
    }
  
    // Remove the car from the array
    const removedCar = cars.splice(carIndex, 1);
    console.log(`Removed car with ID ${id}:`, removedCar[0]);
  
    // Write the updated data back to the file
    fs.writeFileSync(inputFile, JSON.stringify(cars, null, 2));
    console.log("Car data updated successfully.");
  }
  


  //Marge two files new_cars.json data to cars.json file 

  if (command === 'import') {
    if (process.argv.length < 5) {
      console.log("Error: Insufficient arguments. Usage: carhub import <file_cars> <input_file>");
      return;
    }
  
    const fileCars = process.argv[3];  // New cars file
    const inputFile = process.argv[4]; // Existing cars file
  
    // Check if both files exist
    if (!fs.existsSync(fileCars)) {
      console.log(`Error: The file ${fileCars} does not exist.`);
      return;
    }
    if (!fs.existsSync(inputFile)) {
      console.log(`Error: The file ${inputFile} does not exist.`);
      return;
    }
  
    try {
      // Read both files
      const newCars = JSON.parse(fs.readFileSync(fileCars, 'utf-8'));
      const existingCars = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  
      if (!Array.isArray(newCars) || !Array.isArray(existingCars)) {
        console.log("Error: The provided files do not contain valid car data.");
        return;
      }
  
      // Merge the cars (concatenate arrays)
      const mergedCars = existingCars.concat(newCars);
  
      // Write the merged list back to the input file
      fs.writeFileSync(inputFile, JSON.stringify(mergedCars, null, 2));
      console.log("Cars imported successfully.");
    } catch (error) {
      console.log("Error reading or parsing the files:", error.message);
    }
  }
  


  if (command === 'search') {
    if (process.argv.length < 4) {
      console.log("Error: Insufficient arguments. Usage: carhub search [--model=<model>] [--brand=<brand>] [--colour=<colour>] [--price-range=<min>:<max>] input_file");
      return;
    }
  
    // Extract the input file path from the command line arguments
    const inputFile = process.argv[process.argv.length - 1];
  
    // Check if the input file exists
    if (!fs.existsSync(inputFile)) {
      console.log(`Error: The file ${inputFile} does not exist.`);
      return;
    }
  
    // Read the data from the input file
    let cars;
    try {
      cars = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    } catch (error) {
      console.log("Error reading or parsing the file:", error.message);
      return;
    }
  
    // Initialize an object to hold the search filters
    const filters = {
      model: null,
      brand: null,
      colour: null,
      priceRange: null
    };
  
    // Parse command line arguments to extract filter values
    process.argv.forEach((arg, index) => {
      if (arg.startsWith('--model=')) {
        filters.model = arg.split('=')[1];
      } else if (arg.startsWith('--brand=')) {
        filters.brand = arg.split('=')[1];
      } else if (arg.startsWith('--colour=')) {
        filters.colour = arg.split('=')[1];
      } else if (arg.startsWith('--price-range=')) {
        const range = arg.split('=')[1].split(':');
        filters.priceRange = {
          min: parseFloat(range[0]),
          max: parseFloat(range[1])
        };
      }
    });
  
    // Filter cars based on the provided search criteria
    const filteredCars = cars.filter(car => {
      // Check if car matches the filters
      const matchesModel = filters.model ? car.model.toLowerCase().includes(filters.model.toLowerCase()) : true;
      const matchesBrand = filters.brand ? car.brand.toLowerCase().includes(filters.brand.toLowerCase()) : true;
      const matchesColour = filters.colour ? car.colour.toLowerCase().includes(filters.colour.toLowerCase()) : true;
      const matchesPriceRange = filters.priceRange
        ? car.price >= filters.priceRange.min && car.price <= filters.priceRange.max
        : true;
  
      return matchesModel && matchesBrand && matchesColour && matchesPriceRange;
    });
  
    // If there are no matching results, display a message
    if (filteredCars.length === 0) {
      console.log("No cars found matching the search criteria.");
    } else {
      // Display the filtered results in a table
      console.table(filteredCars);
    }
  }

  
//total inventry value
  if (command === 'total') {
    if (process.argv.length < 4) {
      console.log("Error: Insufficient arguments. Usage: carhub total input_file");
      return;
    }
  
    // Extract the input file path
    const inputFile = process.argv[process.argv.length - 1];
  
    // Check if the input file exists
    if (!fs.existsSync(inputFile)) {
      console.log(`Error: The file ${inputFile} does not exist.`);
      return;
    }
  
    // Read the data from the input file
    let cars;
    try {
      cars = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    } catch (error) {
      console.log("Error reading or parsing the file:", error.message);
      return;
    }
  
    // Calculate the total inventory value
    const totalValue = cars.reduce((accumulator, car) => {
      return accumulator + (car.price * car.units);
    }, 0);
  
    // Display the total inventory value
    console.log(`Total inventory value: ${totalValue}€`);
  }
  
//identifies the X best-selling cars
if (command === 'best-selling') {
  if (process.argv.length < 4) {
    console.log("Error: Insufficient arguments. Usage: carhub best-selling <number of best-selling cars> input_file");
    return;
  }

  // Extract the input file path
  const inputFile = process.argv[process.argv.length - 1];
  
  // Check if the input file exists
  if (!fs.existsSync(inputFile)) {
    console.log(`Error: The file ${inputFile} does not exist.`);
    return;
  }

  // Read the data from the input file
  let cars;
  try {
    cars = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  } catch (error) {
    console.log("Error reading or parsing the file:", error.message);
    return;
  }

  const numberOfBestSellingCars = parseInt(process.argv[2]);

  // Sort the cars by the number of units sold in descending order
  const bestSellingCars = cars.sort((a, b) => b.sold - a.sold).slice(0, numberOfBestSellingCars);
  
  // Print the header
  console.log("Ranking ID Model Brand Colour UA Price US");

  // Print each car's details
  bestSellingCars.forEach((car, index) => {
    console.log(`${index + 1} ${car.id} ${car.model} ${car.brand} ${car.colour} ${car.units} ${car.price} ${car.sold}`);
  });
}