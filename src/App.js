import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as routerSelectors from './store/router/reducer';
import * as routerActions from './store/router/actions';
import  * as draftSelectors from './store/draft/reducer';
import { successfulImport } from './store/leagueImport/reducer';
import { draftArrayExists } from './store/setup/reducer';
import * as setupActions from './store/setup/actions';
import { Tab } from 'semantic-ui-react';
import DraftView from './containers/Draft_View';
import ImportView from './containers/Import_View';
import SetupView from './containers/Setup_View';
import ResultsView from './containers/Results_View';
import './App.css';
import * as draftActions from "./store/draft/actions";


class App extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
       window.addEventListener("beforeunload", this.onUnload)
    }

    onUnload = (e) => {
        if( this.props.successfulImport )
            e.returnValue = 0;
    };

    displayPanes = () => {
        const importPane = {
            menuItem: 'Import',
            pane:
                <Tab.Pane textAlign='center' key='Import'>
                    <div>
                        <ImportView/>
                    </div>
                </Tab.Pane>
        };
        const setupPane = {
            menuItem: 'Setup',
            pane:
                <Tab.Pane key='Setup'>
                    <div>
                        <SetupView/>
                    </div>
                </Tab.Pane>
        };
        const draftPane = {
            menuItem: 'Draft',
            pane:
                <Tab.Pane key='Draft'>
                    <div>
                        <DraftView/>
                    </div>
                </Tab.Pane>
        };
        const resultPane = {
            menuItem: 'Results',
            pane:
                <Tab.Pane key='Results'>
                    <div>
                        <ResultsView/>
                    </div>
                </Tab.Pane>
        };

        let panes = [];
        const draftNotInProgress = !this.props.isDraftInProgress;
        if ( this.props.draftFinished )
            panes.push( resultPane );
        else {
            if( draftNotInProgress )
                panes.push( importPane );
            if( this.props.successfulImport ){
                if( draftNotInProgress )
                    panes.push( setupPane );
                if( this.props.draftArrayExists )
                    panes.push( draftPane );
            }
        }
        return panes;
    };

    render() {
        return (
            <div className="App">
                <Helmet>
                    <style>{'body { background-color: #D3D3D3; }'}</style>
                </Helmet>
                <Tab renderActiveOnly={false} activeIndex={this.props.activeIndex} panes={this.displayPanes()} onTabChange={this.setActiveIndex}/>
            </div>
        );
    }

    setActiveIndex( e, t ){
        if ( t.panes[t.activeIndex].menuItem === 'Draft' && !this.props.draftTabLoaded ){
            this.props.dispatch(draftActions.setInitialDraftData());
            this.props.dispatch(setupActions.resetSettingsChanged());
        }
        this.props.dispatch( routerActions.setActiveIndex( t.activeIndex ) );
    }
}

function mapStateToProps(state) {
    return {
        activeIndex: routerSelectors.getActiveIndex(state),
        draftFinished: draftSelectors.isDraftFinished(state),
        successfulImport: successfulImport(state),
        draftArrayExists: draftArrayExists(state),
        isDraftInProgress: draftSelectors.isDraftInProgress(state),
        draftTabLoaded: draftSelectors.draftArrayExists(state)
    };
}

export default connect(mapStateToProps)(App);