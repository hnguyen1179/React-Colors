import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

import { noDelete } from "../utility/noDelete";

export default class MiniPalette extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        const {
            deletePalette,
            palette: { id },
        } = this.props;

        deletePalette(id);
    }

    render() {
        const {
            palette: { paletteName, emoji, colors, id },
        } = this.props;

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
                <div className="MiniPalette__colorboxes">{renderColors}</div>
                <div className="MiniPalette__bottom">
                    <h1> {paletteName} </h1>
                    <span> {emoji} </span>
                </div>
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
