import React from "react";
import axios from "axios";
import history from "./history";

function onclick(){
console.log("test")

    axios.post("/logout5")
    .then(response => {
        console.log("lllll");
        history.push("/");
    });
}

const Navigation = () => {
    return (
        <div className="PageSwitcher">
            <a href="login" className="PageSwitcher__Item">Sign In</a>
            <a href="registration " className="PageSwitcher__Item PageSwitcher__Item--Active">Sign Up</a>
            <a onClick={onclick} className="PageSwitcher__Item PageSwitcher__Item--Active">Logout</a>
        </div>
    )
}

export default Navigation;