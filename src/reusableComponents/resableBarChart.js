import React, { Component } from 'react';

const margin = { top: 20, right: 20, bottom: 30, left: 40 };


class resableBarChart extends Component {
    render() {
        return (
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
        )
    }
}

export default resableBarChart;