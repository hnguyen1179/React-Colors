import React from 'react'
import { SortableElement } from 'react-sortable-hoc'

import { IconButton } from '@material-ui/core';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';

function DraggableColorBox({ fontColor, handleDeleteColor, color, colorName}) {

  return (
    <div className="colorbox-container">
      <div className="colorbox" style={{ backgroundColor: color }}>
          <div className={fontColor(color)}> {colorName} </div>
          <IconButton size="small" onClick={() => handleDeleteColor(colorName)}>
            <DeleteSharpIcon fontSize="small" className={fontColor(color)} />
          </IconButton>
      </div>
    </div>
  )
}

export default SortableElement(DraggableColorBox)