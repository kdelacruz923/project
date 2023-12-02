import React, { useEffect } from 'react'; 
import Footer from './Footer';
import './Design.css';

const AboutUs = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <div className="about-us-content">
        <div className="about-us-section">
          <h2 className="about-us-title">Our Goal</h2>
          <p className="about-us-description">
            Welcome to our bookstore! 
            <p className="about-us-description">We strive to bring you a diverse collection of books,
            ranging from timeless classics to modern masterpieces. Our goal is to foster a
            community of readers who share a passion for discovering and discussing great stories.</p>
          </p>
        </div>

        <div className="about-us-section">
          <h2 className="about-us-title">Our Team</h2>
          <div className="team-members">
            {/* Team Member 1 */}
            <div className="team-member">
              <img src="/images/Hetvi.jpg" alt="Hetvi" className="team-member-photo" />
              <h3 className="team-member-name">Hetvi Prajapati</h3>
            </div>
            {/* Team Member 2 */}
            <div className="team-member">
              <img src="/images/Karen.jpg" alt="Karen" className="team-member-photo" />
              <h3 className="team-member-name">Karen</h3>
            </div>
            {/* Team Member 3 */}
            <div className="team-member">
              <img src="/images/Leor.jpg" alt="Leor" className="team-member-photo" />
              <h3 className="team-member-name">Leor</h3>
            </div>
            {/* Team Member 4 */}
            <div className="team-member">
              <img src="/images/Marjan.jpg" alt="Marjan" className="team-member-photo" />
              <h3 className="team-member-name">Marjan</h3>
            </div>
            {/* Team Member 5 */}
            <div className="team-member">
              <img src="/images/Shai.jpg" alt="Shai" className="team-member-photo" />
              <h3 className="team-member-name">Shai</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
