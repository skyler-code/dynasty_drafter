import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';
//import * as router from './store/router/reducer';
import { isDraftFinished } from './store/draft/reducer';
import { Tab } from 'semantic-ui-react';
import DraftView from './containers/Draft_View';
import ImportView from './containers/Import_View';
import SetupView from './containers/Setup_View';
import ResultsView from './containers/Results_View';
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
                        <div>
                            <ResultsView/>
                        </div>
                    </Tab.Pane>
            }
        ];
        const panes2 = _.initial(panes);
        return (
            <div className="App">
                <Helmet>
                    <style>{'body { background-color: #D3D3D3; }'}</style>
                </Helmet>
                <Tab panes={ this.props.draftFinished ? panes : panes2 } renderActiveOnly={true}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        draftFinished: isDraftFinished(state)
    };
}

export default connect(mapStateToProps)(App);