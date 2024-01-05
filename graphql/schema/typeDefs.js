export const typeDefs = `#graphql
type Query {
  user (id: Int): User
  post(id: Int): Post
  users: [User]
  posts: [Post]
}

type Mutation {
  createUser (email: String!, name: String!): User
  createPost (title: String!, content: String!, authorId: Int!): Post
  createComment (text: String!, userId: Int!, postId: Int!): Comment
  updateUser (id: Int!, name: String!): User
  updatePost (id: Int!, title: String!, content: String!): Post
  updateComment (id: Int!, text: String!): Comment
  deleteUser (id: Int!): User
  deletePost (id: Int!): Post
  deleteComment (id: Int!): Comment
}

type User {
  id: Int!
  email: String
  name: String
  posts: [Post]
  comments: [Comment]
}

type Post {
  id: Int
  title: String
  content: String
  published: Boolean
  author: User
  comments: [Comment]
}

type Comment {
  id: Int
  text: String
  post: Post
  user: User
}
`