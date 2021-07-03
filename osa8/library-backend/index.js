const {
    ApolloServer,
    gql
} = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
  console.log('connected to MongoDB')
  })
  .catch((error) => {
  console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql `
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
  }
`
const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allAuthors: () => Author.find({}),
        allBooks: (root, args) => {
            if (!args.genre) {
                return Book.find({})
            } else {
                return Book.find({
                    genres: args.genre
                })
            }
        }
    },
    Author: {
        bookCount: async (root) => {
            const author = await Author.findOne({ name: root.name })
            return Book.find({ author: author._id }).countDocuments()
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            let id
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
            return book.save()
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                return null
            }
            author.born = args.setBornTo
            const updatedAuthor = await Author.findByIdAndUpdate(author._id, author, { new: true })
            return updatedAuthor
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({
    url
}) => {
    console.log(`Server ready at ${url}`)
})