import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';
import EditIcon from '@material-ui/icons/Edit';
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from '@material-ui/core/TextField';
import FormDialog from './../../reusableComponents/FormDialog';
import { getUsersAction, deleteUserAction, editUserAction } from './../../actions/userAction';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    paper: {
        ...theme.mixins.gutters(),
        backgroundColor: "#d1d1d1"
    },
    table: {
        minWidth: '100%',
    },
});

class TabularView extends Component {

    state = {
        isEdit: false,
        isDelete: false,
        _id: "",
        name: '',
        age: '',
        weight: '',
        email: '',
        author: '',
        setEmail:''
    };
    componentDidMount() {
        const { getUsersAction } = this.props;
        getUsersAction();
    }

    actionHandler = (actionName, _id, user = {}) => {
        const { name = '', age = '', weight = '', email = '', author = '' } = user;
        this.setState({ [actionName]: !this.state[actionName], _id, name, age, weight, email, author })
    }

    handleClose = () => {
        const { isEdit, isDelete } = this.state;
        if (isEdit) {
            this.setState({ isEdit: false, _id: "" })
        }
        if (isDelete) {
            this.setState({ isDelete: false, _id: "" })
        }
    }

    onEdit = () => {
        const { _id, name, age, weight, email, author } = this.state;
        const { editUserAction } = this.props;
        editUserAction(_id, name, age, weight, email, author);
        this.handleClose();
    }

    onDelete = () => {
        const { _id } = this.state;
        const { deleteUserAction } = this.props;
        deleteUserAction(_id);
        this.handleClose();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleEmail = (e) => {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({email: e.target.value, isBtn: !emailRegEx.test(e.target.value)})
    }

 
    searchEmail = (event) => {
        this.setState({setEmail:event.target.value }, () => {
            const { getUsersAction } = this.props;
            const { setEmail } = this.state;
            getUsersAction(setEmail);
        })
        
    }


    render() {
        const { classes, userData } = this.props;
        const { isDelete, isEdit, name, age, weight, email, author, setEmail } = this.state;
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name </TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Weight</TableCell>
                                <TableCell>
                                    Email
                                <TextField id="standard-name" label="Email" className={classes.textField} value={setEmail} onChange={this.searchEmail} margin="normal" />

                                </TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.users.map((user, index) => {
                                return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {user.name}
                                            </TableCell>
                                            <TableCell>{user.age}</TableCell>
                                            <TableCell>{user.weight}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.author}</TableCell>
                                            <TableCell>
                                                <DeleteIcon onClick={() => this.actionHandler("isDelete", user._id)} />
                                                <EditIcon onClick={() => this.actionHandler("isEdit", user._id, user)} />
                                            </TableCell>
                                        </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <FormDialog
                    isBtn={false}
                    isOpen={isEdit || isDelete}
                    handleClose={this.handleClose}
                    onSubscribe={isEdit ? this.onEdit: this.onDelete}
                    title={isDelete ? "Delete Data" : "Edit Data"}
                    btnName={isDelete ? "delete" : "edit"}
                >
                    {isDelete &&
                        <DialogContentText>
                            Are You Sure ?
                        </DialogContentText>
                    }

                    {isEdit &&
                        <DialogContentText>
                            <Paper className={classes.paper} elevation={1}>
                                <TextField id="standard-name" label="Name" className={classes.textField} value={name} onChange={this.handleChange("name")} margin="normal" />
                            </Paper>
                            <Paper className={classes.paper} elevation={1}>
                                <TextField id="standard-age" label="Age" type="number" className={classes.textField} value={age} onChange={this.handleChange("age")} margin="normal" />
                            </Paper>
                            <Paper className={classes.paper} elevation={1}>
                                <TextField id="standard-weight" label="Weight" type="number" className={classes.textField} value={weight} onChange={this.handleChange("weight")} margin="normal" />
                            </Paper>
                            <Paper className={classes.paper} elevation={1}>
                                <TextField id="standard-email" label="Email" className={classes.textField} value={email} onChange={this.handleEmail} margin="normal" />
                            </Paper>
                            <Paper className={classes.paper} elevation={1}>
                                <TextField id="standard-author" label="Author" disabled className={classes.textField} value={author} margin="normal" />
                            </Paper>
                        </DialogContentText>
                    }
                </FormDialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({ userData: state.userReducer })

export default withStyles(styles)(
    connect(mapStateToProps, { getUsersAction, deleteUserAction, editUserAction })(TabularView)
)