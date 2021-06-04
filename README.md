# React Colors
[Live link](https://hnguyen1179.github.io/React-Colors/)</br></br>
![Intro Gif](https://user-images.githubusercontent.com/19617238/119578127-d0ae4200-bd70-11eb-831f-ffca62249ad9.gif)

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Highlights](#highlights)
4. [Sample Code](#sample-code)
4. [Future Features](#future-features)

# Introduction

One of the biggest problems for me when starting on the front end of any project is coming up with a color scheme and so I built a tool to help out with the process. React Colors allows you to create and save custom color palettes. Once saved, you're able to come back to those palettes and copy the Hex or RGB color code from selected colors.
</br>
</br>
In addition to helping manage color palettes, React Colors also helps you create a starting palette of 5 colors and recommend you colors based on your palette's colors through the use of the [colormind](http://colormind.io/) API, which generates colors based on a machine learning model. 

## Technologies

**Front end** <br/> 
React Colors is built entirely on React and routing was done through React Router library. Most of the CSS was custom and built with SCSS, with the exception of some dialog boxes/forms generated with the Material UI library. Saved palettes were persisted through ```window.localStorage```.

# Highlights
* **Flexible Palette Creation** - persistent storage of colors within palettes is done via a CRUD system, as users are able to freely generate, edit and delete colors through the application's UI. Once colors are added to the palette, users are able to drag around colors in order to create their own ordered palettes. 

* **Machine Learning Generated Colors** - through the use of the colormind API, users can take advantage of its machine learning model in order to generate a unique, five-swatch color scheme as a base for their palettes. In addition, users can also get recommended colors based on their current color palette.
![crud](https://user-images.githubusercontent.com/19617238/119578123-ce4be800-bd70-11eb-84e6-1cc450f359f2.gif)
</br>
</br>


* **Persistent Palettes** - this project features no back end and so any persistent data is saved via ```window.localStorage```. Once a user creates a palette by naming it and choosing an emoji to represent the palette, that palette is saved via a ```componentDidUpdate``` function that saves the palette into the user's ```window.localStorage```. 
![palette-saving](https://user-images.githubusercontent.com/19617238/119578117-ca1fca80-bd70-11eb-9c2b-adc84656ba0c.gif)
</br>
</br>

* **Color Copying** - once a palette is saved, users are able to open up any saved palettes and copy the HEX or RGB color code from a selected color. Users are also able to adjust the luminosity of their palette in order to suit their needs as well as select from an array of different shades of a select color via the 'more' button.
![color-copy](https://user-images.githubusercontent.com/19617238/119578109-c429e980-bd70-11eb-925f-9ec2b5b34745.gif)
</br>
</br>
  
# Sample Code
Shown below is the code for the sidebar used in the new palette creation page. The sidebar is one of the more complicated componenets of this project as it integrates a lot of features like handling color picking, a custom slide in/out function for the sidebar, API calls, and error handling. 

  ``` javascript
import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { debounce, throttle } from "lodash";

import {
    arrayToHex,
    fontColor,
    hexToArray,
    pickFour,
} from "../utility/ColorUtility";

export default class NewPaletteSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "#000000",
            colorFormErrors: {
                colorError: "",
            },
        };

        this.handleOnChange = debounce(this.handleOnChange.bind(this), 2);
        this.handleAddColor = this.handleAddColor.bind(this);
        this.handleRecommendColor = throttle(
            this.handleRecommendColor.bind(this),
            200
        );
        this.handleGeneratePalette = debounce(
            this.handleGeneratePalette.bind(this),
            500
        );
        this.clickClearPalette = this.clickClearPalette.bind(this);
        this.clickEditColor = this.clickEditColor.bind(this);
        this.clickCancelEdit = this.clickCancelEdit.bind(this);
        this.apiErrorHandler = this.apiErrorHandler.bind(this);
    }

    componentDidMount() {
        // Generates a random palette if currentEdit isn't present in lS
        if (!localStorage.getItem("currentEdit")) {
            this.handleGeneratePalette();
        }
    }

    // Saves into localStorage the currentEdit
    componentDidUpdate(prevProps) {
        // This is to save the current palette in the event that the user
        // accidentally refreshes the page
        if (
            this.props.paletteColors.length !== prevProps.paletteColors.length
        ) {
            const stringy = JSON.stringify(this.props.paletteColors);
            localStorage.setItem("currentEdit", stringy);
        }

        // This is used to keep track of the current edited color. If a user
        // clicks on a color, it will update editColor.edit = true
        // and set the editColor.index, editColor.color, editColor.newColor
        if (this.props.editColor.color !== prevProps.editColor.color) {
            this.setState({ color: this.props.editColor.color });
        }
    }

    // Resets all of the errors to blank
    resetErrors() {
        this.setState((previous) => {
            return {
                ...previous,
                colorFormErrors: {
                    colorNameError: "",
                },
            };
        });
    }

    // Resets the form to default; used after adding colors
    resetForm() {
        this.setState((previous) => {
            return {
                ...previous,
                color: previous.color,
            };
        });
    }

    // Error Checker for adding colors
    isValid() {
        const { paletteColors } = this.props;
        const { color } = this.state;

        let colorError = "";

        const fullPalette = paletteColors.length === 20;

        const duplicateColor = paletteColors.some((colorFromPalette) => {
            return colorFromPalette === color;
        });

        if (duplicateColor) {
            colorError = (
                <div className="color-error">
                    Cannot have duplicate color:
                    <div
                        style={{
                            backgroundColor: color,
                            border: "1px solid rgba(0, 0, 0, 0.212)",
                        }}
                    />
                </div>
            );
        }

        if ([fullPalette, duplicateColor].some((x) => x === true)) {
            this.setState(
                {
                    colorFormErrors: {
                        colorError,
                    },
                },
                () => {
                    setTimeout(() => {
                        this.resetErrors();
                    }, 3000);
                }
            );

            return false;
        }

        return true;
    }

    /**
     * Ran when color picker picks a new color, changes the color to edit to color
     * which requires changing the editColor object's color
     * */

    handleOnChange(color) {
        this.setState({ color: color.hex });
        this.props.changeColor(color.hex);
    }

    // Updates the palette with a new color
    handleAddColor(e) {
        e.preventDefault();
        if (!this.isValid()) return;

        this.props.updatePalette(this.state.color);
        this.resetForm();
    }

    apiErrorHandler(errorMsg) {
        this.setState(
            {
                colorFormErrors: {
                    colorError: errorMsg,
                },
            },
            () => {
                setTimeout(() => {
                    this.resetErrors();
                }, 3000);
            }
        );
    }

    /**
     *
     * Both of the API calls below will need to go through a cors proxy
     * in order to run, due to colormind only being hosted via http and so
     * a mixed-content error comes up
     *
     * cors proxy: https://guarded-plateau-27863.herokuapp.com/
     *
     * */

    // Hits the colormind API to generate a random 5-color palette
    handleGeneratePalette() {
        const { setPalette, cancelEdit } = this.props;

        const url =
            "https://guarded-plateau-27863.herokuapp.com/http://colormind.io/api/";
        const data = {
            model: "default",
        };

        fetch(url, {
            method: "POST",
            credentials: "omit",
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                setPalette(arrayToHex(data.result));
                this.setState({ color: "#000000" });
                cancelEdit();
            })
            .catch((error) => {
                this.apiErrorHandler(error);
            });
    }

    // Hits the colormind API to generate a recommended color based on current palette
    handleRecommendColor() {
        const { updatePalette, paletteColors } = this.props;

        if (paletteColors.length === 20) return;
        const newPaletteColors = hexToArray(pickFour(paletteColors));
        newPaletteColors.push("N");

        const url =
            "https://guarded-plateau-27863.herokuapp.com/http://colormind.io/api/";
        const data = {
            model: "default",
            input: newPaletteColors,
        };

        fetch(url, {
            method: "POST",
            credentials: "omit",
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                updatePalette(arrayToHex(data.result)[data.result.length - 1]);
            })
            .catch((error) => {
                this.apiErrorHandler(error);
            });
    }

    // Clears the palette of all colors
    clickClearPalette() {
        const { clearPalette } = this.props;
        clearPalette();
        this.setState({ color: "#000000" });
    }

    // Finalizes the editing a color, changing it within the palette
    clickEditColor(e) {
        e.preventDefault();
        const { updateColor, editColor } = this.props;
        const { color } = this.state;

        updateColor(editColor.originalColor, color);
    }

    // Cancels the edit and reverts the color to original color
    clickCancelEdit(e) {
        e.preventDefault();

        const { cancelEdit } = this.props;
        cancelEdit();
    }

    render() {
        const {
            color, // String: hex of current color selected by color picker
            colorFormErrors: { colorError }, // String: Error Message for duplicates
        } = this.state;

        const {
            showSidebar, // Boolean: condition to show sidebar
            handleSidebarToggle, // Function: opens the sidebar, changing showSidebar in parent
            paletteColors, // String Array: palette's colors (hex, rgb, rgba)
            editColor, // Object: {str: color, str: originalColor, bool: edit}
        } = this.props;

        const editButtons = (
            // Edit Color menu; has two buttons: confirming the change or canceling it
            <div className="edit-buttons">
                <button
                    className="edit-color-button"
                    onClick={this.clickEditColor}
                >
                    <div>
                        <h2> Edit Color </h2>
                    </div>
                </button>

                <button
                    className="cancel-edit-button"
                    onClick={this.clickCancelEdit}
                >
                    <div>
                        <h2> Cancel </h2>
                    </div>
                </button>
            </div>
        );

        const addButton = (
            // Add color button
            <button
                type="submit"
                className="add-color-button"
                disabled={paletteColors.length === 20}
            >
                <div
                    className="add-color-button__text"
                    style={{
                        backgroundColor: color,
                        color: fontColor(color),
                    }}
                >
                    <h2> Add Color</h2>
                </div>
            </button>
        );

        return (
            <div className={`NewPaletteForm__sidebar ${showSidebar && "show"}`}>
                {/* Button which toggles hiding of sidebar */}
                <div className="NewPaletteForm__sidebar__nav">
                    <div onClick={handleSidebarToggle}>hide tool</div>
                </div>

                {/* 3 Buttons: generate random palette, recommend color, and clear palette */}
                <div className="NewPaletteForm__sidebar__head">
                    <button
                        className="random-palette-button"
                        onClick={this.handleGeneratePalette}
                    >
                        <h3>Generate Random Palette</h3>
                    </button>
                    <button
                        className="random-color-button"
                        onClick={this.handleRecommendColor}
                        disabled={
                            paletteColors.length < 4 ||
                            paletteColors.length >= 20
                        }
                    >
                        <h3>Recommend a Color</h3>
                    </button>
                    <button
                        className="clear-button"
                        onClick={this.clickClearPalette}
                    >
                        <h3>Clear Palette</h3>
                    </button>
                </div>

                {/* Form that adds color on submission */}
                <form onSubmit={this.handleAddColor}>
                    <ChromePicker
                        disableAlpha
                        color={color}
                        onChange={this.handleOnChange}
                    />
                    <div className="color-input">
                        <ul className="error-list">
                            <li> {colorError} </li>
                        </ul>
                    </div>

                    {/* If edit, show edit menu options */}
                    {editColor.edit ? editButtons : addButton}
                </form>
            </div>
        );
    }
}

  ```
  
  
# Future Features
In the future, I'm looking to implement machine learning model that will extract a color palette from a randomly grabbed image every time the user clicks 'Generate Palette'. Generating color palettes can be thought of as a clustering problem in disguise, wherein we would want to divide all of an image's pixels into k different groups that best represent the image. 
