import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT } from '../../utils/mutations';
import CommentList from '../CommentList';
import CommentForm from '../CommentForm'; // Import CommentForm here
import UpdateProjectForm from '../UpdateProjectForm';

const ProjectList = ({
  projects,
  title,
  showTitle = true,
  showUsername = true,
  showComment = true,
  updateProject,
  currentUser,
  showCommentForm = true, // Add this prop to control the CommentForm rendering
}) => {
  const [showUpdateForm, setShowUpdateForm] = useState({});
  const [RemoveProject] = useMutation(REMOVE_PROJECT);

  const toggleUpdateForm = (projectId) => {
    setShowUpdateForm((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };
  
  async function handleDelete(projectId) {
    await RemoveProject({ variables: { projectId } });
    // Refresh the page after delete
    window.location.reload();
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <div>
                Project Title: {project.title}
                <br />
                {showUsername && (
                  <Link className="text-light" to={`/profiles/${project.projectAuthor}`}>
                    {project.projectAuthor} <br />
                    <span style={{ fontSize: '1rem' }}>
                      Project created on: {project.createdAt}
                    </span>
                  </Link>
                )}
              </div>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{project.description}</p>
              <div>Github repo: {project.githubRepo}</div>
              <div>Contact Me: {project.contactInfo}</div>
              {project.projectAuthor === currentUser && (
                <>
                  <button
                    className="btn btn-secondary"
                    onClick={() => toggleUpdateForm(project._id)}
                  >
                    {showUpdateForm[project._id] ? 'Cancel' : 'Update Project'}
                  </button>
                  {showUpdateForm[project._id] && (
                    <UpdateProjectForm project={project} updateProject={updateProject} />
                  )}
                  <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
            {showComment && <CommentList comments={project.comments} />}
            {showCommentForm && showComment && ( // Conditionally render CommentForm
              <CommentForm projectId={project._id} />
            )}
          </div>
        ))}
    </div>
  );
};

export default ProjectList;