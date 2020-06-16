var _ = require('lodash');
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, object) => {
    return accumulator + object.likes
  }, 0)
}

const favoriteBlog = (blogs) => {

  const mostLikedBlog = blogs.reduce((previous, current) => {
    return previous.likes > current.likes
    ? previous
    : current
  }, 0)

  return mostLikedBlog
  ? {title: mostLikedBlog.title, author: mostLikedBlog.author, likes: mostLikedBlog.likes}
  : mostLikedBlog
}

const mostBlogs = (blogs) => {
  const authorsBlogs = _.countBy(
    blogs.map(blog => blog.author)
  )

  const authorWithMostBlogs = Object.keys(authorsBlogs).reduce((previous, current) => {
    return authorsBlogs.previous > authorsBlogs.current
    ? previous
    : current
  }, 0)

  const returnValue = {
    author: authorWithMostBlogs,
    blogs: authorsBlogs[authorWithMostBlogs]
  }
  
  if (returnValue.blogs) return returnValue
  else return 0
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const likes = blogs.map(blog => blog.likes)

  const authorsLikes = []
    
    for (let i = 0; i < authors.length; i++) {
      
      let indexOfAuthor = authorsLikes.findIndex(element => element.author === authors[i])

      if (indexOfAuthor === -1) {
        
        authorsLikes.push(({ author: authors[i], likes: likes[i]}))
      } else {
        authorsLikes[indexOfAuthor].likes += likes[i]
      }
    
    }

    const mostLikedAuthor = authorsLikes.reduce((previous, current) => {
      return previous.likes > current.likes
      ? previous
      : current
    }, 0)
  
    return mostLikedAuthor
    ? {author: mostLikedAuthor.author, likes: mostLikedAuthor.likes}
    : mostLikedAuthor
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
