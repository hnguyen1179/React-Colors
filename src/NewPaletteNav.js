import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './NewPaletteForm.scss'

export default class NewPaletteNav extends Component {

  render() {
    const { 
      showSidebar, 
      handleSidebarToggle, 
      handleOpenInput,
      handleCloseInput,
      handleConfirmDialog,
      open,
      handleExit
    } = this.props;

    const renderShowTool = (
      <div className="toggle-sidebar-nav" onClick={handleSidebarToggle}>
        show tool
      </div>
    )

    return (
      <nav className="NewPaletteForm__main__nav">
        <div className="NewPaletteForm__main__nav__content">
          <div className="NewPaletteForm__main__nav__content--left">
            {!showSidebar && renderShowTool} 
            <div className={`title ${showSidebar && 'show'}`}>
              create palette
            </div>
          </div>

          <div className="NewPaletteForm__main__nav__content--right">
            <button onClick={handleConfirmDialog}>
              Go Back
            </button>
            <button onClick={handleOpenInput}>Save Palette</button>
          </div>
        </div>

        <Dialog
          open={open === 'pickConfirm'}
          onClose={handleCloseInput}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Leave without saving palette?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Any work done on an unsaved palette will be lost. Are you sure you want to leave without saving?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleExit} color="primary">
              Leave
            </Button>
            <Button onClick={handleCloseInput} color="primary" autoFocus>
              Stay
            </Button>
          </DialogActions>
        </Dialog>
      </nav>
    )
  }
}
