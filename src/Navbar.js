import React, { Component } from 'react';
import { 
  Select, 
  MenuItem, 
  FormControl, 
  Snackbar, 
  IconButton 
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.scss';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbar: false,
      format: "hex"
    }

    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleFormatChange(e) {
    this.setState({ format: e.target.value }, () => {
      this.setState({ snackbar: true })
    });
    this.props.changeFormat(e.target.value);
  }

  handleClose() {
    this.setState({ snackbar: false });
  }

  render() {
    const { brightness, changeLevel, singleColorPalette = false } = this.props;
    const { snackbar, format } = this.state;

    return (
      <div className="Navbar">
        <div className="Navbar__title">
          <Link to="/">
            react colors
          </Link>
        </div>
        <div className="slider-container">
          <div className="level">{brightness}</div>
          {
            !singleColorPalette &&
            <div className="slider">
              <Slider 
                min={100} 
                max={800} 
                step={100} 
                defaultValue={brightness}
                onChange={changeLevel}
                />
            </div>
          }
        </div>
        <div className="select-container">
          <FormControl className="form">
            <Select value={format} onChange={this.handleFormatChange}>
              <MenuItem value="hex">HEX - #ffffff </MenuItem>
              <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem> 
              <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
            </Select>
          </FormControl>
        </div>
        
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={snackbar}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message={<span className="snackbar-msg">Format changed to {format.toUpperCase()}</span>}
          action={
            <>
              <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      </div>
    )
  }
}
