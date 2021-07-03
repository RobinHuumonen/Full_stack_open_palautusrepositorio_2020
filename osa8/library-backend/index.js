const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require('apollo-server')

const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!

  }
  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!          
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: (root, args) => {
      if (!args.genre) {
        return Book.find({}).populate('author') 
      } else {
        return Book.find({
          genres: args.genre
        }).populate('author') 
      }
    },
    me: (root, args, { currentUser }) => currentUser
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({
        name: root.name
      })
      return Book.find({
        author: author._id
      }).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let id
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({
        name: args.author
      })
      if (!author) {
        const author = new Author({
          name: args.author
        })
        const savedAuthor = await author.save()
        id = savedAuthor._id
      } else {
        id = author._id
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: id
      })
      return book.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({
        name: args.name
      })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        const updatedAuthor = await Author.findByIdAndUpdate(author._id, author, {
          new: true
        })
        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username })
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== process.env.PASSWORD) {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
   context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({
  url
}) => {
  console.log(`Server ready at ${url}`)
})