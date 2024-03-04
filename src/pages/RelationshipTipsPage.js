// pages/RelationshipTipsPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './RelationshipTipsPage.css';

const RelationshipTipsPage = () => {
  const [tipVisibility, setTipVisibility] = useState({});

  const toggleTip = (index) => {
    setTipVisibility({
      ...tipVisibility,
      [index]: !tipVisibility[index]
    });
  };

  return (
    <div className="relationship-tips-container" style={{backgroundImage: `url('https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/424972151_1581326085984637_4511065845559482280_n.jpg?stp=dst-jpg_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=lmY-M5Qvfa8AX8te8fB&_nc_ht=scontent-los2-1.xx&oh=00_AfDah9GF_YrMkZLIoimOAhbL5U4VbnKGF1Qk1LWjNIPLhg&oe=65E19C27')`}}>
      <h2>Relationship and Marriage Tips</h2>
      <div className="tips-container">
        <div className="tip">
          <h3 onClick={() => toggleTip(1)}>Tip 1: Communicate Openly {tipVisibility[1] ? '-' : '+'}</h3>
          {tipVisibility[1] && <p>Effective communication is key in any relationship. Make sure to express your feelings and listen to your partner.</p>}
        </div>
        <div className="tip">
          <h3 onClick={() => toggleTip(2)}>Tip 2: Spend Quality Time Together {tipVisibility[2] ? '-' : '+'}</h3>
          {tipVisibility[2] && <p>Allocate time to be with your partner and engage in activities that you both enjoy. Quality time strengthens bonds.</p>}
        </div>
        <div className="tip">
          <h3 onClick={() => toggleTip(3)}>Tip 3: Show Appreciation {tipVisibility[3] ? '-' : '+'}</h3>
          {tipVisibility[3] && <p>Don't forget to express gratitude and appreciation for your partner's efforts and qualities.</p>}
        </div>
        <div className="tip">
          <h3 onClick={() => toggleTip(3)}>Tip 4: Be Yourself: {tipVisibility[3] ? '-' : '+'}</h3>
          {tipVisibility[3] && <p>Authenticity is attractive. Don't try to be someone you're not just to impress others. Your true self is what will ultimately connect you with the right person..</p>}
        </div>
        <div className="tip">
          <h3 onClick={() => toggleTip(3)}>Tip 5: Have Realistic Expectations {tipVisibility[3] ? '-' : '+'}</h3>
          {tipVisibility[3] && <p>While it's good to have standards, it's also important to be realistic. Understand that nobody is perfect, including yourself, and be open to accepting people for who they are..</p>}
        </div>
        <div className="tip">
          <h3 onClick={() => toggleTip(3)}>Tip 3: Focus on Shared Values {tipVisibility[3] ? '-' : '+'}</h3>
          {tipVisibility[3] && <p> Look for someone who shares your core values and beliefs. This forms a strong foundation for a lasting relationship and helps ensure compatibility in the long run..</p>}
        </div>
        {/* Add more tips as needed */}
      </div>
      <div className="return-home">
                <Link to="/">Return to Homepage</Link>
            </div>
    </div>
  );
};

export default RelationshipTipsPage;