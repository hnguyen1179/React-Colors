import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

import { noDelete } from "../utility/noDelete";

export default class MiniPalette extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        e.stopPropagation();

        const {
            deletePalette,
            palette: { id },
        } = this.props;

        deletePalette(id);
    }

    render() {
        const {
            palette: {
                paletteName, // String: Name of Palette 'Material UI Colors'
                emoji, // String: Assigned emoji
                colors, // String Array: colors in palette
                id, // String: Id of Palette 'material-ui-colors'
            },
        } = this.props;

        // Renders mini colorboxes in each mini palette
        const renderColors = colors.map((color) => {
            return (
                <div
                    key={color}
                    className="MiniPalette__colorboxes__colorbox"
                    style={{ background: color }}
                />
            );
        });

        return (
            <div className="MiniPalette">
                {/* Renders mini color boxes */}
                <div className="MiniPalette__colorboxes">{renderColors}</div>

                {/* Content of mini palette; name and emoji */}
                <div className="MiniPalette__bottom">
                    <h1> {paletteName} </h1>
                    <span> {emoji} </span>
                </div>

                {/* Delete button for each mini palette. noDelete checks for 
                'seed' palettes, which cannot be deleted */}
                {noDelete(id) && (
                    <button
                        className="MiniPalette__delete"
                        onClick={this.handleDelete}
                    >
                        <DeleteIcon />
                    </button>
                )}
            </div>
        );
    }
}
