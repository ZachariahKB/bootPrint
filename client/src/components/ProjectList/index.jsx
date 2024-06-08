import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT } from "../../utils/mutations"
import { QUERY_PROJECTS } from "../../utils/queries"
const ProjectList = ({
  projects,
  title,
  showTitle = true,
  showUsername = true,
  showComment= true
}) => {
  if (!projects.length) {
    return <h3>No Projects Yet</h3>;
  }
  const [ RemoveProject ] = useMutation(REMOVE_PROJECT, {
    refetchQueries: [QUERY_PROJECTS]
  })
  async function handleDelete(project_id){
    await RemoveProject({variables: {projectId: project_id}})
    window.location.reload()
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <div>
                  {/* Home */}
                    <div> Project Title:
                  {project.title}
                </div>
                <button className='deleteButton' onClick={() => handleDelete(project._id)}>Delete</button>
                <Link
                  className="text-light"
                  to={`/profiles/${project.projectAuthor}`}
                >
                  {project.projectAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Project created on: {project.createdAt}
                  </span>
                </Link>
                </div>
              ) : (
                <>
                {/* Profile */}
                <button className='deleteButton' onClick={() => handleDelete(project._id)}>Delete</button>
                  <div> Project Title:
                  {project.title}
                  
                  <div>
                  {project.githubRepo}
                  </div>
                  <div>
                  {project.contactInfo}
                  </div>
                </div>
                  <span style={{ fontSize: '1rem' }}>
                    You made this project on:  {project.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{project.description}</p>
            </div>
            {showComment && <Link 
              className="btn btn-primary btn-block btn-squared"
              to={`/project/${project._id}`}
            >
              Leave a comment on this project!
            </Link>}
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
