import React, { Component } from "react";
import { Prompt } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";

import NewPaletteSidebar from "./NewPaletteSidebar";
import NewPaletteNav from "./NewPaletteNav";
import PaletteSubmitForm from "./PaletteSubmitForm";
import DraggableColorList from "./DraggableColorList";

export default class NewPaletteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paletteForm: {
                paletteName: "",
                id: "",
                emoji: "",
                colors: JSON.parse(localStorage.getItem("currentEdit")) || [],
            },
            paletteNameError: "",
            showSidebar: true,
            showSubmission: false,
            exitBlock: true,
            editColor: {
                edit: false,
                color: "#000000",
                originalColor: "#000002",
            },
        };

        this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
        this.handleOpenInput = this.handleOpenInput.bind(this);
        this.handleCloseInput = this.handleCloseInput.bind(this);
        this.handleAddPalette = this.handleAddPalette.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.handleDeleteColor = this.handleDeleteColor.bind(this);
        this.handleOnTextChange = this.handleOnTextChange.bind(this);
        this.handleEmojiChange = this.handleEmojiChange.bind(this);
        this.handleEmojiDialog = this.handleEmojiDialog.bind(this);
        this.handleConfirmDialog = this.handleConfirmDialog.bind(this);
        this.handleBrowserBack = this.handleBrowserBack.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.updatePalette = this.updatePalette.bind(this);
        this.setPalette = this.setPalette.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
    }

    componentDidMount() {
        const { palettes } = this.props;

        /**
         * Creates validation rule to check for unique palette names
         * when saving a palette
         **/
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
            return palettes.every(
                ({ paletteName }) =>
                    value.toLowerCase() !== paletteName.toLowerCase()
            );
        });
    }

    // Closes the save palette pop up form
    handleCloseInput() {
        this.setState({ showSubmission: false });
    }

    // Initiates the save palette pop up form
    handleOpenInput(e) {
        e.stopPropagation();
        this.setState({ showSubmission: "pickPaletteName" });
    }

    // Converts 'Material UI Colors' to 'material-ui-colors'
    convertPaletteName(name) {
        return name
            .split(" ")
            .map((x) => x.toLowerCase())
            .join("-");
    }

    // Opens the sidebar and closes the color box edit menu
    handleSidebarToggle() {
        this.setState(
            {
                showSidebar: !this.state.showSidebar,
            },
            () => this.cancelEdit()
        );
    }

    /**
     * Deletes colorbox and sets the color to edit to be '#fffff2' in order to
     * allow editing of the defaulted #ffffff color. After adding a color,
     * the color to add defaults to #ffffff
     *
     * however, I wrote the select color to edit function to close the edit menu
     * should you click on the same color. Thus, a bug is created if the user
     * tries to edit the defaulted color; edit menu automatically closes and it
     * looks like nothing happened
     **/

    handleDeleteColor(colorHex) {
        const { colors } = this.state.paletteForm;
        const newColors = colors.filter((color) => color !== colorHex);
        this.setState({
            paletteForm: {
                colors: newColors,
            },
            editColor: {
                ...this.state.editColor,
                edit: false,
                originalColor: "#fffff2",
            },
        });
    }

    // Handles typing in save palette form pop up
    handleOnTextChange(e) {
        this.setState({
            paletteForm: {
                ...this.state.paletteForm,
                paletteName: e.target.value,
            },
        });
    }

    // Handles selecting an emoji in the save palette form pop up
    handleEmojiChange(emojiObj) {
        this.setState(
            {
                paletteForm: {
                    ...this.state.paletteForm,
                    emoji: emojiObj.native,
                },
            },
            () => {
                this.handleAddPalette();
            }
        );
    }

    // Opens the 2nd half of the save palette form pop up; selecting an emoji
    handleEmojiDialog() {
        this.setState({ showSubmission: "pickEmoji" });
    }

    // Opens the 'Leaving Confirmation' pop up
    handleConfirmDialog() {
        this.setState({ showSubmission: "pickConfirm" });
    }

    /**
     * <Prompt /> Component's message attribute allows for a function to be set
     * and if that function returns false, then the back button is negated.
     * This was something I figured out by reading the docs lol. Saved me a lot
     * of time trying to hack the default of clicking the browser's back button
     *
     * handleConfirmDialog opens up the 'Leaving Confirmation' pop up wherein
     * I can control whether or not to push to history
     **/
    handleBrowserBack() {
        this.handleConfirmDialog();
        return false;
    }

    // Saves the palette and returns user to the palette list page
    handleAddPalette() {
        const { paletteName, emoji, colors } = this.state.paletteForm;

        const newPalette = {
            paletteName: paletteName,
            id: this.convertPaletteName(this.state.paletteForm.paletteName),
            emoji: emoji,
            colors: colors,
        };

        this.setState({ exitBlock: false }, () => {
            this.props.savePalette(newPalette);
            this.props.history.push("/");
        });
    }

    /**
     * Clears localStorage of the current palette being edited on and also
     * sets exitBlock off in order to allow for no confirmation for the <Prompt />
     * component, which prevents an infinite loop
     *
     * After, pushes to history and takes the user back to the palette list page
     **/

    handleExit() {
        localStorage.removeItem("currentEdit");
        this.setState({ exitBlock: false }, () => {
            this.props.history.push("/");
        });
    }

    // Clears the current palette list colors and closes out the edit menu
    clearPalette() {
        this.setState(
            {
                paletteForm: {
                    paletteName: "",
                    colors: [],
                    emoji: "",
                },
            },
            () => {
                this.cancelEdit();
            }
        );
    }

    /**
     * Updates the current palette of colors being worked on with a new array
     * and then resets the currentEdit in lS with the new array
     **/
    setPalette(array) {
        this.setState(
            {
                paletteForm: {
                    colors: array,
                },
            },
            () => {
                localStorage.setItem(
                    "currentEdit",
                    JSON.stringify(this.state.paletteForm.colors)
                );
            }
        );
    }

    /**
     * Opens the edit menu, will close the edit menu if color box clicked on is 
     * the same one being edited
     **/
    selectColor(color) {
        if (color === this.state.editColor.originalColor) {
            this.cancelEdit();
            return;
        }

        this.setState({
            editColor: {
                edit: true,
                color: color,
                originalColor: color,
            },
        });
    }

    // Changes the color preview of the color to be edited to via color picker
    changeColor(color) {
        this.setState({
            editColor: {
                ...this.state.editColor,
                color: color,
            },
        });
    }

    // Closes and resets the edit menu 
    cancelEdit() {
        this.setState({
            editColor: {
                ...this.state.editColor,
                edit: false,
                originalColor: "#fffff2",
            },
        });
    }

    // Finalizes the edited color to the new color and saves change in lS 
    updateColor(originalColor, newColor) {
        if (originalColor === newColor) {
            this.cancelEdit();
            return;
        }

        const { paletteForm } = this.state;

        const newColors = paletteForm.colors.map((color) => {
            if (color === originalColor) {
                return newColor;
            } else {
                return color;
            }
        });

        this.setState(
            {
                paletteForm: {
                    colors: newColors,
                },
            },
            () => {
                this.cancelEdit();
                localStorage.setItem(
                    "currentEdit",
                    JSON.stringify(this.state.paletteForm.colors)
                );
            }
        );
    }

    // Adds a color onto the palette's color array 
    updatePalette(color) {
        this.setState({
            paletteForm: {
                colors: [...this.state.paletteForm.colors, color],
            },
        });
    }

    /** 
     * Function required to allow for draggability of colorboxes, saves new 
     * arrangement in lS
     **/
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(
            (prev) => ({
                paletteForm: {
                    ...prev.paletteForm,
                    colors: arrayMove(
                        prev.paletteForm.colors,
                        oldIndex,
                        newIndex
                    ),
                },
            }),
            () => {
                localStorage.setItem(
                    "currentEdit",
                    JSON.stringify(this.state.paletteForm.colors)
                );
            }
        );
    };

    render() {
        const {
            showSidebar, // Boolean: indicates whether to open sidebar
            showSubmission, // String: indicates which pop up prompt to open
            exitBlock, // Boolean: indicates whether to trigger <Prompt />
            editColor, // Object: {str: color, str: originalColor, bool: edit}
            paletteForm: {
                colors, // String Array: name of colors (hex, rgb, rgba)
                paletteName // String: 'Material UI Colors'
            },
        } = this.state;

        return (
            <div className="NewPaletteForm">
                {/* Prompt to stop the user from leaving an unsaved palette */}
                <Prompt when={exitBlock} message={this.handleBrowserBack} />

                {/* Pop up for clicking 'Save Palette' */}
                <PaletteSubmitForm
                    open={showSubmission}
                    paletteName={paletteName}
                    handleCloseInput={this.handleCloseInput}
                    handleOnTextChange={this.handleOnTextChange}
                    handleEmojiChange={this.handleEmojiChange}
                    handleEmojiDialog={this.handleEmojiDialog}
                />

                {/* Main Content of New Palette */}
                <main
                    className={`NewPaletteForm__main ${showSidebar && "show"}`}
                >
                    {/* Navbar */}
                    <NewPaletteNav
                        open={showSubmission}
                        showSidebar={showSidebar}
                        isEmpty={colors.length === 0}
                        handleSidebarToggle={this.handleSidebarToggle}
                        handleOpenInput={this.handleOpenInput}
                        handleCloseInput={this.handleCloseInput}
                        handleConfirmDialog={this.handleConfirmDialog}
                        handleExit={this.handleExit}
                    />
                    {/* Holds the draggable colorboxes */}
                    <div className="NewPaletteForm__main__content">
                        <DraggableColorList
                            colors={colors}
                            editColor={editColor}
                            showSidebar={showSidebar}
                            handleDeleteColor={this.handleDeleteColor}
                            selectColor={this.selectColor}
                            onSortEnd={this.onSortEnd}
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
        );
    }
}
