module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");
  
  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  });
  
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("year", (dateObj) => {
    return new Date(dateObj).getFullYear().toString();
  });

  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("links", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/links/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("digest", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/digest/*.md").sort((a, b) => a.date - b.date);
  });

  // Combined feed (posts + links) sorted by date — digest excluded
  eleventyConfig.addCollection("everything", function(collectionApi) {
    return collectionApi.getFilteredByGlob(["src/posts/*.md", "src/links/*.md"]).sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tags = new Set();
    collectionApi.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => {
        if (tag !== "post" && tag !== "link") tags.add(tag);
      });
    });
    return [...tags].sort();
  });

  return {
    pathPrefix: "/blog-site/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
