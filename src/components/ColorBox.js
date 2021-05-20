import React, { Component } from "react";
import CopyToClipBoard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

export default class ColorBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            copying: false,
        };

        this.handleCopy = this.handleCopy.bind(this);
    }

    handleCopy() {
        this.setState({ copying: true }, () => {
            // setTimeout required to time this right after ballooning effect
            setTimeout(() => {
                this.setState({ copying: false });
            }, 800);
        });
    }

    render() {
        const {
            nameColor, // Contrast font color
            format, // Color hex, rgb, or rgba
            moreUrl, // 400 color hex code (color's id)
            singleColorPalette = false, // Display as SCP?
        } = this.props;

        // Boolean to trigger copying animation and action
        const { copying } = this.state;

        return (
            <CopyToClipBoard text={format} onCopy={this.handleCopy}>
                <div className="ColorBox" style={{ background: format }}>
                    {/* Copy animation, color ballooning effect */}
                    <div
                        className={`copy-overlay ${copying && "show"}`}
                        style={{ background: format }}
                    />

                    {/* Copy animation, hidden and triggered with copying boolean */}
                    <div className={`copy-overlay-text ${copying && "show"}`}>
                        <h1 style={{ color: nameColor }}>Copied</h1>
                        <h4 style={{ color: nameColor }}>{format}</h4>
                    </div>

                    {/* Box's content; color name in desired format */}
                    <div className="copy-container">
                        <div className="box-content">
                            <span style={{ color: nameColor }} className="name">
                                {format}
                            </span>
                        </div>
                        <button className="copy">copy</button>
                    </div>

                    {/* Box's content; 'more' button */}
                    {/* SCP does not have a 'more' button */}
                    {!singleColorPalette && (
                        <Link
                            to={moreUrl}
                            style={{ color: nameColor }}
                            className="more"
                        >
                            <div>more</div>
                        </Link>
                    )}
                </div>
            </CopyToClipBoard>
        );
    }
}
