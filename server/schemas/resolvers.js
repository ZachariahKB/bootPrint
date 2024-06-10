const { User, Project, Resources } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // Find all users with their projects
    users: async () => {
      return User.find().populate('projects');
    },
    // Find a single user and their projects
    user: async (parent, { username }, context) => {
      if (context.user) {
        if (username) {
          return User.findOne({ username }).populate('projects');
        }
        return User.findOne({ _id: context.user._id }).populate('projects');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Get all projects
    projects: async (parent, { username }) => {
      const params = username ? { username } : {};
      //TODO : I think this is where we are 
      return Project.find(params).sort({ createdAt: -1 });
    },
    // Get a single project
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },
    // Get all resources
    resources: async (parent, { topic }) => {
      const params = topic ? { topic } : {};
      return Resources.find(params).sort({ createdAt: -1 });
    },
    // Get the logged-in user's data
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('projects');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // Add a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // Log in to the application
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    // Add a project
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
      throw new AuthenticationError('You need to be logged in!');
    },
    // Add resources
    addResource: async (parent, { topic, content }, context) => {
      if (context.user) {
        const resources = await Resources.create({
          topic,
          content,
          resourceAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { resources: resources._id } }
        );

        return resources;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Add a comment to a project
    addComment: async (parent, { projectId, commentText }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Update a comment on a project
    updateComment: async (parent, { projectId, commentId, commentText }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId, "comments._id": commentId, "comments.commentAuthor": context.user.username },
          {
            $set: { "comments.$.commentText": commentText },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    //Update Project
    updateProject: async (parent, { projectId, description, title, githubRepo, contactInfo, projectAuthor }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId},
          {
            $set: { description, title, githubRepo, contactInfo, projectAuthor} ,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Update a user profile
    updateProfile: async (parent, { userId, username, email, password, jobStatus, linkedin, gitHub }, context) => {
      if (context.user && context.user._id === userId) {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { username, email, password, jobStatus, linkedin, gitHub },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Remove a project
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: project._id } }
        );

        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Remove a resource
    removeResource: async (parent, { resourcesId }, context) => {
      if (context.user) {
        const resources = await Resources.findOneAndDelete({
          _id: resourcesId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { resources: resources._id } }
        );

        return resources;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Remove a comment from a project
    removeComment: async (parent, { projectId, commentId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;