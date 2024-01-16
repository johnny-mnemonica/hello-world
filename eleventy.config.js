const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Return your Object options:
    return {
      dir: {
        input: "src",
        includes: "../_includes",
        
      }
    }
  }