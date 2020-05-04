import React, { Component } from "react";
import "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/Push.css";
import Push from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/images/pushyellow.png"
import Pushing from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/images/pushpurple.png";
import Gif from "/home/alexis/Desktop/Kitchen-Delivery/FrontEnd/src/components/images/hover.gif";
import { wait } from "@testing-library/react";


export default class HoverHeader extends Component {


    constructor(props) {
        super(props);

        this.state = {
            fade: false,
            zfade: false,
            defaulta: true,
            text: false,
            labels: []
        };

        this.doSomething = this.doSomething.bind(this)

    }

    doSomething() {


    }

    render() {
        const fade = this.state.fade
        const zfade = this.state.zfade
        const text = this.state.text
        const defaulta = this.state.defaulta

        return (
            <div className="flex" onMouseLeave={() => this.setState({
                fade: false, zfade: false, text: false, defaulta: true

            })}
            >

                <div className="def" onMouseEnter={() => this.setState({ fade: true, zfade: false, defaulta: false })}
                    className={fade ? ' boom bhover' : 'def zoom'}
                    onAnimationStart={() => this.setState({ text: true })}>

                    <img src={Pushing} className="sz"></img>

                    {this.state.text &&
                        <div>
                            <h1 className="sol"> Home</h1>
                            <h1 className="sol sol1"> About</h1>
                            <h1 className="sol sol2"> More</h1>

                        </div>}



                </div>


                <div className="def" onMouseEnter={() => this.setState({ fade: false, zfade: true, text: false, defaulta: false })}
                    className={zfade ? 'zoom zhover' : ' zoom '}
                >
                    <img src={Push} className="sz"></img>
                </div>
            </div >


        )
    }
}

