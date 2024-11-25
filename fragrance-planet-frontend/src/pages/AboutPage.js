import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About Fragrance Planet</h1>
            <p className="about-description">
                Welcome to Fragrance Planet! We are dedicated to helping you discover your signature scent.
                Whether you're looking for a bold fragrance to make a statement or a subtle scent for everyday wear,
                we’ve got you covered.
            </p>
            <div className="about-features">
                <div className="feature">
                    <h3>Explore</h3>
                    <p>
                        Browse a wide variety of colognes from top brands. Find the perfect scent for any occasion.
                    </p>
                </div>
                <div className="feature">
                    <h3>Personalize</h3>
                    <p>
                        Get personalized fragrance recommendations based on your preferences.
                    </p>
                </div>
                <div className="feature">
                    <h3>Favorite</h3>
                    <p>
                        Save your favorite fragrances and build your collection.
                    </p>
                </div>
            </div>
            <div className="about-footer">
                
            </div>
        </div>
    );
};

export default AboutPage;
