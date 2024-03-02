import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
//import UserProfilesPage from '../page/UserProfilesPage/UserProfilesPage'; // Import the UserProfilesPage component


import './Home.css'; // Import CSS file for styling

const Home = () => {
   // const [users, setUsers] = useState([]);
    const [news, setNews] = useState([]);
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
  
    
    
    
    
    return (
    <div className="home-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo">Dukes$Dutches</h1>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            {/* Add other navbar links here */}
          </ul>
          <ul className="navbar-links navbar-links-right">
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{backgroundImage: `url('https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/424972151_1581326085984637_4511065845559482280_n.jpg?stp=dst-jpg_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=lmY-M5Qvfa8AX8te8fB&_nc_ht=scontent-los2-1.xx&oh=00_AfDah9GF_YrMkZLIoimOAhbL5U4VbnKGF1Qk1LWjNIPLhg&oe=65E19C27')`}}>
      <div className="hero-content">
        <h1>Welcome to Our Dating App</h1>
        <p>Find Your Perfect Match Today</p>
        {/* Link to the UserProfilesPage */}
        <Link to="/user-profile" className="cta-button">Create Your Profile</Link>
      </div>
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
      <iframe width="300" height="315" src="https://www.youtube.com/embed/OlITy4J3ee4" frameborder="0" allowfullscreen></iframe>
      <p>"I found my soulmate on this app. Thank you!"</p>
      <cite>- John Doe</cite>
    </div>
    <div className="testimonial">
      {/* Embed Instagram video */}
      <iframe src="https://www.instagram.com/p/CIumZf8Hrpf/embed/" width="300" height="315" allowfullscreen></iframe>
      <p>"Best dating app ever! Highly recommended."</p>
      <cite>- Jane Smith</cite>
    </div>
    <div className="testimonial">
      {/* Embed YouTube video */}
      <iframe width="300" height="315" src="https://www.youtube.com/embed/OlITy4J3ee4" frameborder="0" allowfullscreen></iframe>
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

    </div>
  );
};

export default Home;