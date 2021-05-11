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
        colorName: "",
        color: "#ffffff",
      },
      colorFormErrors: {
        colorNameError: "",
        colorError: "",
        colorPaletteError: ""
      }
    }

    this.handleOnChange = debounce(this.handleOnChange.bind(this), 2)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleAddColor = this.handleAddColor.bind(this)
    this.handleRandomColor = this.handleRandomColor.bind(this)
  }

  // Saves into localStorage the currentEdit
  componentDidUpdate(prevProps, prevState) {
    const stringy = JSON.stringify(this.props.paletteColors);
    localStorage.setItem('currentEdit', stringy);
  }

  // UTILITY FUNCTIONS
  resetErrors() {
    this.setState(previous => {
      return {
        ...previous,
        colorFormErrors: {
          colorNameError: "",
          color: ""
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
          colorName: ""
        }
      }
    })
  }

  // Error Checker for adding colors 
  isValid(options = { randomColor: false }) {
    const { paletteColors } = this.props;
    const { colorName, color } = this.state.colorForm;

    let colorNameError = ""
    let colorError = ""
    let colorPaletteError = ""
    
    const fullPalette = paletteColors.length === 20
    
    if (fullPalette) {
      colorPaletteError = "Palette is full"
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
    
    const nameLength = colorName.length === 0
    const duplicateColor = paletteColors.some(colorObj => colorObj.color === color)
    const duplicateName = paletteColors.some(colorObj => colorObj.colorName.toLowerCase() === colorName.toLowerCase())

    if (nameLength) {
      colorNameError = "Name cannot be blank"
    }

    if (duplicateColor) {
      colorError = (
        <div className="color-error">
          Cannot have duplicate color: <div style={{ backgroundColor: color, border: '1px solid rgba(0, 0, 0, 0.212)' }}/>
        </div>
      )
    }

    if (duplicateName) {
      colorNameError = `Cannot have duplicate color name: ${colorName}`
    }

    if ([fullPalette, nameLength, duplicateColor, duplicateName].some(x => x === true)) {
      this.setState({ 
        colorFormErrors: {
          colorNameError, 
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

  handleTextChange(e) {
    this.setState({
      colorForm: { ...this.state.colorForm,
        colorName: e.target.value
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
    // Checks if full
    if (!this.isValid({ randomColor: true })) return

    // Custom check to see if current color added isn't already included
    const currentColors = {};

    let colorName = colorNames[Math.floor(Math.random() * colorNames.length)]
    let duplicate = this.props.paletteColors.some(colorObj => {
      currentColors[colorObj.colorName.toLowerCase()] = true;
      return colorObj.colorName.toLowerCase() === colorName.toLowerCase()
    })

    while (duplicate) {
      colorName = colorNames[Math.floor(Math.random() * colorNames.length)].toLowerCase();
      if (!(colorName in currentColors)) duplicate = false;
    }

    const color = chroma(colorName).hex()
    const colorObject = {
      colorName,
      color
    }
    this.props.updatePalette(colorObject)
  }

  render() {
    const { 
      colorForm: { colorName, color }, 
      colorFormErrors: { colorNameError, colorError, colorPaletteError } 
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
            color={color}
            onChange={this.handleOnChange}
          />
          <div className="color-input">
            <input 
              type="text" 
              value={colorName} 
              placeholder={"Color Name"} 
              onChange={this.handleTextChange}
            />
            <ul className="error-list">
              <li> {colorPaletteError} </li>
              <li> {colorNameError} </li>
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
