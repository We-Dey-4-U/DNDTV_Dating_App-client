import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import UserProfilesPage from './pages/UserProfilesPage/UserProfilesPage';
import UserProfileForm from './components/UserProfile/UserProfileForm'; // Import UserProfileForm component
import MatchingDataPage from './pages/MatchingData/MatchingDataPage';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:profile_id" element={<UserProfile />} /> {/* UserProfile route */}
          <Route path="/user-profiles" element={<UserProfilesPage/>} />
          <Route path="/user-profile" element={<UserProfileForm />} /> {/* Update route to point to UserProfileForm */}
          <Route path="/matching-data" element={< MatchingDataPage />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;