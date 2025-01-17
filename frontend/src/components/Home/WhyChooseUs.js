import React from "react";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <div className="why-choose-us-table-section">
      <div className="why-header">
        <div className="header-left">
          <h5>WHY CHOOSE US</h5>
          <h2>We Offer the Best for Your Health!</h2>
        </div>
        <div className="header-right">
          <button className="book-btn">Book an Appointment</button>
        </div>
        <hr className="thin-line" />
      </div>

      <div className="why-table">
        <div className="why-row">
          <div className="why-box">
            <div className="box-content">
              <div className="icon">
                <i className="fas fa-stethoscope"></i>
              </div>
              <div className="text-content">
                <h3>Expert Doctors</h3>
                <p>
                  Our platform connects you with highly qualified and experienced doctors to provide the best healthcare.
                </p>
              </div>
            </div>
          </div>

          <div className="why-box">
            <div className="box-content">
              <div className="icon yellow">
                <i className="fas fa-pills"></i>
              </div>
              <div className="text-content">
                <h3>Personalized Health Plans</h3>
                <p>
                  Get personalized health plans based on your unique needs and medical history.
                </p>
              </div>
            </div>
          </div>

          <div className="why-box">
            <div className="box-content">
              <div className="icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <div className="text-content">
                <h3>Predictive Health Insights</h3>
                <p>
                  Our predictive tools give you valuable insights to stay ahead of potential health issues.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="why-row">
          <div className="why-box">
            <div className="box-content">
              <div className="icon yellow">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="text-content">
                <h3>Doctor Locator</h3>
                <p>
                  Easily find doctors nearby with our advanced doctor locator tool.
                </p>
              </div>
            </div>
          </div>

          <div className="why-box">
            <div className="box-content">
              <div className="icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="text-content">
                <h3>24/7 Accessibility</h3>
                <p>
                  Access healthcare resources and consultations anytime, anywhere, ensuring your health is never out of reach.
                </p>
              </div>
            </div>
          </div>

          <div className="why-box">
            <div className="box-content">
              <div className="icon yellow">
                <i className="fas fa-users"></i>
              </div>
              <div className="text-content">
                <h3>Community Support</h3>
                <p>
                  Join a supportive community of healthcare professionals and patients to stay informed and motivated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
