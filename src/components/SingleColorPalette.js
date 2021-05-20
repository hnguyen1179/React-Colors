import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";

export default class SingleColorPalette extends Component {
    constructor(props) {
        super(props);

        this.state = {
            format: "hex",
        };

        this.handleChangeFormat = this.handleChangeFormat.bind(this);
    }

    handleChangeFormat(format) {
        this.setState({ format });
    }

    render() {
        const { format } = this.state;
        const { palette } = this.props;

        const renderColorBoxes = palette.colors.map((colorObj, idx) => {
            return (
                <ColorBox
                    key={idx}
                    nameColor={colorObj.nameColor}
                    singleColorPalette={true}
                    format={colorObj[format]}
                />
            );
        });

        return (
            <div className="SCP">
                <Navbar
                    singleColorPalette={true}
                    changeFormat={this.handleChangeFormat}
                />
                <div className="SCP__colorbox-container">
                    {renderColorBoxes}
                </div>
                <div className="SCP__footer">
                    <div>{palette.paletteName}</div>
                    <span className="emoji">{palette.emoji}</span>
                </div>
            </div>
        );
    }
}
