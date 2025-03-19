import { EleventyRenderPlugin } from "@11ty/eleventy";
import { minify } from "terser";
import CleanCSS from "clean-css";

export default async function(eleventyConfig) {

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Swiper.js
  eleventyConfig.addPassthroughCopy({
    "./node_modules/swiper/swiper-bundle.min.js": "/scripts/swiper.min.js"
  });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/swiper/swiper.min.css": "/css/swiper.min.css"
  });

  // Font Face Observer
  eleventyConfig.addPassthroughCopy({
    "./node_modules/fontfaceobserver/fontfaceobserver.js": "/scripts/fontfaceobserver.js"
  });

  // Public assets
  eleventyConfig.addPassthroughCopy({
		"./public/": "/"
	});

  // Minify JS
  eleventyConfig.addFilter("jsmin", async function (code) {
		try {
			const minified = await minify(code);
			return minified.code;
		} catch (err) {
			console.error("Terser error: ", err);
		}
	});

  // Minify Css
  eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

  // Return your Object options:
  return {
    dir: {
      input: "src",
      includes: "../includes",
    }
  }
}