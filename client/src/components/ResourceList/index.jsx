import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_RESOURCE } from '../../utils/mutations';

import UpdateResourceForm from '../UpdateProjectForm';

const ResourceList = ({
  resources,
  topic,
  showUsername = true,
  showTitle = true,
  currentUser,
}) => {
  const [showUpdateForm, setShowUpdateForm] = useState({});

  const toggleUpdateForm = (projectId) => {
    setShowUpdateForm((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };
  
  const [RemoveResource] = useMutation(REMOVE_RESOURCE, {
    update(cache, {data: {removeResource}}) {
      cache.modify({
        fields: {
          resources(existingResources = [], {readField}){
            return existingResources.filter((resource) => readField("_id", resource) !== removeResource._id)
          }
        }
      })
    }
  });

  async function handleDelete(resourceId) {
    await RemoveResource({ variables: { resourceId } });
    window.location.reload();
  }

  return (
    <div>
      {showTitle && <h3>{topic}</h3>}
      {resources &&
        resources.map((resource) => (
          <div key={resource._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <div>
                Resource Topic: {resource.topic}
                <br />
                {showUsername && (
                  <Link className="text-light" to={`/profiles/${resource.resourceAuthor}`}>
                    {resource.resourceAuthor} <br />
                    <span style={{ fontSize: '1rem' }}>
                      Resource created on: {resource.createdAt}
                    </span>
                  </Link>
                )}
              </div>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{resource.content}</p>
              {resource.resourceAuthor === currentUser && (
                <>
                  {/* <button
                    className="btn btn-secondary"
                    onClick={() => toggleUpdateForm(resource._id)}
                  >
                    {showUpdateForm[resource._id] ? 'Cancel' : 'Update resource'}
                  </button>
                  {showUpdateForm[resource._id] && (
                    <UpdateResourceForm resource={resource} updateResources={updateResources} />
                  )}
                  <button className="btn btn-danger" onClick={() => handleDelete(resource._id)}>
                    Delete
                  </button> */}
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ResourceList;