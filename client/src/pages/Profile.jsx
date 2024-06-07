import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username } = useParams(); 
  console.log("hello")
  
  console.log('username',username)

  // console.log("goodbye")

  // const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
  //   variables: { username: username },
  // });
  const { loading, data } = useQuery( QUERY_USER , {
    variables: { username: username },
  });
  console.log(data)
  const user = data?.user || {};
  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
  //   return <Navigate to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

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
          Viewing {username ? `${username}'s` : 'your'} profile.
        </h2>
        {/* Problem with being able to see a profile even if logged out */}
        <div className="col-12 col-md-10 mb-5">
          {/* <ProjectList
            projects={user.projects}
            title={`${user.username}'s projects...`}
            showTitle={false}
            showUsername={false}
          /> */}
        </div>
        {!username && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ProjectList 
            projects={user.projects}
            title={`${user.username}'s projects...`}
            showTitle={true}
            showUsername={false}
            showComment={false}
            />
          </div>
        )}
      </div>
      </div>
  );
};

export default Profile;
