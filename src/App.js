import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile/UserProfile';
import UserProfilesPage from './pages/UserProfilesPage/UserProfilesPage';
import UserProfileForm from './components/UserProfile/UserProfileForm'; // Import UserProfileForm component
import MatchingDataPage from './pages/MatchingData/MatchingDataPage';
import EventVideoGalleryPage from './pages/EventVideoGalleryPage';
import RelationshipTipsPage from './pages/RelationshipTipsPage';



const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/profile/:profile_id" element={<UserProfile isAuthenticated={authenticated} />} />
          <Route path="/user-profiles" element={<UserProfilesPage/>} />
          <Route path="/user-profile" element={<UserProfileForm />} /> {/* Update route to point to UserProfileForm */}
          <Route path="/matching-data" element={< MatchingDataPage />} />
          <Route path="/event-video-gallery" element={<EventVideoGalleryPage />} />
          <Route path="/relationship-tips" element={<RelationshipTipsPage />} />
         
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;