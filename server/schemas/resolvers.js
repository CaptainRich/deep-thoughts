

// Import the models we need.
const { User, Thought } = require('../models');

// Define the resolvers that will serve the response.
const resolvers = {
    Query: {
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
      }
    }
  };
  

  module.exports = resolvers;