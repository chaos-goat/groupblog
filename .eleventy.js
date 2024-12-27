module.exports = async function(eleventyConfig) {

  / Pass throughs / 
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy("src/admin/*.*");

  / Filters /
  eleventyConfig.addFilter("getAuthor", (authors,label) => {
    let author = authors.filter(a => a.key === label)[0];
    return author;
  });
  eleventyConfig.addFilter("getPostsByAuthor", (posts,author) => {
    return posts.filter(a => a.data.author === author);
  });

  / Collections /
  eleventyConfig.addCollection("tagList", collections => {
    const tags = collections
      .getAll()
      .reduce((tags, item) => tags.concat(item.data.tags), [])
      .filter(tag => !!tag && !["posts", "all", "post"].includes(tag))
      .sort()
    return Array.from(new Set(tags)).map(tag => ({
      title: tag,
      count: collections.getFilteredByTag(tag).length,
    }))
  })
};

module.exports.config = {
  dir: {
    input: "src",
    output: "www"
  }
};