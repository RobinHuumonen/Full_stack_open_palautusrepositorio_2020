const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, object) => {
    return accumulator + object.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  class Blog {
    constructor(title, author, likes) {
      this.title = title;
      this.author = author;
      this.likes = likes;
    }
  }
  const mostLikes = blogs.reduce((previous, current) => {
    return previous.likes > current.likes
    ? previous
    : current
  }, 0)
  
  return mostLikes
  ? new Blog(mostLikes.title, mostLikes.author, mostLikes.likes)
  : mostLikes
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}
