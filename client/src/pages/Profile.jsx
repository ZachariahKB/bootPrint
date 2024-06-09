import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import ProjectList from '../components/ProjectList';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = () => {
  const { username } = useParams();

  // Use QUERY_ME if no username is provided in URL
  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username },
  });

  // Get the user data from the query result
  const user = data?.me || data?.user || {};

  // State for projects
  const [projects, setProjects] = useState(user.projects || []);

  useEffect(() => {
    if (user.projects) {
      setProjects(user.projects);
    }
  }, [user.projects]);

  const updateProject = (updatedProject) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project._id === updatedProject._id ? updatedProject : project
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

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {username ? `${user.username}'s` : 'your'} profile.
        </h2>
        <div className="col-12 col-md-10 mb-5">
          <ProjectList
            projects={projects}
            title={`${user.username}'s projects...`}
            showTitle={true}
            showUsername={!username}  // Only show username if viewing other profiles
            showComment={true}  // Show comments for all profiles
            updateProject={updateProject}  // Pass the function to update a project
            currentUser={user.username}  // Pass the current logged-in user's username
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
