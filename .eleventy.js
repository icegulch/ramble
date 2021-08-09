const inspect = require("util").inspect;
require("dotenv").config();
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");


module.exports = function (eleventyConfig) {

  const MarkdownIt = require("markdown-it");
  const mdRender = new MarkdownIt();
  eleventyConfig.addFilter("renderUsingMarkdown", function(rawString) {
    return mdRender.render(rawString);
  });

  // Watch for sass file changes
  eleventyConfig.addWatchTarget("./src/sass/");

  // Let some files pass through to public
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/_redirects");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy('./src/admin/**');
  eleventyConfig.addPassthroughCopy('./src/admin/config.yml');
  eleventyConfig.addPassthroughCopy('./src/admin/index.html');
  eleventyConfig.addPassthroughCopy('./src/admin/confirmation.html');
  eleventyConfig.addPassthroughCopy('./src/admin/email-change.html');
  eleventyConfig.addPassthroughCopy('./src/admin/invitation.html');
  eleventyConfig.addPassthroughCopy('./src/admin/recovery.html');

  // Allow for inspection
  eleventyConfig.addFilter("debug", (content) => `${inspect(content)}`);

  // Helper to sort pages collection by frontmatter "order"
  eleventyConfig.addCollection("orderedPages", function (collection) {
    return collection.getFilteredByTag("pages").sort((a, b) => {
      return a.data.order - b.data.order;
    });
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify HTML Output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith(".html") ) {
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
    addPassthroughCopy: true,
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
    },
  };
};
