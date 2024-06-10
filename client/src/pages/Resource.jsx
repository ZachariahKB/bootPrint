import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ResourceList from '../components/ResourceList';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import ResourceForm from '../components/ResourceForm';

const Resource = () => {
  const { username } = useParams();

  // Use QUERY_ME if no username is provided in URL
  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username },
  });

  // Get the user data from the query result
  const user = data?.me || data?.user || {};

  // State for resources
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (user.resources) {
      setResources(user.resources);
    }
  }, [user.resources]);

  const updateResource = (updatedResource) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource._id === updatedResource._id ? updatedResource : resource
      )
    );
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show message if no user is found
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  console.log('User:', user);
  console.log('Resources:', resources);

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {username ? `${user.username}'s` : 'your'} profile.
        </h2>
        <ResourceForm />
        <div className="col-12 col-md-10 mb-5">
          <ResourceList
            resources={resources}
            topic={`${user.username}'s resources...`}
            showTitle={true}
            // updateResources={updateResource} // Pass the function to update a resource
            currentUser={user.username}  // Pass the current logged-in user's username
          />
        </div>
      </div>
    </div>
  );
};

export default Resource;
