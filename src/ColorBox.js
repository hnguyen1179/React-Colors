import React, { Component } from 'react';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './ColorBox.scss';

export default class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copying: false,
    }

    this.handleCopy = this.handleCopy.bind(this);
  }

  handleCopy() {
    this.setState({ copying: true}, () => {
      setTimeout(() => {
        this.setState({ copying: false })
      }, 800)
    })
  }

  render() {
    const { colorName, nameColor, format, moreUrl, singleColorPalette = false } = this.props;
    const { copying } = this.state;
    const height = !singleColorPalette ? '25%' : '50%'

    return (
      <CopyToClipBoard text={format} onCopy={this.handleCopy}>
        <div className="ColorBox" style={{ background: format, height: height }}>
          <div className={`copy-overlay ${copying && 'show'}`} style={{ background: format }} />
          <div className={`copy-overlay-text ${copying && 'show'}`}>
            <h1>Copied</h1>
            <h4>{format}</h4>
          </div>
          <div className="copy-container">
              <div className="box-content">
                <span style={{color: nameColor}} className="name">{colorName}</span>
              </div>
            <button className="copy">copy</button>
          </div>
          {
            !singleColorPalette &&
            <Link to={moreUrl} style={{ color: nameColor }} className="more">more</Link>
          }
        </div>
      </CopyToClipBoard>
    )
  }
}