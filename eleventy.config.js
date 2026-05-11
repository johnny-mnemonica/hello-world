import { EleventyRenderPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { minify } from "terser";
import CleanCSS from "clean-css";
import htmlmin from "html-minifier-terser";

export default async function(eleventyConfig) {

  //// ** ----------------------- PLUGINS ----------------------- 
  
  // * ----------- Plugin: Render [bundled w/ 11ty core]
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  
  // * ----------- Plugin: Image [@11ty/image]
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    
    formats: ["webp", "jpeg"],
    widths: [550, 800, 1000, 1200, 1600, 2000],
    
		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        sizes: '100vw',
				decoding: "async",
			},
			pictureAttributes: {}
		},
  });
  
  //// ** -----------------------  MINIFY ----------------------- 

  // * ----------- JS [terser/minify]
  eleventyConfig.addFilter("jsmin", async function (code) {
    try {
      const minified = await minify(code);
      return minified.code;
    } catch (err) {
      console.error("Terser error: ", err);
    }
  });
  
  // * ----------- CSS [clean-css/CleanCSS]
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  
  // * ----------- HTML [html-minifier-terser/htmlmin]
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
  
    // If not an HTML output, return content as-is
    return content;
  });

  //// ** -----------------------  PASSTHROUGH COPIES ----------------------- 
  // * Files copied to their appropriate output directories.

  // * ----------- Public assets 
  eleventyConfig.addPassthroughCopy({
    "./public/": "/"
  });

  // * ----------- Swiper.js [JS]
  eleventyConfig.addPassthroughCopy({
    "./node_modules/swiper/swiper-bundle.min.js": "/scripts/swiper.min.js"
  });

  // * ----------- Swiper.js [CSS]
  eleventyConfig.addPassthroughCopy({
    "./node_modules/swiper/swiper.min.css": "/css/swiper.min.css"
  });

  //* ----------- Font Face Observer
  eleventyConfig.addPassthroughCopy({
    "./node_modules/fontfaceobserver/fontfaceobserver.js": "/scripts/fontfaceobserver.js"
  });

  //// ** -----------------------  THAT'S ALL, FOLKS ----------------------- 
  // * Return your Object options:

  return {
    dir: {
      input: "src",
      includes: "../includes",
    }
  }
}