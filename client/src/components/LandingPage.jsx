import React from "react";
import { Link } from 'react-router-dom';
import './landingpage.css';


export default function LandingPage() {
    return (
        <div className="landingBackground">
            <div className="landing0">
                <h1 className="welcomeMsg">Welcome to Henry's Recipes!</h1>
                <h2 className="welcomeMsgExp">The cooking site with hundreds of recipes at your disposal.</h2>
                <Link style={{ textDecoration: 'none' }} to='/home' id="click">
                    <h1 className="homeButton">Go to recipes</h1>
                </Link>
            </div>
        </div>
    )
}
