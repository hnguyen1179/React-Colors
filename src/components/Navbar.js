import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Select,
    MenuItem,
    FormControl,
    Snackbar,
    IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snackbar: false,
            format: "hex",
        };

        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    // Handles changing of format
    handleFormatChange(e) {
        // This part changes the design of the navbar
        this.setState({ format: e.target.value }, () => {
            this.setState({ snackbar: true });
        });

        // This part changes the data fed into this page; new format changed
        this.props.changeFormat(e.target.value);
    }

    // Closes snackbar
    handleClose() {
        this.setState({ snackbar: false });
    }

    render() {
        const {
            brightness, // Integer: denotes brightness of palette; default 400.
            changeLevel, // Function: adjusts level of brightness w/ slider 
            singleColorPalette = false, // Boolean: indicate whether SCP 
        } = this.props;
        
        const {
            snackbar, // Boolean: indicates whether to open snackbar compoonent 
            format // String: format of the color (hex, rgb, rgba)
        } = this.state;

        return (
            <div className="Navbar">
                {/* Links to palette list page */}
                <div className="Navbar__title">
                    <Link to="/React-Colors">
                        <h2>React Colors</h2>
                    </Link>
                </div>

                {/* Slider to adjust the level of brightness of palette */}
                <div className="slider-container">
                    <div className="level">{brightness}</div>
                    {!singleColorPalette && (
                        <div className="slider">
                            <Slider
                                min={100}
                                max={800}
                                step={100}
                                defaultValue={brightness}
                                onChange={changeLevel}
                            />
                        </div>
                    )}
                </div>

                {/* Dropdown to change format to copy */}
                <div className="select-container">
                    <FormControl className="form">
                        <Select
                            value={format}
                            onChange={this.handleFormatChange}
                        >
                            <MenuItem value="hex">HEX</MenuItem>
                            <MenuItem value="rgb">RGB</MenuItem>
                            <MenuItem value="rgba">RGBA</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* Visual indicator that format has been changed */}
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={snackbar}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={
                        <span className="snackbar-msg">
                            Format changed to {format.toUpperCase()}
                        </span>
                    }
                    action={
                        <>
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    }
                />
            </div>
        );
    }
}
