import React, { Component } from "react";
import BarChart from "react-bar-chart";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
class componentName extends Component {
    state = {
        width: 900
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

    data = () => {
        let { userData } = this.props;
        let chartData = {};
        userData.users.forEach(element => {
            chartData[element.email] =
                chartData[element.email] === undefined
                    ? parseInt(element.age)
                    : chartData[element.email] + parseInt(element.age);
        });

        let userDetails = [];
        for (var property1 in chartData) {
            userDetails.push({ text: property1, value: chartData[property1] });
        }
        return userDetails;
    };

    render() {
        const data = this.data();
        const { width } = this.state;

        return (
            <div ref="root">
                <Typography variant="h6" gutterBottom>
                    Sum of Age
                </Typography>
                <div style={{ width: "45%" }}>
                    <BarChart
                        ylabel="Age in Years"
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

export default connect(mapStateToProps)(componentName);
