import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.scss';

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brightness: 400,
      format: 'hex'
    }

    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this)
  }

  changeLevel(brightness) {
    this.setState({ brightness });
  }

  changeFormat(format) {
    this.setState({ format });
  }

  render() {
    const { brightness, format } = this.state;
    const { palette } = this.props;

    const renderColorBoxes = (
      palette.colors[brightness].map((colorObj, i) => {        
        return (
          <ColorBox 
            key={i} 
            format={colorObj[format]} 
            moreUrl={`/palette/${palette.id}/${colorObj.hexNoHash}`}
          />
        )
      })
    )

    return (
      <div className="Palette">
        <Navbar 
          brightness={brightness} 
          changeLevel={this.changeLevel} 
          changeFormat={this.changeFormat} 
        />
        <div className="Palette-colors"> 
          {renderColorBoxes}
        </div> 
        <footer className="Palette-footer">
          <div className="footer-text">
            <div>{palette.paletteName}</div>
            <span className="emoji">{palette.emoji}</span>
          </div>
        </footer>
      </div>
    )
  }
}
