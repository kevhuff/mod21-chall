const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },

    user: async (parent, { profileId }) => {
      const user = User.findOne({ _id: profileId });
      if (!user) {
        return;
      }

      return user;
    },
  },

  Mutation: {
    createUser: async (parent, body) => {
      const user = await User.create(body);

      if (!user) {
        return
      }

      const token = signToken(user)

      return { token, user };
    },

    login: async (parent, body) => {
      const user = await User.findOne({ $or: [{ username: body.username }, {email: body.email }] });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if(!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }

      const token = signToken(user);

      return {token, user}
    },

    saveBook: async (parent, { userId, book } ) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return;
      }

      return updatedUser
    },

    deleteBook: async (parent, params ) => {
      const updatedUser = await User.findOneAndDelete(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        return;
      }

      return updatedUser;
    }
  }
}

module.exports = resolvers;
