import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Palette from "./Palette";
import seedColors from "../utility/seedColors";
import SingleColorPalette from "./SingleColorPalette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import { addColorRange, addSingleColorRange } from "../utility/ColorUtility";

import "../scss/style.scss";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            palettes:
                JSON.parse(localStorage.getItem("palettes")) || seedColors,
        };

        this.savePalette = this.savePalette.bind(this);
        this.deletePalette = this.deletePalette.bind(this);
        this.findPalette = this.findPalette.bind(this);
        this.findSinglePalette = this.findSinglePalette.bind(this);
    }

    /**
     * Whenever a palette is deleted or added, localStorage for the
     * currentEdit is removed and the lS key for palettes is updated
     **/
    componentDidUpdate() {
        localStorage.removeItem("currentEdit");
        const jsonPalette = JSON.stringify(this.state.palettes);
        localStorage.setItem("palettes", jsonPalette);
    }

    // Find and create a Palette component based on id of URL params
    findPalette(renderProps) {
        const paletteId = renderProps.match.params.id;
        const { palettes } = this.state;

        let palette = palettes.find((palette) => palette.id === paletteId);
        if (palette === undefined) return <Redirect to="/React-Colors" />;

        return <Palette palette={addColorRange(palette)} />;
    }

    /**
     *  Find and create a SinglePalette component (same color, different shades)
     *  based on id of URL params
     **/
    findSinglePalette(renderProps) {
        const { palettes } = this.state;
        const paletteId = renderProps.match.params.id;
        const hexNoHash = renderProps.match.params.hexNoHash;
        const palette = palettes.find((palette) => palette.id === paletteId);
        const color = palette.colors.find((color) => {
            return color.slice(1).toLowerCase() === hexNoHash;
        });

        return (
            <SingleColorPalette
                renderProps={renderProps}
                palette={addSingleColorRange(palette, color)}
            />
        );
    }

    // Updates the current list of palettes with a new palette
    savePalette(palette) {
        const newState = [...this.state.palettes, palette];
        this.setState({ palettes: newState });
    }

    // Deletes a palette from state based on palette.id
    deletePalette(paletteId) {
        const newState = this.state.palettes.filter((x) => x.id !== paletteId);
        this.setState({ palettes: newState });
    }

    render() {
        const { palettes } = this.state;

        return (
            <>
                <Switch>
                    {/* Route for palette creation */}
                    <Route
                        exact
                        path="/React-Colors/palette/new"
                        render={(routeProps) => {
                            return (
                                <NewPaletteForm
                                    {...routeProps}
                                    savePalette={this.savePalette}
                                    palettes={palettes}
                                />
                            );
                        }}
                    />

                    {/* Route for a Palette */}
                    <Route
                        exact
                        path="/React-Colors/palette/:id"
                        render={this.findPalette}
                    />

                    {/* Route for Single Color Palette */}
                    <Route
                        exact
                        path="/React-Colors/palette/:id/:hexNoHash"
                        render={this.findSinglePalette}
                    />

                    {/* Default Route is the index for all palettes */}
                    <Route
                        exact
                        path="/React-Colors"
                        render={() => {
                            return (
                                <PaletteList
                                    palettes={palettes}
                                    deletePalette={this.deletePalette}
                                />
                            );
                        }}
                    />
                </Switch>
            </>
        );
    }
}
