import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RESOURCE } from '../../utils/mutations';
import { QUERY_RESOURCES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ResourceForm = () => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addResource, { error }] = useMutation(ADD_RESOURCE, {
    refetchQueries: [
      QUERY_RESOURCES,
      'getResources',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addResource({
        variables: {
          topic,
          content,
          projectAuthor: Auth.getProfile().data.username,
        },
      });

      setTopic('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'topic':
        if (value.length <= 280) {
          setTopic(value);
          setCharacterCount(value.length);
        }
        break;
      case 'content':
        setContent(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h3>Please add a topic for your Resource</h3>

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
                name="topic"
                placeholder="Resource Topic"
                value={topic}
                className="form-input w-100"
                onChange={handleChange}
              />
              <textarea
                name="content"
                placeholder="Add the resoiurce you want to share here..."
                value={content}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Resource
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

export default ResourceForm;
