import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import { debounce } from 'lodash'
import colorNames from './cssColorNames'
import chroma from 'chroma-js'
import './NewPaletteForm.scss'

export default class NewPaletteSidebar extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      colorForm: {
        color: '#ffffff',
      },
      colorFormErrors: {
        colorError: '',
        colorPaletteError: ''
      }
    }

    this.handleOnChange = debounce(this.handleOnChange.bind(this), 2)
    this.handleAddColor = this.handleAddColor.bind(this)
    this.handleRandomColor = this.handleRandomColor.bind(this)
  }

  // Saves into localStorage the currentEdit
  componentDidUpdate(prevProps) {
    if (this.props.paletteColors.length !== prevProps.paletteColors.length) {
      const stringy = JSON.stringify(this.props.paletteColors);
      localStorage.setItem('currentEdit', stringy);
    }
  }

  // UTILITY FUNCTIONS
  resetErrors() {
    this.setState(previous => {
      return {
        ...previous,
        colorFormErrors: {
          colorNameError: '',
          color: ''
        }
      }
    })
  }

  resetForm() {
    this.setState(previous => {
      return {
        ...previous,
        colorForm: {
          color: previous.colorForm.color,
          colorName: ''
        }
      }
    })
  }

  // Error Checker for adding colors 
  isValid(options = { randomColor: false }) {
    const { paletteColors } = this.props;
    const { color } = this.state.colorForm;

    let colorError = ''
    let colorPaletteError = ''
    
    const fullPalette = paletteColors.length === 20
    
    if (fullPalette) {
      colorPaletteError = 'Palette is full'
    }
    
    if (options.randomColor) {
      if (fullPalette) {
        this.setState({ 
          colorFormErrors: {
            colorPaletteError
          }
        })
        
        return false
      }
      
      return true
    }
    
    const duplicateColor = paletteColors.some(colorObj => colorObj.color === color)

    if (duplicateColor) {
      colorError = (
        <div className='color-error'>
          Cannot have duplicate color: <div style={{ backgroundColor: color, border: '1px solid rgba(0, 0, 0, 0.212)' }}/>
        </div>
      )
    }

    if ([fullPalette, duplicateColor].some(x => x === true)) {
      this.setState({ 
        colorFormErrors: {
          colorError,
          colorPaletteError
        }
      })

      return false
    }

    return true
  }

  // EVENT HANDLERS
  handleOnChange(color) {
    this.setState({ 
      colorForm: { ...this.state.colorForm,
        color: color.hex
      }
    })
  }

  handleAddColor(e) {
    e.preventDefault()
    if (!this.isValid()) return

    this.props.updatePalette(this.state.colorForm)
    this.resetForm()
    this.resetErrors()
  }

  handleRandomColor() {
    // // Checks if full
    // if (!this.isValid({ randomColor: true })) return

    // // Custom check to see if current color added isn't already included
    // const currentColors = {};

    // let colorHex = chroma(colorNames[Math.floor(Math.random() * colorNames.length)]).hex()
    // let duplicate = this.props.paletteColors.some(colorObj => {      
    //   currentColors[colorObj.color.toLowerCase()] = true;
    //   return colorObj.color.toLowerCase() === colorHex.toLowerCase()
    // })

    // while (duplicate) {
    //   colorHex = chroma(colorNames[Math.floor(Math.random() * colorNames.length)]).hex();
    //   if (!(colorHex in currentColors)) duplicate = false;
    // }

    // const colorObject = {
    //   colorHex
    // }

    // this.props.updatePalette(colorObject)
  }

  render() {
    const { 
      colorForm: { color }, 
      colorFormErrors: { colorError, colorPaletteError } 
    } = this.state;

    const {
      showSidebar,
      handleSidebarToggle,
      fontColor,
      clearPalette
    } = this.props;
  
    return (
      <div className={`NewPaletteForm__sidebar ${showSidebar && 'show'}`}>
        <div className="NewPaletteForm__sidebar__nav">
          <div onClick={handleSidebarToggle}> 
            hide tool
          </div>
        </div>
        <div className="NewPaletteForm__sidebar__head">
          <button className="clear-button" onClick={clearPalette}>
            Clear Palette 
          </button>
          <button className="random-button" onClick={this.handleRandomColor}>
            Random Color
          </button>
        </div>
        <form onSubmit={this.handleAddColor}>
          <ChromePicker 
            disableAlpha
            color={color}
            onChange={this.handleOnChange}
          />
          <div className="color-input">
            <ul className="error-list">
              <li> {colorPaletteError} </li>
              <li> {colorError} </li>              
            </ul>
          </div>
          <button type="submit" style={{ backgroundColor: color }}> 
            <h2 className={fontColor(color)}>
              Add Color
            </h2> 
          </button>
        </form>
      </div>
    )
  }
}
