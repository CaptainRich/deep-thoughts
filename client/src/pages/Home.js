import React from 'react';
import ThoughtList from '../components/ThoughtList';

// Import and integrate the Apollo Hooks
import { useQuery } from '@apollo/react-hooks';          // enabled in 'app.js' via ApolloProvider
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {

    // Use the 'useQuery' hook to make the query request.  This is an asynchronous request.   'Loading' will
    // indicate when the request is finished, and the information will be in 'data'.
    const { loading, data } = useQuery(QUERY_THOUGHTS);

    const thoughts = data?.thoughts || [];    // use 'optional chaining' to see if the data exists
    console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;
