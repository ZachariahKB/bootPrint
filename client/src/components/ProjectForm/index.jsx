import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ProjectForm = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    refetchQueries: [
      QUERY_PROJECTS,
      'getProject',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addProject({
        variables: {
          description,
          title,
          githubRepo,
          contactInfo,
          projectAuthor: Auth.getProfile().data.username,
        },
      });

      setDescription('');
      setTitle('');
      setGithubRepo('');
      setContactInfo('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'description':
        if (value.length <= 280) {
          setDescription(value);
          setCharacterCount(value.length);
        }
        break;
      case 'title':
        setTitle(value);
        break;
      case 'githubRepo':
        setGithubRepo(value);
        break;
      case 'contactInfo':
        setContactInfo(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h3>Please add a description of your project</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div className="col-12 col-lg-9">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={title}
                className="form-input w-100"
                onChange={handleChange}
              />
              <textarea
                name="description"
                placeholder="Add your project idea here..."
                value={description}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <input
                type="text"
                name="githubRepo"
                placeholder="GitHub Repository URL"
                value={githubRepo}
                className="form-input w-100"
                onChange={handleChange}
              />
              <input
                type="text"
                name="contactInfo"
                placeholder="Contact Information"
                value={contactInfo}
                className="form-input w-100"
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-lg-3" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Project
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share add a project. Please{' '}
          <Link to="/">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ProjectForm;
