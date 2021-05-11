import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MiniPalette from './MiniPalette'
import './PaletteList.scss'

export default class PaletteList extends Component {

  render() {
    const { palettes, deletePalette } = this.props;
    
    const renderLinks = (
      palettes.map(palette => {
        return (
          <Link key={palette.id} to={`/palette/${palette.id}`} className="">
            <MiniPalette palette={palette} />
            <button style={{ color: 'white' }} onClick={() => deletePalette(palette.id)}> delet this </button>
          </Link>
        )
      })
    )

    return (
      <div className="PaletteList">
        <div className="PaletteList__container">
          <div className="PaletteList__header">
            <h1 className="PaletteList__header__title"> react colors </h1>
            <button style={{ color: 'white' }} onClick={() => localStorage.clear() }> refresh </button>
            <Link to="/palette/new" className="PaletteList__header__create"> Create Palette </Link>
          </div>
          <div className="PaletteList__body">
            {renderLinks}
          </div>
        </div>
      </div>
    )
  }
}
