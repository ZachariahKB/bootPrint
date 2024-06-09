import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECTS } from '../../utils/queries';
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';
import UpdateProjectForm from '../UpdateProjectForm';

const ProjectList = ({
  projects,
  title,
  showTitle = true,
  showUsername = true,
  showComment = true,
  updateProject,
  currentUser,
}) => {
  const [showUpdateForm, setShowUpdateForm] = useState({});

  const   toggleUpdateForm = (projectId) => {
    setShowUpdateForm((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const [RemoveProject] = useMutation(REMOVE_PROJECT, {
    refetchQueries: [QUERY_PROJECTS],
  });

  async function handleDelete(projectId) {
    await RemoveProject({ variables: { projectId } });
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
                    {showUpdateForm[project._id] ? 'Cancel' : 'Update Project '}
                  </button>
                  {showUpdateForm[project._id] && (
                    <UpdateProjectForm project={project} updateProject={updateProject} />
                  )}
                  <button className="deleteButton" onClick={() => handleDelete(project._id)}>Delete</button>
                </>
              )}
            </div>
            {showComment && (
              <>
                <CommentForm projectId={project._id} />
                <CommentList comments={project.comments} />
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
