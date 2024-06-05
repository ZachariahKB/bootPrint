const db = require('../config/connection');
const { User, Project } = require('../models');
const userSeeds = require('./userSeeds.json');
const projectSeeds = require('./projectSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Project', 'projects');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < projectSeeds.length; i++) {
      const { _id, projectAuthor } = await Project.create(projectSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: projectAuthor },
        {
          $addToSet: {
            projects: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
