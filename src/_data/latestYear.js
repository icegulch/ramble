const results = require('./results.json');

// Find the latest year using reduce
const latestYear = results.reduce((maxYear, result) => {
  const year = parseInt(result.year, 10);
  return year > maxYear ? year : maxYear;
}, 0);

module.exports = latestYear
