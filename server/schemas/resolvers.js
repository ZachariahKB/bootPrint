const { User, Project, Resources } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    //find all the users with the projects they have
    users: async () => {
      return User.find().populate('projects');
    },
    // finding one user and the projects
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('projects');
    },
    // get all the projects
    projects: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Project.find(params).sort({ createdAt: -1 });
    },
    //get a single project
    project: async( parent, { projectId }) => {
      return Project.findOne({_id:  projectId})
    },
    // get the resources
    resources: async (parent, { topic })=>{
      const params = topic ? {  topic}: {};
      return Resources.find(params).sort({createdAt: -1 });
    },
    // TODO discus do we really need to get one resource???
    //TODO discus  geting a single 

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('projects');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    //adding a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    //loging in to the application
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
    //adding a project 
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
    //adding resources 
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
    //adding a comment to the project
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
      throw AuthenticationError;
    },
    //removing a project you created from you application
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
    //remove a resource 
    removeResource: async (parent, { resourcesId }, context) => {
      if (context.user) {
        console.log(resourcesId)
        console.log(context.user.username)
        const resources = await Resources.findOneAndDelete({

          _id: resourcesId,
          // resourcesAuthor: context.user.username,
        });
        console.log(resources)

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { resources: resources._id } }
        );

        return resources;
      }
      throw AuthenticationError;
    },
    // removing a comment
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
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
