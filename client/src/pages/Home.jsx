import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import CommentList from '../components/CommentList'; // Import CommentList
import CommentForm from '../components/CommentForm'; // Import CommentForm
import { QUERY_PROJECTS } from '../utils/queries';

const Home = () => {
  const { loading: projectsLoading, data: projectsData } = useQuery(QUERY_PROJECTS);
  const projects = projectsData?.projects || [];

  // State for comments
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments data here if needed
  }, []);

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ProjectForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {projectsLoading ? (
            <div>Loading projects...</div>
          ) : (
            <>
              <ProjectList
                projects={projects}
                title="Projects"
                // Render both CommentForm and CommentList on the home page
                showCommentForm={true}
              />
              {/* Render the CommentList here */}
              {comments.length > 0 && <CommentList comments={comments} />}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;