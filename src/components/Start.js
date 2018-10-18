import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import FormDialog from "./../reusableComponents/FormDialog";
import NavBar from "./NavBar";
import { setAuthorAction } from "./../actions/authorAction";

class Start extends React.Component {
    state = {
        open: false,
        showNavBar: false,
        email: "",
        isBtn: true
    };

    onSubscribe = () => {
        const { email } = this.state;
        const { setAuthorAction } = this.props;
        this.setState({ showNavBar: true, open: false });
        setAuthorAction(email);
    };

    closeNavBar = () => {
        this.setState({ showNavBar: false });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    emailHandler = e => {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            email: e.target.value,
            isBtn: !emailRegEx.test(e.target.value)
        });
    };

    render() {
        const { open, showNavBar, email, isBtn } = this.state;
        return (
            <div>
                {!showNavBar && (
                    <div>
                        <Button  onClick={this.handleClickOpen} variant="contained" size="large" color="primary" >Start Application</Button>
                        <FormDialog
                            isBtn={isBtn}
                            isOpen={open}
                            handleClose={this.handleClose}
                            onSubscribe={this.onSubscribe}
                            title="Subscribe"
                            btnName="Submit"
                        >
                            <DialogContentText>
                                To start this application, please enter your email address here.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                value={email}
                                label="Email Address"
                                type="email"
                                onChange={this.emailHandler}
                                fullWidth
                            />
                        </FormDialog>
                    </div>
                )}
                {showNavBar && <NavBar closeNavBar={this.closeNavBar} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { setAuthorAction })(Start);