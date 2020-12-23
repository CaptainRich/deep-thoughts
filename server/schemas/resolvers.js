

// Import the models we need.
const { User, Thought } = require('../models');

// Define the resolvers that will serve the response.
// Below, 'params' is set to either a specified username or null.  If null, all users are returned.
const resolvers = {
  Query: {
    // Below, 'params' is set to either a specified username or null.  If null, all users are returned.
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },

    // Return a single 'though', by 'id'.
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },

    // Return all users
    users: async () => {
      return User.find()
        .select('-__v -password')            // Don't return the password or Mongoose ID
        .populate('friends')
        .populate('thoughts');
    },

    // Return a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')            // Don't return the password or Mongoose ID
        .populate('friends')
        .populate('thoughts');
    },
  }
};
  

  module.exports = resolvers;