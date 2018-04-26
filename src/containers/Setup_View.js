// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Tab, Container } from 'semantic-ui-react';
import * as setupSelectors from "../store/setup/reducer";
import * as setupActions from "../store/setup/actions";
import DraftPreview from "../components/DraftPreview";
import DraftOptions from "../components/DraftOptions";
import DraftOrderSorter from "../components/DraftOrderSorter";

class SetupView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        if( ( !this.props.draftOrder || !this.props.draftOrder.length) )
            this.props.dispatch( setupActions.getInitialDraftInfo() );
    }



    render() {
        const panes = [
            {
                menuItem: 'Settings',
                render: () =>
                    <Tab.Pane textAlign='center'>
                        <div>
                        <Container textAlign='center'>
                        <DraftOptions
                            numOfRounds={this.props.numOfRounds}
                            handleNumOfRounds={this.handleNumOfRounds}
                            secondsPerPick={this.props.secondsPerPick}
                            handleSecondsPerPicks={this.handleSecondsPerPicks}
                            draftType={this.props.draftType}
                            updateDraftType={this.updateDraftType}/>
                        <DraftOrderSorter
                            draftOrder={this.props.draftOrder}
                            updateDraftOrder={this.updateDraftOrder}
                            shiftDraftOrder={this.shiftDraftOrder}/>
                        </Container>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'Trade',
                render: () =>
                    <Tab.Pane>
                        <DraftPreview
                            draftArray={this.props.draftArray}
                            teamNames={this.props.teamNames}
                            numOfTeams={this.props.numOfTeams}
                            handlePickTrade={this.handlePickTrade}
                            createDraftArray={this.createDraftArray}
                            unloadDraftArray={this.unloadDraftArray}/>
                    </Tab.Pane>
            }
        ];
        return (
            <div>
                <Tab panes={panes}/>
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

    updateDraftOrder( draftOrder ){
        this.props.dispatch( setupActions.updateDraftOrder( draftOrder ) )
    }

    shiftDraftOrder( index, newIndex ){
        this.props.dispatch( setupActions.shiftDraftOrder( index, newIndex ) );
    }

    unloadDraftArray(){
        this.props.dispatch( setupActions.unloadDraftArray() );
    }

    updateDraftType( snakeEnabled ){
        this.props.dispatch( setupActions.updateDraftType( snakeEnabled ) );
    }

}

function mapStateToProps(state) {
    const { draftOrder, teamNames } = setupSelectors.getDraftOrderForView(state);
    return {
        draftOrder,
        teamNames,
        draftArray: setupSelectors.getDraftArrayForView(state),
        numOfTeams: setupSelectors.getNumberOfTeams(state),
        numOfRounds: setupSelectors.getNumOfRounds(state),
        secondsPerPick: setupSelectors.getSecondsPerPick(state),
        draftType: setupSelectors.isSnakeDraftEnabled(state)
    };
}

export default connect(mapStateToProps)(SetupView);