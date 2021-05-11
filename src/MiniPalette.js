import React from 'react'
import './MiniPalette.scss'

export default function MiniPalette(props) {
  const { paletteName, emoji, colors} = props.palette;
  const renderColors = (
    colors.map(color => {
      return <div key={color.color} className="Mini_Palette__colorboxes__colorbox" style={{ background: color.color }}/>
    })
  )

  return (
    <div className="MiniPalette">
      <div className="MiniPalette__colorboxes">
        {renderColors}
      </div>
      <div className="MiniPalette__bottom">
        <h1> {paletteName} </h1>
        <span> {emoji} </span>
      </div>
    </div>
  )
}
