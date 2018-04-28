import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as router from './store/router/reducer';
import { Tab } from 'semantic-ui-react';
import DraftView from './containers/Draft_View';
import ImportView from './containers/Import_View';
import SetupView from './containers/Setup_View';
import './App.css';


class App extends Component {

    render() {
        const panes = [
            {
                menuItem: 'Import',
                render: () =>
                    <Tab.Pane textAlign='center'>
                        <div>
                          <ImportView/>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'Setup',
                render: () =>
                    <Tab.Pane>
                        <div>
                            <SetupView/>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'Draft',
                render: () =>
                    <Tab.Pane>
                        <div>
                            <DraftView/>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'Results',
                render: () =>
                    <Tab.Pane>
                    </Tab.Pane>
            }
        ];
        return (
            <div className="App">
                <Tab panes={panes}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    currentTab: router.getCurrentTab(state)
  };
}

export default connect(mapStateToProps)(App);