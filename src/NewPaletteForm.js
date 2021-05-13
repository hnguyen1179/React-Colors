import React, { Component } from 'react'
import NewPaletteSidebar from './NewPaletteSidebar'
import NewPaletteNav from './NewPaletteNav';
import PaletteSubmitForm from './PaletteSubmitForm';
import DraggableColorList from './DraggableColorList';

import { Prompt } from 'react-router-dom';
import { ValidatorForm } from 'react-material-ui-form-validator';

import './NewPaletteForm.scss'

const seed = []

export default class NewPaletteForm extends Component {
  constructor(props) {
    super(props)
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
      exitBlock: true,
      editColor: {
        edit: false,
        color: '#ffffff',
        originalColor: '#ffffff'
      }
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

    this.selectColor = this.selectColor.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.updateColor = this.updateColor.bind(this)
    this.changeColor = this.changeColor.bind(this)

    this.updatePalette = this.updatePalette.bind(this)
    this.setPalette = this.setPalette.bind(this)
    this.clearPalette = this.clearPalette.bind(this)
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

  setPalette(array) {
    this.setState({
      paletteForm: {
        colors: array
      }
    }, () => {
      localStorage.setItem('currentEdit', JSON.stringify(this.state.paletteForm.colors))
    })
  }

  // Opens the edit button 
  selectColor(color) {
    this.setState({ 
      editColor: {
        edit: true,
        color: color,
        originalColor: color
      } 
    });
  }

  changeColor(color) {
    this.setState({
      editColor: {
        ...this.state.editColor,
        color: color
      }
    })
  }

  // Closes the edit buttons
  cancelEdit() {
    this.setState({
      editColor: {
        edit: false
      }
    })
  }

  updateColor(originalColor, newColor) {
    const { paletteForm } = this.state;

    const newColors = paletteForm.colors.map((color) => {
      if (color === originalColor) {
        return newColor;
      } else {
        return color
      }
    }) 

    // resets 
    this.setState({ 
      paletteForm: {
        colors: newColors
      },
      editColor: {
        edit: false
      }
    }, () => {
      localStorage.setItem('currentEdit', JSON.stringify(this.state.paletteForm.colors))
    })
  }

  updatePalette(color) {
    this.setState({
      paletteForm: {
        colors: [...this.state.paletteForm.colors, color]
      }
    })
  }

  render() {
    const { showSidebar, showSubmission, exitBlock, editColor, paletteForm: { colors, paletteName }} = this.state 

    return (
      <div className="NewPaletteForm">
        <Prompt when={exitBlock} message={this.handleBrowserBack} />

        {/* Dialog Integration for clicking 'Save Palette' */}
        <PaletteSubmitForm
          open={showSubmission}
          paletteName={paletteName}
          handleCloseInput={this.handleCloseInput}
          handleOnTextChange={this.handleOnTextChange}
          handleEmojiChange={this.handleEmojiChange}
          handleEmojiDialog={this.handleEmojiDialog}
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
              editColor={editColor}
              handleDeleteColor={this.handleDeleteColor} 
              selectColor={this.selectColor}
              axis="xy"
              distance={1}
            />
          </div>
        </main>

        {/* New Palette Sidebar */}
        <NewPaletteSidebar 
          showSidebar={showSidebar}
          paletteColors={colors}
          editColor={editColor}
          handleSidebarToggle={this.handleSidebarToggle}
          clearPalette={this.clearPalette}
          updatePalette={this.updatePalette}
          setPalette={this.setPalette}
          updateColor={this.updateColor}
          changeColor={this.changeColor}
          cancelEdit={this.cancelEdit}
        />
      </div>
    )
  }
}
