import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../../utils/mutations';

const UpdateProjectForm = ({ project, updateProject }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [githubRepo, setGithubRepo] = useState(project.githubRepo);
  const [contactInfo, setContactInfo] = useState(project.contactInfo);

  const [updateProjectMutation] = useMutation(UPDATE_PROJECT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateProjectMutation({
        variables: {
          projectId: project._id,
          title,
          description,
          githubRepo,
          contactInfo,
        },
      });

      updateProject(data.updateProject); // Update projects state in Profile
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>GitHub Repo</label>
        <input
          type="text"
          value={githubRepo}
          onChange={(e) => setGithubRepo(e.target.value)}
        />
      </div>
      <div>
        <label>Contact Info</label>
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
      </div>
      <button type="submit">Update Project</button>
    </form>
  );
};

export default UpdateProjectForm;
