import React, { Component } from "react";

import { ChromePicker } from "react-color";
import { debounce, throttle } from "lodash";
import { arrayToHex, fontColor, hexToArray, pickFour } from "../utility/ColorUtility";

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
    }

    componentDidMount() {
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

    // EVENT HANDLERS
    handleOnChange(color) {
        this.setState({ color: color.hex });
        this.props.changeColor(color.hex);
    }

    handleAddColor(e) {
        e.preventDefault();
        console.log("handling add color");
        if (!this.isValid()) return;

        this.props.updatePalette(this.state.color);
        this.resetForm();
    }

    handleGeneratePalette() {
        const { setPalette, cancelEdit } = this.props;

        const url = "http://colormind.io/api/";
        const data = {
            model: "default",
        };

        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
                const palette = JSON.parse(http.responseText).result;
                setPalette(arrayToHex(palette));
                this.setState({ color: "#000000" });
                cancelEdit();
            }
        };

        http.open("POST", url, true);
        http.send(JSON.stringify(data));
    }

    handleRecommendColor() {
        const { updatePalette, paletteColors } = this.props;
        if (paletteColors.length === 20) return;
        const newPaletteColors = hexToArray(pickFour(paletteColors));
        newPaletteColors.push("N");

        const url = "http://colormind.io/api/";
        const data = {
            model: "default",
            input: newPaletteColors,
        };

        const http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                const palette = JSON.parse(http.responseText).result;
                updatePalette(arrayToHex(palette)[palette.length - 1]);
            }
        };

        http.open("POST", url, true);
        http.send(JSON.stringify(data));
    }

    clickClearPalette() {
        const { clearPalette } = this.props;
        clearPalette();
        this.setState({ color: "#000000" });
    }

    clickEditColor(e) {
        e.preventDefault();
        const { updateColor, editColor } = this.props;
        const { color } = this.state;

        updateColor(editColor.originalColor, color);
    }

    clickCancelEdit(e) {
        e.preventDefault();

        const { cancelEdit } = this.props;
        cancelEdit();
    }

    render() {
        const {
            color,
            colorFormErrors: { colorError },
        } = this.state;

        const { showSidebar, handleSidebarToggle, paletteColors, editColor } =
            this.props;

        const editButtons = (
            <div className="edit-buttons">
                <button
                    className="edit-color-button"
                    onClick={this.clickEditColor}
                >
                    <div

                    >
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
                <div className="NewPaletteForm__sidebar__nav">
                    <div onClick={handleSidebarToggle}>hide tool</div>
                </div>

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

                    {editColor.edit ? editButtons : addButton}
                </form>
            </div>
        );
    }
}
