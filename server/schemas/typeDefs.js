
// Import the GraphQL (gql) tagged template function
const { gql } = require('apollo-server-express');

// Create our typeDefs
const typeDefs = gql`

# Note 'friends' are also 'users'
type User {
  _id: ID
  username: String
  email: String
  friendCount: Int
  thoughts: [Thought]
  friends: [User]
}

# Note 'thoughts' are part/children of 'users'
type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }
  
  # Note 'reactions' are part/children of 'thoughts'
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }


  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]   
    thought(_id: ID!): Thought           
  }
`;




// Export the typeDefs
module.exports = typeDefs;