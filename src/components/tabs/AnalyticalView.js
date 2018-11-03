import React, { Component } from "react";
import BarChart from "react-bar-chart";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const styles = theme => ({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    }
  });

class componentName extends Component {
    state = {
        width: 900,
        select: "age"
    };
    componentDidMount = () => {
        window.onresize = () => {
            if (Object.keys(this.refs).length === 0) {
                return;
            }
            this.setState({ width: this.refs.root.offsetWidth });
        };
    };

    handleBarClick = (element, id) => {
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    };


    handleChange = event => {
        this.setState({ select: event.target.value });
      };
    

    data = () => {
        let { userData } = this.props;
        const { select } = this.state;
        let chartData = {};
        userData.users.forEach(element => {
            chartData[element.email] =
                chartData[element.email] === undefined
                    ? parseInt(element[select])
                    : chartData[element.email] + parseInt(element[select]);
        });

        let userDetails = [];
        for (var property1 in chartData) {
            userDetails.push({ text: property1, value: chartData[property1] });
        }
        return userDetails;
    };

    render() {
        const { classes } = this.props;
        const data = this.data();
        const { width, select } = this.state;
        console.log(this.state);
        

        return (
            <div ref="root">
                <Typography variant="h6" gutterBottom>
                    {select === "age" ? "Sum of Age" : "Sum of Weight" }
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple"> Chart Type </InputLabel>
                    <Select
                        value={select}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'age',
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem value="age">Age</MenuItem>
                        <MenuItem value="weight">Weight</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ width: "45%" }}>
                    <BarChart 
                        ylabel={select === "age" ? "Age in Years" : "Weight in Kg" }
                        width={width}
                        height={450}
                        margin={margin}
                        data={data}
                        onBarClick={this.handleBarClick}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { userData: state.userReducer };
};

export default withStyles(styles)(
    connect(mapStateToProps)(componentName)
)

