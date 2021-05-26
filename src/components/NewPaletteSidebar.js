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
            300
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

        if (paletteColors.length === 20 || paletteColors.length + 1 > 20) return;
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
