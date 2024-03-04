// pages/EventVideoGalleryPage.js

import React from 'react';
import EventVideoGallery from '../components/EventVideoGallery';

const EventVideoGalleryPage = () => {
  // Define an array of video objects with id, title, and description
  const videos = [
    { id: 'bnCOyGaSe84', title: 'Video Title 1', description: 'Description for Video 1' },
    { id: 'videoId2', title: 'Video Title 2', description: 'Description for Video 2' },
    { id: 'videoId3', title: 'Video Title 3', description: 'Description for Video 3' }
  ]; // Replace with your actual video data

  return (
    <div>
      {/* Render the EventVideoGallery component with videos prop */}
      <EventVideoGallery videos={videos} />
    </div>
  );
};

export default EventVideoGalleryPage;