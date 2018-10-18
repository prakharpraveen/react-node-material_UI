import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


class FormDialog extends Component {

    render() {
        const { isOpen, handleClose, onSubscribe, isBtn, title, btnName } = this.props;
        return (
            <div>
                <Dialog
                    open={isOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button disabled={isBtn} onClick={() => onSubscribe()} color="primary">
                            {btnName}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default FormDialog;