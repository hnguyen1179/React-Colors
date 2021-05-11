import React, { Component } from 'react'
import NewPaletteSidebar from './NewPaletteSidebar'
import NewPaletteNav from './NewPaletteNav';
import PaletteSubmitForm from './PaletteSubmitForm';
import DraggableColorList from './DraggableColorList';

import chroma from 'chroma-js';
import { ValidatorForm } from 'react-material-ui-form-validator';

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
        paletteName: '',
        id: '',
        emoji: '',
        colors: JSON.parse(localStorage.getItem('currentEdit')) || seed
      },
      paletteNameError: '',
      showSidebar: true,
      showSubmission: false
    }

    this.currentPathname = null;
    this.currentSearch = null;

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
    this.handleOnBackButtonEvent = this.handleOnBackButtonEvent.bind(this)

    this.updatePalette = this.updatePalette.bind(this)
    this.clearPalette = this.clearPalette.bind(this)
    this.fontColor = this.fontColor.bind(this)
  }
  
  componentDidMount() {
    const { palettes } = this.props; 
    // window.addEventListener('popstate', this.handleOnBackButtonEvent)
    
    // history.listen((newLocation, action) => {
    //   if (action === 'PUSH') {
    //     if (
    //       newLocation.pathname !== this.currentPathname ||
    //       newLocation.search !== this.currentSearch
    //     ) {
    //       console.log('pushed')
    //       this.currentPathname = newLocation.pathname
    //       this.currentSearch = newLocation.search 

    //       history.push({
    //         pathname: newLocation.pathname,
    //         search: newLocation.search
    //       })
    //     }
    //   } else {
    //     history.go(1)
    //   }
    // })
    
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return palettes.every(({ paletteName }) => value.toLowerCase() !== paletteName.toLowerCase() )
    });
  }

  componentWillUnmount() {
    if (this.props.history.action == 'POP') {
      console.log('NO')
      return false
    }
  }

  handleOnBackButtonEvent(e) {
    e.preventDefault();
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
    console.log('opening confirmation')
    this.setState({ showSubmission: 'pickConfirm' })
  }

  handleAddPalette() {    
    const newPalette = {
      ...this.state.paletteForm,
      id: this.convertPaletteName(this.state.paletteForm.paletteName),
    }

    this.props.savePalette(newPalette);
    this.props.history.push('/')
  }

  handleExit() {
    localStorage.removeItem('currentEdit')
    this.props.history.push('/')
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
    const { showSidebar, showSubmission, paletteForm: { colors, paletteName, emoji }} = this.state 

    return (
      <div className="NewPaletteForm">
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
