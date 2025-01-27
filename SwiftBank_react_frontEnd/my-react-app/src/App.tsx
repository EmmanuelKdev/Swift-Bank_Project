import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/parts/Navbar';
import Front_page from './components/parts/Front_page';
import Contact from './components/parts/Contact';
import About from './components/parts/About';
import Register from './components/parts/Register';
import Login from './components/parts/Login';
import UserHomepage from './components/user_parts/user_homepage';
import CreateAccount from './components/user_parts/create_account';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { setAccounts, setError, setLoading, setUser } from '@/redux/dataslice';

import { useQuery } from '@apollo/client';
import { GET_USER_BY_SESSION } from '@/graphql/queries';

import { useEffect } from 'react';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading: reduxLoading } = useAppSelector(
    (state: RootState) => state.data
  );

  // GraphQL query to fetch and verify the session
  const { loading, error, data } = useQuery(GET_USER_BY_SESSION, {
    fetchPolicy: 'network-only', // Ensures the query always checks the backend
    onCompleted: (data) => {
      dispatch(setUser(data.getUserBySessionToken)); // Store user in Redux
      dispatch(setAccounts(data.getUserBySessionToken.accounts)); // Store accounts in Redux
      dispatch(setLoading(false)); // Update loading state
      navigate('/user_homepage'); // Navigate to the user homepage
    },
    onError: (error) => {
      dispatch(setError(error.message)); // Store error in Redux
      dispatch(setLoading(false)); // Update loading state
      navigate('/'); // Redirect to login if session is invalid
    },
  });
  console.log(data);
  console.log(user)

  // Loading and error handling
  useEffect(() => {
    if (error) {
      console.error('Error verifying session:', error.message);
    }
  }, [error]);

  return (
    <div className="MainContainer">
      {/* Navbar Section */}
      <div className="NavbarContainer">
        <Navbar />
      </div>

      {/* Loading Indicator */}
      {(loading || reduxLoading) && (
        <div className="LoadingContainer">
          <p className="LoadingMessage">Verifying session...</p>
        </div>
      )}

      {/* Main Content */}
     
        <div className="ContentContainer">
          <Routes>
            <Route path="/" element={<Front_page />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user_homepage" element={<UserHomepage />} />
            <Route path="/create_account" element={<CreateAccount />} />
          </Routes>
        </div>
     
    </div>
  );
}

export default App;
