import React, { Component } from 'react'


const GlobalContext = React.createContext();

class GlobalProvider extends Component {
    state = {
        isLoggedIn: false,
        currentUser: "",
        username: ""
    }

    setIsLoggedIn = (e) => {
        this.setState({ isLoggedIn: e })
    };

    setCurrentUser = (e) => {
        this.setState({ currentUser: e })
    };

    setUserName = (e) => {
        this.setState({ username: e })
    }

    render() {
        const { children } = this.props;
        const { isLoggedIn } = this.state;
        const { currentUser } = this.state;
        const { username } = this.state;
        const { setIsLoggedIn } = this;
        const { setCurrentUser } = this;
        const { setUserName } = this;

        return (
            <GlobalContext.Provider
                value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, username, setUserName }}
            >
                {children}
            </GlobalContext.Provider>
        );
    }
}

export default GlobalContext;
export { GlobalProvider };



