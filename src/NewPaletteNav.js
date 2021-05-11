import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './NewPaletteForm.scss'

export default class NewPaletteNav extends Component {
  constructor(props) {
    super(props);

    this.handleClickBack = this.handleClickBack.bind(this)
  }

  handleClickBack(e) {
    e.stopPropagation();
    localStorage.removeItem('currentEdit')

    // Prompt a 'do you want to save the current palette?'
    // if no -> go back 
    // if yes -> open savePalette prompt 
  }

  render() {
    const { 
      handleOpenInput,
      showSidebar, 
      handleSidebarToggle, 
    } = this.props;

    const renderShowTool = (
      <div className="toggle-sidebar-nav" onClick={handleSidebarToggle}>
        show tool
      </div>
    )

    return (
      <nav className="NewPaletteForm__main__nav">
        <div className="NewPaletteForm__main__nav__content">
          <div className="NewPaletteForm__main__nav__content--left">
            {!showSidebar && renderShowTool} 
            <div className={`title ${showSidebar && 'show'}`}>
              create palette
            </div>
          </div>

          <div className="NewPaletteForm__main__nav__content--right">
            <button onClick={this.handleClickBack}>
              <Link to="/">
                Go Back
              </Link>
            </button>
            <button onClick={handleOpenInput}>Save Palette</button>
          </div>
        </div>
      </nav>
    )
  }
}
