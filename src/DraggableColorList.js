import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'

import DraggableColorBox from './DraggableColorBox'

function DraggableColorList({ colors, editColor, handleDeleteColor, selectColor }) {
        
  return (
    <div className="NewPaletteForm__main__content__colorbox-container">
      {
        colors.map((color, index) => {
          return (
          <DraggableColorBox 
            key={color}
            color={color}
            index={index}
            selectColor={selectColor}
            handleDeleteColor={handleDeleteColor}
            editColor={editColor}
          />
          )
        })
      }
    </div>
  )
}

export default SortableContainer(DraggableColorList)