import React from "react";
import axios from "axios";
import history from "./history";
import {Link} from "react-router-dom";

function onclick() {
    console.log("test")

    axios.post("/logout5")
        .then(response => {
            console.log("lllll");
            history.push("/");
        });
}

const Navigation = () => {
    return (
        <div>
            <div className="PageSwitcher">
                <div>            
                    <Link to="login" className="PageSwitcher__Item">Sign In</Link>
                    <Link to="registration" className="PageSwitcher__Item PageSwitcher__Item--Active">Sign Up</Link>
                    <a onClick={onclick} className="PageSwitcher__Item PageSwitcher__Item   ">Logout</a>
                </div>
            </div>

        </div>



    )
}

export default Navigation;