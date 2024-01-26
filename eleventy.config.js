import { EleventyRenderPlugin } from "@11ty/eleventy";

export default async function(eleventyConfig) {

  eleventyConfig.addPlugin(EleventyRenderPlugin);

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