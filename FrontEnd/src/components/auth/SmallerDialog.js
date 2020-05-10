import React, { Component } from "react";


class SmallerDialog extends Component {




    render() {
        let dialog = (
            <div className="dialogStyles1">
                <button className="dialogCloseButtonStyles1" onClick={this.props.onClose}>x</button>
                <div >
                    {this.props.children}
                </div>
            </div>
        );


        if (!this.props.isOpen) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>

        );
    }
}

export default SmallerDialog;