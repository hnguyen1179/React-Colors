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
        // String: denotes format: hex, rgb, rgba
        const { format } = this.state;

        // Object: { str: paletteName, str: id, strArr: colors, str: emoji}
        const { palette } = this.props;

        // Renders the colorboxes
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
                {/* Navbar for SCP; includes app name and format selector */}
                <Navbar
                    singleColorPalette={true}
                    changeFormat={this.handleChangeFormat}
                />

                {/* Rendered single colors */}
                <div className="SCP__colorbox-container">
                    {renderColorBoxes}
                </div>

                {/* Footer for SCP; includes palette name and emoji */}
                <div className="SCP__footer">
                    <div>{palette.paletteName}</div>
                    <span className="emoji">{palette.emoji}</span>
                </div>
            </div>
        );
    }
}
