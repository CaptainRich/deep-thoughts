import React from 'react';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';

// Import and integrate the Apollo Hooks
import { useQuery } from '@apollo/react-hooks';          // enabled in 'app.js' via ApolloProvider
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

// Import the authentication functionality
import Auth from '../utils/auth';



const Home = () => {

  // Determine if the user is logged in?
  const loggedIn = Auth.loggedIn();

  // Use the 'useQuery' hook to make the query request.  This is an asynchronous request.   'Loading' will
  // indicate when the request is finished, and the information will be in 'data'.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // Use object destructuring to extract `data` from the `useQuery` Hook's response and rename it 
  // to `userData` to be more descriptive.
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || [];    // use 'optional chaining' to see if the data exists
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
           </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}

      </div>
    </main>
  );
};

export default Home;
