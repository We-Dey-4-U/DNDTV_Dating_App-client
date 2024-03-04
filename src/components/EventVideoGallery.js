// components/EventVideoGallery.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './EventVideoGallery.css';

const EventVideoGallery = ({ videos }) => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const handleVideoClick = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
  };

  return (
    <div>
      <h2>Events Video Gallery</h2>
      {/* Video preview section */}
      {selectedVideoUrl && (
        <div className="video-preview">
          {/* Embed selected YouTube video */}
          <iframe
            width="560"
            height="315"
            src={selectedVideoUrl}
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="video-grid">
        {videos && videos.map((video) => (
          <div key={video.id} className="video-thumbnail" onClick={() => handleVideoClick(`https://www.youtube.com/embed/${video.id}`)}>
            {/* Embed YouTube video thumbnail */}
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
            <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={`Thumbnail for Video ${video.id}`} />
          </div>
        ))}
      </div>
      <div className="return-home">
                <Link to="/">Return to Homepage</Link>
            </div>
    </div>
  );
};

export default EventVideoGallery;