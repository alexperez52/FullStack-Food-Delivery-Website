import React, { Component } from "react";
import Kitchen from "./images/stock.jpg";
import DisplayRestaurants from "../components/auth/DisplayRestaurants";
import Coding from "./images/Startup_SVG.svg";
import Grey from "./images/grey.jpg"
import Mapping from "./images/mapping.png"
import ReactSearchBox from "react-search-box";
import Axios from "axios";
import history from "./history";
import Spatula from "../components/images/spatula.png.png"
import Dialog from "./auth/Dialog";


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            id: "",
            date: new Date(),
            disclaimer: false
        };
    }

    async componentDidMount() {

        await Axios.get("/restaurants").then(res => {
            const posts = res.data;
            const newdata = [];


            for (var i = 0; i < posts.length; i++) {
                const dat = {
                    key: posts[i].id,
                    value: posts[i].restaurantName
                }
                newdata.push(dat);
            }

            this.setState({ data: newdata });
        });


    }
    goTo(e) {
        history.replace("/restaurant/" + e);
    }

    callMe() {
        setInterval(() => {
            this.setState({ date: new Date() })
        }, 1000);
    }

    register() {
        history.replace("/registration")
    }

    render() {

        return (

            <div>
                <Dialog isOpen={this.state.disclaimer}
                    onClose={e => this.setState({ disclaimer: false })}>
                    <label className="bigger-text">FAIR USE DISCLAIMER:</label>
                    <p>
                        This site contains copyrighted material the use of which has not been
                        specifically authorized by the copyright owner. We are making such
                        material available in our efforts to simulate a real delivery service
                        for educational purposes carried out by a video demo. We believe this
                        constitutes a fair use of any such copyrighted material as provided
                        for in section 107 of the US Copyright Law. In Accordance with Title
                        17 U.S.C. Section 107, the material on this is distributed without
                        profit to those who have expressed a prior interest in recieveing the
                        information for educational purposes.
                                 </p></Dialog>
                <div className="home-header">
                    <div className="d">
                        <img src={Kitchen} className="header"></img>
                        <img src={Grey} className="grey" onClick={e => this.setState({ disclaimer: true })}></img>
                        <p className="header-text">Food when you want it.</p>

                        <hr className="header-hr">
                        </hr>
                        <p className="header-par">Sign up as an Owner to put your restaurant out there or sign up as a Customer to order from your favorite restaurants or simply sign up as a driver to fullfil people's orders while getting paid! </p>

                        <button className="header-btn" onClick={e => this.register()}> Get started</button>


                        <div className="text-wrapper">
                            <div className="header-card">
                                <div className="header-card-top">
                                    <label className="timer">
                                        {this.state.date.toLocaleString()}
                                    </label>
                                </div>
                                {this.callMe()}
                                <h1 className="header-card-text">Create, Order, Deliver</h1>
                                <img src={Mapping} className="mapping"></img>
                                <div>
                                    <div className="Left__Align">
                                        <h3 className="s-r">Search for a Restaurant</h3>
                                    </div>
                                    <div className="search-size">
                                        <ReactSearchBox
                                            placeholder="Search..."
                                            data={this.state.data}
                                            callback={record => console.log(record)}
                                            value={this.state.id}
                                            onSelect={e => this.setState({ id: e.key })}

                                        />
                                        <button className="searchbtn" onClick={e => this.goTo(this.state.id)}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                    </div>
                </div>

                <div>
                    <h1 className="align-text">
                        Discover New Restaurants!
                </h1>
                    <div>
                        <DisplayRestaurants />
                        <div className="align-circles bigger-text">
                            Click below to view a catalog of all of the restaurants currently registered.

                        </div>
                        <div className="align-circles">
                            <img className="small-pic" src={Spatula}></img>
                        </div>
                        <div className="align-circles bigger-text">
                            <button
                                onClick={e => {
                                    history.replace("/restaurants")
                                }}
                                className="view-btn">View all Restaurants !</button>
                        </div>
                        <div>
                            <div className="pink-border">


                                <h1 className="align-text">
                                    About
                         </h1>
                                <img src={Coding} className="align-img" />
                                <p className="align-text">
                                    Founded and created in Suffolk County Community College.
                                    Check us out on the map!
                        </p>
                                <iframe className="map" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Ammerman%20Campus%2C%20533%20College%20Rd%2C%20Selden%2C%20NY%2011784+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"  ></iframe>
                            </div>
                        </div>
                    </div>
                </div>

            </div >


        )
    }

}