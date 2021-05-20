import React, { Component } from "react";
import { Link } from "react-router-dom";

import MiniPalette from "./MiniPalette";

export default class PaletteList extends Component {

    render() {
        const { palettes, deletePalette } = this.props;

        const renderLinks = palettes.map((palette) => {
            return (
                <Link
                    key={palette.id}
                    to={`/palette/${palette.id}`}
                    className=""
                >
                    <MiniPalette palette={palette} deletePalette={deletePalette}/>
                </Link>
            );
        });

        return (
            <div className="PaletteList">
                <nav className="PaletteList__nav">
                    <div className="PaletteList__nav__content">
                        <h1 className="PaletteList__nav__content__title">
                            React Colors
                        </h1>
                        <Link
                            to="/palette/new"
                            className="PaletteList__nav__content__create"
                        >
                            <div>Create Palette</div>
                        </Link>
                    </div>
                </nav>
                <div className="PaletteList__container">
                    <div className="PaletteList__body">{renderLinks}</div>
                </div>
            </div>
        );
    }
}
