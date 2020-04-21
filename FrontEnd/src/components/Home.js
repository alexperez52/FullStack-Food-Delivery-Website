import React from "react";
import Header from "./Header";
import Kitchen from "./images/headerpic.jpg";

const Home = () => {
    return (
        <div>
            <div className="home-header">



                
                <div className="content-wrapper">

                    <img src={Kitchen}></img>
                    <div className="text-wrapper">
                        <div className="App_Card">
                            <h1>Create, order or Deliver</h1>
                            <h2>
                                All made easily online
                    </h2>
                            <div>
                                <div className="Left__Align">
                                    <h3>Enter Zip-Code</h3>
                                </div>
                                <input className="input-input">
                                </input>
                            </div>
                        </div>
                    </div>


                </div>
                <div>


                </div>
            </div>


        </div>


    )
}

export default Home;