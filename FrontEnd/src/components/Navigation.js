import React from "react";


const Navigation = () => {
    return (
        <div className="PageSwitcher">
            <a href="login" className="PageSwitcher__Item">Sign In</a>
            <a href="registration " className="PageSwitcher__Item PageSwitcher__Item--Active">Sign Up</a>
        </div>
    )
}

export default Navigation;