// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as setupSelectors from "../store/setup/reducer";
import * as setupActions from "../store/setup/actions";
import DraftPreview from "../components/DraftPreview";
import DraftOrderSorter from "../components/DraftOrderSorter";

class SetupView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        if( ( !this.props.draftArray || !this.props.draftArray.length) )
            this.props.dispatch( setupActions.getInitialDraftInfo() );
    }

    render() {
        return (
            <div>
                <Tabs defaultIndex={0}>
                  <TabList>
                    <Tab>Settings</Tab>
                    <Tab>Trade</Tab>
                  </TabList>
                  <TabPanel>
                    <Form>
                        <Form.Group>
                            <Form.Input
                                label='Number of Rounds (4-8)'
                                control='input'
                                type='number'
                                min={4}
                                max={8}
                                value={this.props.numOfRounds}
                                onChange={this.handleNumOfRounds} />
                            <Form.Input
                                label='Seconds Per Pick'
                                control='input'
                                type='number'
                                value={this.props.secondsPerPick}
                                onChange={this.handleSecondsPerPicks} />
                        </Form.Group>
                    </Form>
                    <DraftOrderSorter
                        forceDraftPreviewUpdate={this.forceDraftPreviewUpdate}/>
                  </TabPanel>
                  <TabPanel>
                    <DraftPreview
                        draftArray={this.props.draftArray}
                        draftOrder={this.props.draftOrder}
                        teamNames={this.props.teamNames}
                        numOfTeams={this.props.numOfTeams}
                        handlePickTrade={this.handlePickTrade}
                        createDraftArray={this.createDraftArray}
                        unloadDraftArray={this.unloadDraftArray}/>
                  </TabPanel>
                </Tabs>
            </div>
        );
    }

    handlePickTrade(index, tradedTo){
        this.props.dispatch( setupActions.makeDraftTrade( index, tradedTo ) );
    }

    handleNumOfRounds( val ){
        this.props.dispatch( setupActions.updateNumberOfRounds( val.target.value ) );
    }

    handleSecondsPerPicks( val ){
        this.props.dispatch( setupActions.updateSecondsPerPick( val.target.value ) );
    }

    createDraftArray(){
        this.props.dispatch( setupActions.createDraftArray() );
    }

    unloadDraftArray(){
        this.props.dispatch( setupActions.unloadDraftArray() );
    }

}

function mapStateToProps(state) {
    const { draftOrder, teamNames } = setupSelectors.getDraftOrder(state);
    const numOfTeams = setupSelectors.getNumberOfTeams(state);
    const draftArray = setupSelectors.getDraftArrayForView(state);
    const numOfRounds = setupSelectors.getNumOfRounds(state);
    const secondsPerPick = setupSelectors.getSecondsPerPick(state);
    return {
        draftOrder,
        teamNames,
        draftArray,
        numOfTeams,
        numOfRounds,
        secondsPerPick
    };
}

export default connect(mapStateToProps)(SetupView);