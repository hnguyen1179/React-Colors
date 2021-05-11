import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import DraggableColorBox from './DraggableColorBox'

function DraggableColorList({ colors, fontColor, handleDeleteColor }) {
        
  return (
    <div className="NewPaletteForm__main__content__colorbox-container">
      {
        colors.map(({ colorName, color }, index) => {
          return (
            <DraggableColorBox 
              index={index}
              colorName={colorName}
              color={color}
              fontColor={fontColor}
              handleDeleteColor={handleDeleteColor}
            />
          )
        })
      }
    </div>
  )
}

export default SortableContainer(DraggableColorList)