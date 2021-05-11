import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar'
import './SingleColorPalette.scss'

export default class SingleColorPalette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'hex',
    }

    this.handleChangeFormat = this.handleChangeFormat.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChangeFormat(format) {
    this.setState({ format });
  }

  handleClick() {
    this.props.renderProps.history.goBack()
  }

  render() {
    const { format } = this.state
    const { colorName, palette } = this.props 

    const renderColorBoxes = (
      palette.colors.map((colorObj, idx) => {
        return (
          <ColorBox key={idx} nameColor={colorObj.nameColor} singleColorPalette={true} name={`${colorName} ${idx * 100}`} format={colorObj[format]}/>
        )
      })
    )

    return (
      <div className="SCP">
        <Navbar singleColorPalette={true} changeFormat={this.handleChangeFormat} />
        <div className="SCP__colorbox-container">
          {renderColorBoxes}
        </div>
        <div className="SCP__footer">
          <div onClick={this.handleClick} className="SCP__footer__back"> Back </div>
          <div>{palette.paletteName}</div>
          <span className="emoji">{palette.emoji}</span>        
        </div>
      </div>
    )
  }
}
