import React, { Component } from 'react'
import NewPaletteSidebar from './NewPaletteSidebar'
import NewPaletteNav from './NewPaletteNav';
import PaletteSubmitForm from './PaletteSubmitForm';
import DraggableColorList from './DraggableColorList';

import { Prompt } from 'react-router-dom';
import chroma from 'chroma-js';
import { ValidatorForm } from 'react-material-ui-form-validator';

import './NewPaletteForm.scss'

const seed = [      
  "#fad390",
  "#f8c291",
  "#6a89cc",
  "#82ccdd",
  "#b8e994",
  "#f6b93b",
  "#e55039",
  "#4a69bd",
  "#60a3bc",
  "#78e08f",
  "#fa983a",
  "#eb2f06",
  "#1e3799",
  "#3c6382",
  "#38ada9",
  "#e58e26"
]

export default class NewPaletteForm extends Component {
  constructor(props) {
    super(props)
    // TO DO: Make updating palettes in edit form work with session storage 
    this.state = {
      paletteForm: {
        paletteName: '',
        id: '',
        emoji: '',
        colors: JSON.parse(localStorage.getItem('currentEdit')) || seed
      },
      paletteNameError: '',
      showSidebar: true,
      showSubmission: false,
      exitBlock: true 
    }

    this.handleSidebarToggle = this.handleSidebarToggle.bind(this)
    this.handleOpenInput = this.handleOpenInput.bind(this)
    this.handleCloseInput = this.handleCloseInput.bind(this)
    this.handleAddPalette = this.handleAddPalette.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleDeleteColor = this.handleDeleteColor.bind(this)
    this.handleOnTextChange = this.handleOnTextChange.bind(this)
    this.handleEmojiChange = this.handleEmojiChange.bind(this)
    this.handleEmojiDialog = this.handleEmojiDialog.bind(this)
    this.handleConfirmDialog = this.handleConfirmDialog.bind(this)
    this.handleBrowserBack = this.handleBrowserBack.bind(this)

    this.updatePalette = this.updatePalette.bind(this)
    this.clearPalette = this.clearPalette.bind(this)
    this.fontColor = this.fontColor.bind(this)
  }
  
  componentDidMount() {
    const { palettes } = this.props; 
    
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return palettes.every(({ paletteName }) => value.toLowerCase() !== paletteName.toLowerCase() )
    });
  }
  
  handleCloseInput(e) {
    this.setState({ showSubmission: false })
  }
  
  handleOpenInput(e) {
    e.stopPropagation();
    this.setState({ showSubmission: 'pickPaletteName' })
  }
  

  fontColor(color) {
    return chroma(color).luminance() > 0.5 ? 'font-black' : 'font-white'
  }

  convertPaletteName(name) {
    return name.split(' ').map(x => x.toLowerCase()).join('-')
  }

  handleSidebarToggle(e) {
    this.setState({ showSidebar: !this.state.showSidebar })
  }

  handleDeleteColor(colorHex) {
    const { colors } = this.state.paletteForm
    const newColors = colors.filter(color => color !== colorHex)
    this.setState({ paletteForm: { colors: newColors }})
  }

  handleOnTextChange(e) {
    this.setState({
      paletteForm: {
        ...this.state.paletteForm,
        paletteName: e.target.value
      }
    })
  }

  handleEmojiChange(emojiObj, e) {
    this.setState({
      paletteForm: {
        ...this.state.paletteForm,
        emoji: emojiObj.native
      }
    }, () => {
      this.handleAddPalette()
    })
  }

  handleEmojiDialog() {
    this.setState({ showSubmission: 'pickEmoji' })
  }

  handleConfirmDialog() {
    this.setState({ showSubmission: 'pickConfirm' })
  }

  handleBrowserBack() {
    this.handleConfirmDialog()
    return false
  }

  handleAddPalette() {    
    const { paletteName, emoji, colors} = this.state.paletteForm

    const newPalette = {
      paletteName: paletteName,
      id: this.convertPaletteName(this.state.paletteForm.paletteName),
      emoji: emoji,
      colors: colors
    }

    this.setState({ exitBlock: false }, () => {
      this.props.savePalette(newPalette);
      this.props.history.push('/')
    })

  }

  handleExit() {
    localStorage.removeItem('currentEdit')
    this.setState({ exitBlock: false }, () => {
      this.props.history.push('/')
    })
  }

  clearPalette() {
    this.setState({
      paletteForm: {
        paletteName: '',
        colors: [],
        emoji: ''
      }
    })
  }

  updatePalette(colorObject) {
    this.setState({
      paletteForm: {
        colors: [...this.state.paletteForm.colors, colorObject]
      }
    })
  }

  render() {
    const { showSidebar, showSubmission, exitBlock, paletteForm: { colors, paletteName }} = this.state 

    return (
      <div className="NewPaletteForm">
        <Prompt when={exitBlock} message={this.handleBrowserBack} />

        {/* Dialog Integration for clicking 'Save Palette' */}
        <PaletteSubmitForm
          open={showSubmission}
          handleCloseInput={this.handleCloseInput}
          handleOnTextChange={this.handleOnTextChange}
          handleEmojiChange={this.handleEmojiChange}
          handleEmojiDialog={this.handleEmojiDialog}
          paletteName={paletteName}
        />

        {/* Main Content of New Palette */}
        <main className={`NewPaletteForm__main ${showSidebar && 'show'}`}>
          <NewPaletteNav 
            open={showSubmission}
            showSidebar={showSidebar}
            handleSidebarToggle={this.handleSidebarToggle}
            handleOpenInput={this.handleOpenInput}
            handleCloseInput={this.handleCloseInput}
            handleConfirmDialog={this.handleConfirmDialog}
            handleExit={this.handleExit}
          />
          <div className="NewPaletteForm__main__content">
            <DraggableColorList 
              colors={colors} 
              fontColor={this.fontColor} 
              handleDeleteColor={this.handleDeleteColor} 
              axis="xy"
              distance={1}
            />
          </div>
        </main>

        {/* New Palette Sidebar */}
        <NewPaletteSidebar 
          showSidebar={showSidebar}
          handleSidebarToggle={this.handleSidebarToggle}
          fontColor={this.fontColor}
          clearPalette={this.clearPalette}
          paletteColors={colors}
          updatePalette={this.updatePalette}
        />
      </div>
    )
  }
}
