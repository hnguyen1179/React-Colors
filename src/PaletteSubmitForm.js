import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import './PaletteSubmitForm.scss';


class PaletteSubmitForm extends Component {

  render() {
    const { 
      paletteName, 
      emoji, 
      open, 
      handleClose, 
      handleOnTextChange, 
      handleEmojiChange,
      handleAddPalette 
    } = this.props;

    return (
      <>
        <Dialog className="PaletteSubmitForm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Naming Your Palette</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a palette name for your new palette. Make sure it's unique!
            </DialogContentText>
            <ValidatorForm
              onSubmit={handleAddPalette}
              >
              <TextValidator
              label="Palette Name"
                value={paletteName ?? ""}
                onChange={handleOnTextChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Name cannot be blank", "Cannot have duplicate palette names"]}
                fullWidth
                margin="normal"
              />    
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </ValidatorForm>
          </DialogContent>
        </Dialog>
      </>
    )
  }
};

export default PaletteSubmitForm

