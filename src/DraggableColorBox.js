import React, { Component } from "react";
import { SortableElement } from "react-sortable-hoc";

import { IconButton } from "@material-ui/core";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import { fontColor } from "./ColorUtility";

class DraggableColorBox extends Component {
    constructor(props) {
        super(props);

        this.clickDelete = this.clickDelete.bind(this);
        this.clickBox = this.clickBox.bind(this);
    }

    clickBox() {
        const { selectColor, color, showSidebar } = this.props;
        if (!showSidebar) return;
        selectColor(color);
    }

    clickDelete(e) {
        const { handleDeleteColor, color } = this.props;
        e.stopPropagation();
        handleDeleteColor(color);
    }

    render() {
        const { color, editColor } = this.props;

        const renderEdit = (
            <>
                <div
                    className="draggable-colorbox--edit"
                    style={{
                        backgroundColor: editColor.color,
                    }}
                />
            </>
        );

        const editMode = editColor.edit && editColor.originalColor === color;

        return (
            <div
                className="draggable-colorbox-container"
                onClick={this.clickBox}
            >
                <div
                    className="draggable-colorbox"
                    style={{ backgroundColor: color }}
                >
                    <div
                        className={`draggable-colorbox__content ${
                            editMode && "edit"
                        }`}
                    >
                        <div style={{ color: fontColor(color) }}>{color}</div>
                        <IconButton size="small" onClick={this.clickDelete}>
                            <DeleteSharpIcon
                                fontSize="small"
                                className={"font-" + fontColor(color)}
                            />
                        </IconButton>
                    </div>

                    {editMode && renderEdit}

                    <div
                        className="draggable-colorbox--border"
                        style={{
                            transition: "border-width 150ms ease-in-out",
                            border: `${
                                editMode
                                    ? "5px solid " + fontColor(color)
                                    : "0px solid " + fontColor(color)
                            }`,
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default SortableElement(DraggableColorBox);
