require("dotenv").config();
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const isProduction = process.env.ELEVENTY_ENV === `production`;
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter("formatDateEastern", function (dateString) {
    // Parse the input date string
    const date = DateTime.fromISO(dateString, { zone: "utc" });

    // Set the time zone to Eastern Time
    const easternDate = date.setZone("America/New_York");

    const formattedDate = easternDate.toLocaleString({
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      timeZoneName: "short", // Use "short" to get "EDT" or "EST"
    });

    return formattedDate;
  });

  // Let some files pass through to public
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/images");

  eleventyConfig.addFilter("excludeByField", (array, field, value) => {
    return array.filter(item => item[field] !== value);
  });

  eleventyConfig.addFilter("excludeByValue", (array, value) => {
    return array.filter(item => item !== value);
  });

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify HTML Output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( isProduction && outputPath && outputPath.endsWith(".html") ) {
      // Replace "/images/" with "/optim/"
      content = content.replace(/\/images\//g, '/optim/');
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
