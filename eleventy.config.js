import { EleventyRenderPlugin } from "@11ty/eleventy";
import { minify } from "terser";

export default async function(eleventyConfig) {

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Swiper.js
  eleventyConfig.addPassthroughCopy({
    "./node_modules/swiper/swiper-bundle.min.js": "/scripts/swiper.min.js"
  });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/swiper/swiper.min.css": "/css/swiper.min.css"
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

    // Return your Object options:
    return {
      dir: {
        input: "src",
        includes: "../includes",
      }
    }
  }