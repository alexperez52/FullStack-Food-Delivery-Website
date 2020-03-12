import React from "react";
import axios from "axios";
import history from "./history";
import Pizza from "../pizza.png"
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
        <div>
        <div className="PageSwitcher">
        <div>
        Search {" "}
         <input className="Add__Padding" placeholder="Search"></input>
         </div>
            <div>            <a href="login" className="PageSwitcher__Item">Sign In</a>
            <a href="registration " className="PageSwitcher__Item PageSwitcher__Item--Active">Sign Up</a>
            <a onClick={onclick} className="PageSwitcher__Item PageSwitcher__Item   ">Logout</a>
            </div>
        </div>
        
           </div>   
     
   
        
    )
}

export default Navigation;