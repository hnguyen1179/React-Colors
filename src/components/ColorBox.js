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
            setTimeout(() => {
                this.setState({ copying: false });
            }, 800);
        });
    }

    render() {
        const {
            nameColor,
            format,
            moreUrl,
            singleColorPalette = false,
        } = this.props;
        const { copying } = this.state;

        return (
            <CopyToClipBoard text={format} onCopy={this.handleCopy}>
                <div className="ColorBox" style={{ background: format }}>
                    <div
                        className={`copy-overlay ${copying && "show"}`}
                        style={{ background: format }}
                    />
                    <div className={`copy-overlay-text ${copying && "show"}`}>
                        <h1 style={{ color: nameColor }}>Copied</h1>
                        <h4 style={{ color: nameColor }}>{format}</h4>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span style={{ color: nameColor }} className="name">
                                {format}
                            </span>
                        </div>
                        <button className="copy">copy</button>
                    </div>
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
