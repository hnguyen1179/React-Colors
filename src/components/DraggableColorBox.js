import React, { Component } from "react";
import { SortableElement } from "react-sortable-hoc";

import { IconButton } from "@material-ui/core";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import { fontColor } from "../utility/ColorUtility";

class DraggableColorBox extends Component {
    constructor(props) {
        super(props);

        this.clickDelete = this.clickDelete.bind(this);
        this.clickBox = this.clickBox.bind(this);
    }

    // Selects the clicked colorbox to be edited
    clickBox() {
        const { selectColor, color, showSidebar } = this.props;

        // Will not be selected if 'sidebar' component isn't active
        if (!showSidebar) return;
        selectColor(color);
    }

    // Deletes the selected color
    clickDelete(e) {
        const { handleDeleteColor, color } = this.props;
        e.stopPropagation();
        handleDeleteColor(color);
    }

    render() {
        const { color, editColor } = this.props;

        // Previews the color to be edited to
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

        /**
         * Boolean that triggers when
         *  1. When editColor.edit is true
         *  2. When the color in the current colorbox is the current color being edited
         *
         * Every colorbox runs this check, but the preview (renderEdit)
         * will only show if the edited (selected) color === colorbox color
         *  */

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
                    {/* Colorbox content; name and delete button */}
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

                    {/* Rendering the edit color preview */}
                    {editMode && renderEdit}

                    {/* Border that visually tells which color is being edited */}
                    <div
                        className="draggable-colorbox--border"
                        style={{
                            transition: "border-width 150ms ease-in-out",
                            border: `${
                                editMode
                                    ? "max(3px, 0.4vw) solid " +
                                      fontColor(color)
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
