import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT} from '../../utils/mutations';
import { QUERY_PROJECTS} from '../../utils/queries';
// import ProjectForm from '../ProjectForm'; TODO: Check to see if we still need this

// , updateProject
const UpdateProjectForm = ({ project }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [githubRepo, setGithubRepo] = useState(project.githubRepo);
  const [contactInfo, setContactInfo] = useState(project.contactInfo);

  const [updateProject] = useMutation(UPDATE_PROJECT
    //TODO: Try to figure this one
    // , {update(cache, { data: { updateProject } }) {
    // cache.modify({
    //   feilds: {
    //     me(existingMeRef= {}){
    //       const updatedProjectRef= cache.writeFragment({
    //         data: updateProject,
    //         fragment: gql`
    //         _id
    //         title 
    //         description
    //         githubRepo
    //         contactInfo` 
    //       })
    //       return {
    //         ...existingMeRef, 
    //         projects: existingMeRef.projects.map((project)=> project._id === updateProject._id ? updatedProjectRef: project)
    //       }
    //     }
    //   }
    // })
  // }}
);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateProject({
        variables: {
          projectId: project._id,
          title,
          description,
          githubRepo,
          contactInfo,
        },
        // refetchQueries: [QUERY_PROJECTS],
      });

      // updateProject(data.updateProject); // Update projects state in Profile
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
