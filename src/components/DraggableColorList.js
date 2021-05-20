import React from "react";
import { SortableContainer } from "react-sortable-hoc";

import DraggableColorBox from "./DraggableColorBox";

function DraggableColorList({
    colors, // String Array of colors in palette 
    editColor, // String of color being edited, in hex (color id)
    showSidebar, // Boolean to display sidebar
    handleDeleteColor, // Function to delete color 
    selectColor, // Function to select color to edit 
}) {
    return (
        <div className="NewPaletteForm__main__content__colorbox-container">
            {colors.map((color, index) => {
                return (
                    <DraggableColorBox
                        key={color}
                        color={color}
                        index={index}
                        showSidebar={showSidebar}
                        selectColor={selectColor}
                        handleDeleteColor={handleDeleteColor}
                        editColor={editColor}
                    />
                );
            })}
        </div>
    );
}

export default SortableContainer(DraggableColorList);
