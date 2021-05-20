import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart'

import 'emoji-mart/css/emoji-mart.css'


class PaletteSubmitForm extends Component {

  render() {
    const { 
      open, 
      handleCloseInput, 
      handleOnTextChange, 
      handleEmojiChange,
      handleEmojiDialog, 
      paletteName
    } = this.props;

    return (
      <>
        <Dialog className="PaletteSubmitForm" open={open === 'pickPaletteName'} onClose={handleCloseInput} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Palette Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a palette name for your new palette. Make sure it's unique!
            </DialogContentText>
            <ValidatorForm onSubmit={handleEmojiDialog}>
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
              <Button onClick={handleCloseInput} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Next
              </Button>
            </DialogActions>
          </ValidatorForm>
          </DialogContent>
        </Dialog>

        <Dialog open={open === 'pickEmoji'} onClose={handleCloseInput}>
          <DialogTitle id="form-dialog-title">Emoji</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pick an emoji to represent your new palette
            </DialogContentText>
            <Picker onClick={handleEmojiChange}/>
          </DialogContent>
        </Dialog>
      </>
    )
  }
};

export default PaletteSubmitForm

