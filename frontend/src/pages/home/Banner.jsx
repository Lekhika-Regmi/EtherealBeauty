import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/header.png"
const Banner = () => {
  return (
    <><div className="section__container header__container">
          <div className="header__content z-30">
              <h4 className="uppercase">✨ Discover Your Skin Type Instantly! ✨</h4>
              <h1>Your Journey to Perfect Skin Starts Here!</h1>
              <p>
                  "Ever wondered about your skin type? Now you don’t have to guess! With
                  our advanced AI-powered tool, simply take a photo, and let the
                  technology do the work. Understand your skin better and unlock
                  personalized skincare recommendations. Fast, accurate, and
                  effortless!"
              </p>

              <button className="btn">
                  <Link to="/webcam"> 📸 Take Photo & Identify My Skin Type</Link>
              </button>
          </div>
          <div className="header__image"> 
              <img src={bannerImg} alt="banner image" />
          </div>
      </div>
          </>

    
  );
};

export default Banner;
