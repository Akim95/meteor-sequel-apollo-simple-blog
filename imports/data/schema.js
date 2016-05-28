const typeDefinitions = `
  type Post {
    title: String!
    text: String!
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    createPost(title: String, text: String): Post
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default [typeDefinitions];
