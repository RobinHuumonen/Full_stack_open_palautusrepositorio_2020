import { gql } from '@apollo/client'

/*
directive @cacheControl(
  maxAge: Int
  scope: CacheControlScope
) on FIELD_DEFINITION | OBJECT | INTERFACE

type Book {
  title: String!
  author: String!
  published: Int!
  genres: [String!]!
}

type Author {
  name: String!
  bookCount: Int!
  born: Int
}

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
}

type Mutation {
  addBook(
  title: String!
  author: String!
  published: Int!
  genres: [String!]!
  ): Book
  editAuthor(name: String!, setBornTo: Int!): Author
}

enum CacheControlScope {
  PUBLIC
  PRIVATE
}

# The `Upload` scalar type represents a file upload.
scalar Upload

      published
      genres
      author {
        name
      }
*/

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!,
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
      addBook(
        title: $title, 
        author: $author,
        published: $published,
        genres: $genres
      ) {
        title
        published
      }

  }
`

export const SET_BIRTHYEAR = gql`
  mutation editAuthor(
    $name: String!,
    $born: Int!
  ) {
      editAuthor(
        name: $name,
        setBornTo: $born
      ) {
        name
        born
      }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
query allBooks(
  $genre: String
) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const WHO_AM_I = gql`
  query {
    me {
      favoriteGenre
    }
  }
`