import React from "react";
import Header from "./Header";
import Kitchen from "./images/headerboy.jpg";
import DisplayRestaurants from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/auth/DisplayRestaurants.jsx";
import Coding from "./images/Startup_SVG.svg";

const Home = () => {


    return (
        <div>
            <div className="home-header">
                <div className="content-wrapper">
                    <img src={Kitchen} className="header"></img>
                    <div className="text-wrapper">
                        <div className="App_Card">
                            <h1>Create, order or Deliver</h1>
                            <h2> All made easily online</h2>
                            <div>
                                <div className="Left__Align">
                                    <h3>Enter Zip-Code</h3>
                                </div>
                                <input className="input-input" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div>
                <h1 className="align-text">
                    Discover Local Restaurants!
                </h1>
                <div>
                    <DisplayRestaurants />
                    <div className="content-wrapper">
                        <div className="pink-border">
                            <img src={Coding} className="align-img" />

                            <h1 className="align-text">
                                About
                         </h1>
                            <p className="align-text">
                                Founded and created in Suffolk County Community College.
                                Check us out on the map!
                        </p>
                            <iframe className="map" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=16%Craig%20St%2C%20Jericho%2C%20NY%2011753+(Ghost%20Kitchen)&amp;ie=UTF8&amp;t=&amp;z=13&amp;iwloc=B&amp;output=embed" ></iframe>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Home;
