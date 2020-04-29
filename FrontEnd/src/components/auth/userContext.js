import React, { Component } from 'react'


const GlobalContext = React.createContext();

class GlobalProvider extends Component {
    state = {
        isLoggedIn: false,
        currentUser: "",
    }

    setIsLoggedIn = (e) => {
        this.setState({ isLoggedIn: e })
    };

    setCurrentUser = (e) => {
        this.setState({ currentUser: e })
    };



    render() {
        const { children } = this.props;
        const { isLoggedIn } = this.state;
        const { currentUser } = this.state;
        const { setIsLoggedIn } = this;
        const { setCurrentUser } = this;

        return (
            <GlobalContext.Provider
                value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
            >
                {children}
            </GlobalContext.Provider>
        );
    }
}

export default GlobalContext;
export { GlobalProvider };



