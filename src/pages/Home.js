import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import Footer from '../components/Footer'; // Import the Footer component
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import UserProfilesPage from '../page/UserProfilesPage/UserProfilesPage'; // Import the UserProfilesPage component


import './Home.css'; // Import CSS file for styling

const Home = () => {
   // const [users, setUsers] = useState([]);
    const [news, setNews] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //const baseURL = 'http://localhost:3000/api';
    
   

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        country: 'ng',
                        apiKey: 'e09b098eff0d49d5a4a0c3903ff75a53', // Replace with your actual API key
                    }
                });
                if (response.status === 200) {
                    setNews(response.data.articles);
                } else {
                    console.error('Failed to fetch news data');
                }
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };
        
        fetchNews();
        
       
    }, []);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

 
  
    
    
    
    
    return (
    <div className="home-container">

      {/* Navbar */}
      <nav className="navbar">
    <div className="navbar-container">
        <h1 className="navbar-logo">Dukes$Dutches</h1>
        {/* Mobile menu icon */}
        <div className="navbar-mobile-icon" onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
        {/* Regular links for desktop */}
        <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/relationship-tips">Relationship-tips</Link></li>
        </ul>
        {/* Right-aligned links for desktop */}
        <ul className="navbar-links navbar-links-right">
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    </div>
</nav>

{/* Mobile Menu Dropdown */}
<div className={`navbar-links-mobile ${isMenuOpen ? 'open' : ''}`}>
    <button className="menu-button" onClick={toggleMenu}>Menu</button>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>
</div> 
     
     
     
     
     
      {/* Hero Section with Carousel */}
      <section className="hero-section">
                <Slider
                    dots={true} // Show dots for navigation
                    infinite={true} // Enable infinite loop
                    autoplay={true} // Enable autoplay
                    autoplaySpeed={3000} // Set autoplay speed in milliseconds
                >
                    <div>
                        <div className="hero-content" style={{backgroundImage: `url('https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/431141368_1584710072312905_5630675893205957809_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=l9Tqh-2nbV8AX9kjEfM&_nc_ht=scontent-los2-1.xx&oh=00_AfAJfgq1qhc0PtE5dYa7jJ5TSQa5-pQgH2relDPPdtHSSQ&oe=65EDE316')`}}>
                        <h1>Welcome to Our Dating App</h1>
                         <p>Find Your Perfect Match Today</p>
                          <Link to="/user-profile" className="cta-button">Create Your Profile</Link>
                            {/* Hero content goes here */}
                        </div>
                    </div>
                    <div>
                        <div className="hero-content" style={{backgroundImage: `url('https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/424972151_1581326085984637_4511065845559482280_n.jpg?stp=dst-jpg_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TD134IbE_ZoAX-d45VG&_nc_ht=scontent-los2-1.xx&oh=00_AfDuZJoru9uJmFdVlNpNFoSF5PXyRlYAzly-3mUW1aJB5A&oe=65ED79A7')`}}>
                        <h1>Welcome to Our Dating App</h1>
                         <p>Find Your Perfect Match Today</p>
                          <Link to="/user-profile" className="cta-button">Create Your Profile</Link>
                            {/* Hero content goes here */}
                        </div>
                    </div>
                    <div>
                        <div className="hero-content" style={{backgroundImage: `url('https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/428622421_1580550486062197_2514201611042213047_n.jpg?stp=dst-jpg_p526x296&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Y7Bth_4f2vgAX-qnkya&_nc_oc=AQlqAP9Yho12IMCJSbaR_00uTdFa7ev9qaRaYyNYZUG-9WukcfhUyNhrDyFCDX-K6-E&_nc_ht=scontent-los2-1.xx&oh=00_AfBCtFE2O4os2iddg_j8w7MakyVQEOIQuajzYYMjq2EoqQ&oe=65ED6A4F')`}}>
                        <h1>Welcome to Our Dating App</h1>
                         <p>Find Your Perfect Match Today</p>
                          <Link to="/user-profile" className="cta-button">Create Your Profile</Link>
                            {/* Hero content goes here */}
                        </div>
                    </div>
                    <div>
                        <div className="hero-content" style={{backgroundImage: `url('https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/424890722_1578424622941450_1629852040445734649_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QtRk0zFyJ8QAX9Am3xn&_nc_ht=scontent-los2-1.xx&oh=00_AfDq39ltNYLjf6cZs3PAhrjknSDk4rq1LrBbeA-u4bEpag&oe=65EC8829')`}}>
                        <h1>Welcome to Our Dating App</h1>
                         <p>Find Your Perfect Match Today</p>
                          <Link to="/user-profile" className="cta-button">Create Your Profile</Link>
                            {/* Hero content goes here */}
                        </div>
                    </div>
                    {/* Add more slides as needed */}
                </Slider>
            </section>


      

      {/* Features Section */}
      <section className="features-section"  >
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature">
            <img src="/public/doctor-thumb-02.jpg" alt="Feature 1" />
            <h3>Advanced Matching</h3>
            <p>Our algorithm helps you find compatible matches based on your preferences.</p>
            {/* Link to the page displaying all matching data */}
          <Link to="/matching-data" className="cta-button">View All Matching Data</Link>
          </div>
        
          <div className="feature">
            <img src="/images/feature2.png" alt="Feature 2" />
            <h3>Secure Messaging</h3>
            <p>Communicate safely with your matches using our encrypted messaging system.</p>
          </div>
        
          <div className="feature">
            <img src="/images/feature3.png" alt="Feature 3" />
            <h3>Profile Verification</h3>
            <p>Verify your profile to gain trust and credibility among other users.</p>
          </div>
        </div>
      </section>



     {/* Store Section    background-image: url( https://cdn-images-1.medium.com/max/1600/1*VXIjsea952d1xAbrVtDmKg.gif     */}
     <section className="store-section"  style={{backgroundImage: `url('https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/415758068_1875403579557579_6165247134358293536_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=5Mxb5kJsLHYAX9JHcXT&_nc_ht=scontent-los2-1.xx&oh=00_AfCP8CSd5FUizwXDEG7kefT176If4BvDweBCT2en7FB-RA&oe=65E3C57B')`}}>
                <h2>Discover the Perfect Gift for Your Soulmate</h2>
                <p>Explore our store and find unique gifts that will make your soulmate feel special.</p>
                <Link to="https://we-dey-4u-4life.vercel.app/" className="store-link">Visit Our Store</Link>
            </section>


     {/* Testimonial Section */}
     <section className="testimonial-section">
  <h2>Success Stories</h2>
  <div className="testimonials-grid">
    <div className="testimonial">
      {/* Embed Facebook video */}
      <iframe width="300" height="315" src="https://www.youtube.com/embed/OlITy4J3ee4" frameBorder="0" allowFullScreen></iframe>
      <p>"I found my soulmate on this app. Thank you!"</p>
      <cite>- John Doe</cite>
    </div>
    <div className="testimonial">
      {/* Embed Instagram video */}
      <iframe src="https://www.instagram.com/p/CIumZf8Hrpf/embed/" width="300" height="315" allowFullScreen></iframe>
      <p>"Best dating app ever! Highly recommended."</p>
      <cite>- Jane Smith</cite>
    </div>
    <div className="testimonial">
      {/* Embed YouTube video */}
      <iframe width="300" height="315" src="https://www.youtube.com/embed/OlITy4J3ee4" frameBorder="0" allowFullScreen></iframe>
      <p>"Amazing experience using this app!"</p>
      <cite>- Alex Johnson</cite>
    </div>
  </div>
</section>
      

      
      {/* CTA Section */}
      <section className="cta-section" style={{backgroundImage: `url('https://i.pinimg.com/474x/16/40/b7/1640b7d3abcff711b3807a5aa8f0a49d.jpg')`}}>
        <div className="cta-content">
          <h2>Ready to Find Love?</h2>
          <p>Discover Your Soulmate Today!</p>
          <Link to="/user-profiles" className="cta-button">Meet Your Soulmate</Link>
        </div>
      </section>

       {/* Video Gallery Section */}
       <h2>Event Video Gallery</h2>
       <section className="video-gallery-section" style={{backgroundImage: `url('https://scontent-los2-1.xx.fbcdn.net/v/t1.6435-9/31253116_10209418842387791_184213204614774784_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=5UexziSQxQ4AX-H6vwa&_nc_ht=scontent-los2-1.xx&oh=00_AfC5pdovjGFdj2laKV0gmfEbdq1OwJrrK4nNb9Xf6nU9Tg&oe=660C9BC4')`}}>
                
                <Link to="/event-video-gallery" className="cta-button">Go to Video Gallery</Link>
            </section>
     


     {/* Blog Section */}
<section className="blog-section">
    <h2>Latest News</h2>
    <div className="blog-posts">
        {Array.isArray(news) && news.map(post => (
            <div className="blog-post" key={post.id}>
                <h3>{post.title}</h3>
                {post.urlToImage ? (
                    <img src={post.urlToImage} alt={post.title} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.png'; // Placeholder image path
                    }} />
                ) : (
                    <img src="/https://images.wsj.net/im-929131/social" alt="Placeholder" /> // Placeholder image path
                )}
                <p>{post.description}</p>
                {/* Include more details like author, date, etc. if available */}
                <a href={post.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
        ))}
    </div>
</section>
    
      {/* Include the Footer component */}
      <Footer />
    </div>
  );
};

export default Home;