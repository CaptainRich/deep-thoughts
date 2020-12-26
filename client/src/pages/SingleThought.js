import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHT } from '../utils/queries';
import ReactionList from '../components/ReactionList';


const SingleThought = props => {

  // Use the 'hook' to obtain the ID of the single thought.
  const { id: thoughtId } = useParams();

  // The second parameter to the hook (useQuery) is how variables can be passed into queries.
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }     // The 'id' property value here becomes the $id parameter in the GraphQL query
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
