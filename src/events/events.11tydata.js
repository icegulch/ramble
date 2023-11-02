const slugify = require("slugify");

module.exports = {
  layout: "layouts/event.liquid",
  eleventyComputed: {
    permalink: data => (data.results.length > 0 ? '/results/' + slugify(data.edition) + '/index.html' : false),
    title: data => data.edition + " Results" || "Untitled Edition Results",
    eventWithResults: data => data.results && data.results.length > 0,
  },
};
