import React from "react";
import axios from "axios";
import UserList from "./UserList";


const LoginSuccess = () => {

    

    
    axios.get("/users").then(response => console.log(response.data));

    return (

        <div>
            <div>
                <h2 >
                    LOGIN SUCCESS!
            </h2>
                <h3>Welcome 
            </h3>
       
            <UserList />
            </div>
        </div>

    )
}


export default LoginSuccess;