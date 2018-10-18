import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import AddUser from './tabs/AddUser';
import TabularView from './tabs/TabularView';
import AnalyticalView from "./tabs/AnalyticalView";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
});

class NavBar extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    if (value === 0) {
      this.props.closeNavBar();
    }
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Home" icon={<HomeIcon />} />
            <Tab label="Add User" />
            <Tab label="Tabular View" />
            <Tab label="Analitical View" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>Home</TabContainer>
          <TabContainer dir={theme.direction}><AddUser /></TabContainer>
          <TabContainer dir={theme.direction}><TabularView /></TabContainer>
          <TabContainer dir={theme.direction}><AnalyticalView hhhhh /></TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavBar);