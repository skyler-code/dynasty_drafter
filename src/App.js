import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as router from './store/router/reducer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DraftView from './containers/Draft_View';
import ImportView from './containers/Import_View';
import SetupView from './containers/Setup_View';
import './App.css';
import 'react-tabs/style/react-tabs.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab >Import</Tab>
            <Tab>Setup</Tab>
            <Tab>Draft</Tab>
            <Tab>Results</Tab>
          </TabList>
          <TabPanel>
            <ImportView/>
          </TabPanel>
          <TabPanel>
            <SetupView/>
          </TabPanel>
          <TabPanel>
            <DraftView/>
          </TabPanel>
          <TabPanel></TabPanel>
        </Tabs>
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    currentTab: router.getCurrentTab(state)
  };
}

export default connect(mapStateToProps)(App);