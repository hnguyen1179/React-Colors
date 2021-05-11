import React, { Component } from 'react'
import NewPaletteSidebar from './NewPaletteSidebar'
import NewPaletteNav from './NewPaletteNav';
import DraggableColorList from './DraggableColorList';
import PaletteSubmitForm from './PaletteSubmitForm';

import chroma from 'chroma-js';
import Picker from 'emoji-picker-react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

import './NewPaletteForm.scss'

const seed = [      
  { colorName: "FlatFlesh", color: "#fad390" },
  { colorName: "MelonMelody", color: "#f8c291" },
  { colorName: "Livid", color: "#6a89cc" },
  { colorName: "Spray", color: "#82ccdd" },
  { colorName: "ParadiseGreen", color: "#b8e994" },
  { colorName: "SquashBlossom", color: "#f6b93b" },
  { colorName: "MandarinRed", color: "#e55039" },
  { colorName: "AzraqBlue", color: "#4a69bd" },
  { colorName: "Dupain", color: "#60a3bc" },
  { colorName: "AuroraGreen", color: "#78e08f" },
  { colorName: "IcelandPoppy", color: "#fa983a" },
  { colorName: "TomatoRed", color: "#eb2f06" },
  { colorName: "YueGuangBlue", color: "#1e3799" },
  { colorName: "GoodSamaritan", color: "#3c6382" },
  { colorName: "Waterfall", color: "#38ada9" },
  { colorName: "CarrotOrange", color: "#e58e26" }
]

export default class NewPaletteForm extends Component {
  constructor(props) {
    super(props)
    // TO DO: Make updating palettes in edit form work with session storage 
    this.state = {
      paletteForm: {
        paletteName: "",
        id: "",
        emoji: "",
        colors: JSON.parse(localStorage.getItem('currentEdit')) || seed
      },
      paletteNameError: "",
      showSidebar: true,
      showSubmission: false
    }

    this.handleSidebarToggle = this.handleSidebarToggle.bind(this)
    this.handleOpenInput = this.handleOpenInput.bind(this)
    this.handleCloseInput = this.handleCloseInput.bind(this)
    this.handleAddPalette = this.handleAddPalette.bind(this)
    this.handleDeleteColor = this.handleDeleteColor.bind(this)
    this.handleOnTextChange = this.handleOnTextChange.bind(this)
    this.handleEmojiChange = this.handleEmojiChange.bind(this)

    this.updatePalette = this.updatePalette.bind(this)
    this.clearPalette = this.clearPalette.bind(this)
    this.fontColor = this.fontColor.bind(this)

  }
  handleCloseInput(e) {
    this.setState({ showSubmission: false })
  }

  handleOpenInput(e) {
    e.stopPropagation();
    this.setState({ showSubmission: true })
  }

  componentDidMount() {
    const { palettes } = this.props; 

    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      return palettes.every(({ paletteName }) => value.toLowerCase() !== paletteName.toLowerCase() )
    });
  }

  fontColor(color) {
    return chroma(color).luminance() > 0.5 ? 'font-black' : 'font-white'
  }

  convertPaletteName(name) {
    return name.split(" ").map(x => x.toLowerCase()).join("-")
  }

  handleSidebarToggle(e) {
    this.setState({ showSidebar: !this.state.showSidebar })
  }

  handleDeleteColor(id) {
    const { colors } = this.state.paletteForm
    const newColors = colors.filter(color => color.colorName !== id)
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

  handleEmojiChange(e, emoji) {
    this.setState({
      paletteForm: {
        ...this.state.paletteForm,
        emoji: emoji.emoji
      }
    })
  }

  handleAddPalette() {
    const newPalette = {
      ...this.state.paletteForm,
      id: this.convertPaletteName(this.state.paletteForm.paletteName),
    }

    this.props.savePalette(newPalette);
    this.props.history.push("/")
  }

  clearPalette() {
    this.setState({
      paletteForm: {
        paletteName: "",
        colors: [],
        emoji: ""
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
    const { showSidebar, showSubmission, paletteForm: { colors, paletteName, emoji }} = this.state 

    return (
      <div className="NewPaletteForm">
        {/* Palette Save Form */}
        {/* <div 
          className={`NewPaletteForm__palette-input ${showSubmission && 'show'}`} 
        >
          <ValidatorForm
            onClick={this.handlePreventBodyClick}
            onSubmit={this.handleAddPalette}
          >
            <TextValidator
              value={paletteName ?? ""}
              onChange={this.handleOnTextChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Name cannot be blank", "Cannot have duplicate palette names"]}
            />

            <div>
              {emoji}
            </div>

            <Picker onEmojiClick={this.handleEmojiChange} />
            
            <Button type="submit"> submit </Button>
          </ValidatorForm>
        </div> */}

        {/* Dialog Integration */}
        <PaletteSubmitForm
          open={showSubmission}
          handleClose={this.handleCloseInput}
          handleOnTextChange={this.handleOnTextChange}
          handleEmojiChange={this.handleEmojiChange}
          handleAddPalette={this.handleAddPalette}
          paletteName={paletteName}
          emoji={emoji}
        />

        {/* Main Content of New Palette */}
        <main className={`NewPaletteForm__main ${showSidebar && 'show'}`}>
          <NewPaletteNav 
            showSidebar={showSidebar}
            handleSidebarToggle={this.handleSidebarToggle}
            handleOpenInput={this.handleOpenInput}
            handleAddPalette={this.handleAddPalette}
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
          paletteColors={colors}
          handleSidebarToggle={this.handleSidebarToggle}
          updatePalette={this.updatePalette}
          clearPalette={this.clearPalette}
          showSidebar={showSidebar}
          fontColor={this.fontColor}
        />
      </div>
    )
  }
}
