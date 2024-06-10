import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from '../../utils/mutations';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries'
const CommentList = ({ projectId, comments = [] }) => {
  const [removeComment] = useMutation(REMOVE_COMMENT, {
    update(cache, { data: { removeComment } }) {
      // Read the cache for the project data
      const { project } = cache.readQuery({
        query: QUERY_SINGLE_PROJECT,
        variables: { projectId },
      });

      // Update the comments list by filtering out the removed comment
      const updatedComments = project.comments.filter(comment => comment._id !== removeComment._id);

      // Write the updated comments back to the cache
      cache.writeQuery({
        query: QUERY_SINGLE_PROJECT,
        variables: { projectId },
        data: {
          project: {
            ...project,
            comments: updatedComments,
          },
        },
      });
    },
  });

  const handleDelete = async (projectId, commentId) => {
    try {
      await removeComment({
        variables: { projectId, commentId },
      });
      // Optionally, update UI to remove the deleted comment
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3 className="p-5 display-inline-block" style={{ borderBottom: '1px dotted #1a1a1a' }}>
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments.map((comment) => (
          <div key={comment._id} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              <h5 className="card-header">
                {comment.commentAuthor} commented{' '}
                <span style={{ fontSize: '0.825rem' }}>on {comment.createdAt}</span>
              </h5>
              <p className="card-body">{comment.commentText}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(projectId, comment._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;