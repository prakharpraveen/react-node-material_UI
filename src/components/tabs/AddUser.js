import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { addUserDataAction } from './../../actions/userAction';
import { connect } from 'react-redux';

const styles = theme => ({

    root: {
        ...theme.mixins.gutters(),
        backgroundColor: "#d1d1d1"
    },
    div: {
        paddingLeft: "19%",
        paddingRight: "19%",
        paddingTop: "2%",
    }
});

class AddUser extends Component {
    state = {
        name: '',
        age: '',
        weight: '',
        email: '',
        isBtn: true

    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    onClose = () => this.setState({ name: '', age: '', weight: '', email: '', isBtn: true});

    onSubmit = () => {
        const { addUserDataAction, author } = this.props;
        addUserDataAction({ ...this.state, author });
        this.onClose();
    };
    handleEmail = (e) => {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({email: e.target.value, isBtn: !emailRegEx.test(e.target.value)})
    }

    render() {
        const { classes, author } = this.props;
        const { name, age, weight, email, isBtn } = this.state;
        return <div className={classes.div}>
            <Paper className={classes.root} elevation={1}>
                <TextField id="standard-name" label="Name" className={classes.textField} value={name} onChange={this.handleChange("name")} margin="normal" />
            </Paper>
            <Paper className={classes.root} elevation={1}>
                <TextField id="standard-age" label="Age" type="number" className={classes.textField} value={age} onChange={this.handleChange("age")} margin="normal" />
            </Paper>
            <Paper className={classes.root} elevation={1}>
                <TextField id="standard-weight" label="Weight" type="number" className={classes.textField} value={weight} onChange={this.handleChange("weight")} margin="normal" />
            </Paper>
            <Paper className={classes.root} elevation={1}>
                <TextField id="standard-email" label="Email" className={classes.textField} value={email} onChange={this.handleEmail} margin="normal" />
            </Paper>
            <Paper className={classes.root} elevation={1}>
                <TextField id="standard-author" label="Author" disabled className={classes.textField} value={author} margin="normal" />
            </Paper>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={this.onClose} className={classes.button}>
                    Close
                </Button>
                <Button variant="contained" color="primary"  disabled={isBtn} onClick={this.onSubmit} className={classes.button}>
                    Submit
                </Button>
            </DialogActions>
        </div>;
    }
}

const mapStateToProps = state => ({ author: state.authorReducer.email });

export default withStyles(styles)(
    connect(mapStateToProps, { addUserDataAction })(AddUser)
)