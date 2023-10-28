const results = require('./results.json');

// Create an empty array to store unique years
const uniqueYears = [];

// Loop through the results and collect unique years
results.forEach((result) => {
  const year = result.year;
  if (!uniqueYears.includes(year)) {
    uniqueYears.push(year);
  }
});

module.exports = uniqueYears;

