import { EleventyRenderPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { minify } from "terser";
import CleanCSS from "clean-css";

export default async function(eleventyConfig) {

  // Render Plugin
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Image Plugin
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

  // Public assets
  eleventyConfig.addPassthroughCopy({
    "./public/": "/"
  });

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

  // Minify JS
  eleventyConfig.addFilter("jsmin", async function (code) {
		try {
			const minified = await minify(code);
			return minified.code;
		} catch (err) {
			console.error("Terser error: ", err);
		}
	});

  // Minify CSS
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