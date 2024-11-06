import { EleventyRenderPlugin } from "@11ty/eleventy";

export default async function(eleventyConfig) {

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Swiper.js
  eleventyConfig.addPassthroughCopy({
    "./node_modules/swiper/swiper-bundle.min.js": "/scripts/swiper.min.js"
  });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/swiper/swiper.min.css": "/css/swiper.min.css"
  });

  eleventyConfig.addPassthroughCopy({
		"./public/": "/"
	});

    // Return your Object options:
    return {
      dir: {
        input: "src",
        includes: "../includes",
      }
    }
  }