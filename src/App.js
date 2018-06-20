import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import { isDraftFinished, isDraftInProgress } from './store/draft/reducer';
import { successfulImport } from './store/leagueImport/reducer';
import { draftArrayExists } from './store/setup/reducer';
import { Tab } from 'semantic-ui-react';
import DraftView from './containers/Draft_View';
import ImportView from './containers/Import_View';
import SetupView from './containers/Setup_View';
import ResultsView from './containers/Results_View';
import './App.css';


class App extends Component {

    render() {
        const importPane = {
            menuItem: 'Import',
            render: () =>
                <Tab.Pane textAlign='center'>
                    <div>
                        <ImportView/>
                    </div>
                </Tab.Pane>
        };
        const setupPane = {
            menuItem: 'Setup',
            render: () =>
                <Tab.Pane>
                    <div>
                        <SetupView/>
                    </div>
                </Tab.Pane>
        };
        const draftPane = {
            menuItem: 'Draft',
            render: () =>
                <Tab.Pane>
                    <div>
                        <DraftView/>
                    </div>
                </Tab.Pane>
        };
        const resultPane = {
            menuItem: 'Results',
            render: () =>
                <Tab.Pane>
                    <div>
                        <ResultsView/>
                    </div>
                </Tab.Pane>
        };
        let displayPanes = function(){
            let panes = [importPane];
            /*if ( !this.props.isDraftInProgress )
                panes.push( importPane );*/
            if( this.props.successfulImport )
                panes.push( setupPane );
            if( this.props.draftArrayExists )
                panes.push( draftPane );
            if( this.props.draftFinished )
                panes.push( resultPane );
            return panes;
        }.bind( this );
        return (
            <div className="App">
                <Helmet>
                    <style>{'body { background-color: #D3D3D3; }'}</style>
                </Helmet>
                <Tab panes={ displayPanes() }/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        draftFinished: isDraftFinished(state),
        successfulImport: successfulImport(state),
        draftArrayExists: draftArrayExists(state),
        isDraftInProgress: isDraftInProgress(state)
    };
}

export default connect(mapStateToProps)(App);