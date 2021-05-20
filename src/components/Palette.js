import React, { Component } from "react";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
export default class Palette extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brightness: 400,
            format: "hex",
        };

        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    // Changes the level of luminosity of the colors
    changeLevel(brightness) {
        this.setState({ brightness });
    }

    // Changes the format of the colors to be copied
    changeFormat(format) {
        this.setState({ format });
    }

    render() {
        const {
            brightness, // Integer: Evaluates to current luminosity level; default is 400 
            format // String: denotes whether hex, rgb, or rgba
        } = this.state;

        const {
            palette // Object: {str: paletteName, str: id, strArr: colors, str: emoji }
        } = this.props;

        // Renders a list of colorboxes based on the current brightness level,
        const renderColorBoxes = palette.colors[brightness].map(
            (colorObj, i) => {
                // Finds the color's 400 hex id in order to set as the defacto color id for URL
                const color400 = palette.colors[400];
                const color400Hex = color400[i].hexNoHash;

                return (
                    <ColorBox
                        key={i}
                        format={colorObj[format]}
                        nameColor={colorObj.nameColor}
                        moreUrl={`/react-colors/palette/${palette.id}/${color400Hex}`}
                    />
                );
            }
        );

        return (
            <div className="Palette">
                {/* Navbar which includes the slider and format selector */}
                <Navbar
                    brightness={brightness}
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat}
                />

                {/* Rendered color boxes */}
                <div className="Palette-colors">
                    {renderColorBoxes}
                </div>

                {/* Footer content; palette name and emoji */}
                <footer className="Palette-footer">
                    <div className="footer-text">
                        <div>{palette.paletteName}</div>
                        <span className="emoji">{palette.emoji}</span>
                    </div>
                </footer>
            </div>
        );
    }
}
