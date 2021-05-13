import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { addColorRange, addSingleColorRange } from './ColorUtility';
import { Redirect, Route, Switch } from 'react-router-dom';
import SingleColorPalette from './SingleColorPalette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';

import './App.scss';
export default class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      palettes: JSON.parse(localStorage.getItem('palettes')) || seedColors,
    }

    this.savePalette = this.savePalette.bind(this)
    this.deletePalette = this.deletePalette.bind(this)
    this.findPalette = this.findPalette.bind(this)
    this.findSinglePalette = this.findSinglePalette.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.removeItem('currentEdit');
    const jsonPalette = JSON.stringify(this.state.palettes);
    localStorage.setItem('palettes', jsonPalette)
  }

  findPalette(renderProps) {
    const paletteId = renderProps.match.params.id;
    const { palettes } = this.state;

    let palette = palettes.find(palette => palette.id === paletteId)
    if (palette === undefined) return <Redirect to='/' /> 

    return (
      <Palette palette={addColorRange(palette)} />
    )
  }

  
  findSinglePalette(renderProps) {
    // Problem is that you're looking for a 300 color hex in a 
    // an array of 400 color hexes 

    // color cannot be found. Previously you were searching for the color name? 

    // Need to switch out the 400 color array for a 300 color array 

    const { palettes } = this.state;
    const paletteId = renderProps.match.params.id;
    const hexNoHash = renderProps.match.params.hexNoHash;
    const palette = palettes.find(palette => palette.id === paletteId)
    const color = palette.colors.find(color => {
      return color.slice(1).toLowerCase() === hexNoHash
    })
    
    return (
      <SingleColorPalette 
        renderProps={renderProps} 
        palette={addSingleColorRange(palette, color)} 
      />
    )
  }

  savePalette(palette) {
    const newState = [
      ...this.state.palettes,
      palette
    ]
    this.setState({ palettes: newState })
  }

  deletePalette(paletteId) {
    const newState = this.state.palettes.filter(x => x.id !== paletteId)
    this.setState({ palettes: newState })
  }
    
  render() {
    const { palettes } = this.state;

    return (
      <>
        <Switch>
          <Route 
            exact 
            path="/palette/new" 
            render={(routeProps) => {
              return (
                <NewPaletteForm 
                  {...routeProps} 
                  savePalette={this.savePalette} 
                  palettes={palettes}
                />
              )
            }}
          />
          <Route exact path="/palette/:id" render={this.findPalette}/>
          <Route exact path="/palette/:id/:hexNoHash" render={this.findSinglePalette} />
          <Route 
            exact 
            path="/" 
            render={() => { 
              return (
                <PaletteList 
                  palettes={palettes} 
                  deletePalette={this.deletePalette}  
                />
              )
            }}
          />
        </Switch>
      </>
    )
  }
}
