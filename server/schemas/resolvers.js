const { User, Project, Resources } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('projects');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('projects');
    },
    projects: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Project.find(params).sort({ createdAt: -1 });
    },
    resources: async (parent, { username })=>{
      const params = username ? { username }: {};
      return Resources.find(params).sort({createdAt: -1 });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('projects');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addProject: async (parent, { description, title, githubRepo, contactInfo }, context) => {
      if (context.user) {
        const project = await Project.create({
          description,
          title,
          githubRepo,
          contactInfo,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: project._id } }
        );

        return project;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addResource: async (parent, { topic, content }, context) => {
      if (context.user) {
        const resources = await Resources.create({
          topic,
          content,
          resourcesAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { resources: resources._id } }
        );

        return resources;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { project: project._id } }
        );

        return project;
      }
      throw AuthenticationError;
    },
    removeResource: async (parent, { resourcesId }, context) => {
      if (context.user) {
        const resources = await Resources.findOneAndDelete({
          _id: resourcesId,
          resourcesAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { resources: resources._id } }
        );

        return resources;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
