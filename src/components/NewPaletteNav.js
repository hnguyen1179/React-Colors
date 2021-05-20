import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class NewPaletteNav extends Component {
    render() {
        const {
            showSidebar, // Boolean: indicates to show sidebar
            handleSidebarToggle, // Function: changes showSidebar boolean in parent
            handleOpenInput, // Function: handles opening any pop up 
            handleCloseInput, // Function: handles closing any pop up
            open, // Boolean: Condition to open 'Leave Confirmation' pop up 
            isEmpty, // Boolean: Prevents saving of an empty palette 
            handleExit, // Function: handles clicking 'Leave' within 'Leave Confirmation'
        } = this.props;

        // Button to prompt showing sidebar 
        const renderShowTool = (
            <div className="toggle-sidebar-nav" onClick={handleSidebarToggle}>
                show tool
            </div>
        );

        return (
            <nav className="NewPaletteForm__main__nav">
                <div className="NewPaletteForm__main__nav__content">
                    {/* Left Content of Nav; show tool button and page name */}
                    <div className="NewPaletteForm__main__nav__content--left">
                        {!showSidebar && renderShowTool}
                        <div className={`title ${showSidebar && "show"}`}>
                            Create Palette
                        </div>
                    </div>

                    {/* Right Content or Nav; save palette button */}
                    <div className="NewPaletteForm__main__nav__content--right">
                        <button
                            className="save-palette-button"
                            onClick={handleOpenInput}
                            disabled={isEmpty}
                        >
                            <div>Save Palette</div>
                        </button>
                    </div>
                </div>

                {/* 'Leave Confirmation' Pop Up */}
                <Dialog
                    open={open === "pickConfirm"}
                    onClose={handleCloseInput}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Leave without saving palette?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Any work done on an unsaved palette will be lost.
                            Are you sure you want to leave without saving?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleExit} color="primary">
                            Leave
                        </Button>
                        <Button
                            onClick={handleCloseInput}
                            color="primary"
                            autoFocus
                        >
                            Stay
                        </Button>
                    </DialogActions>
                </Dialog>
            </nav>
        );
    }
}
