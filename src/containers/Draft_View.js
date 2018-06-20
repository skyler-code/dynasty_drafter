import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import * as draftActions from "../store/draft/actions";
import * as routerActions from '../store/router/actions';
import * as draftSelectors from '../store/draft/reducer';
import PlayerPicker from "../components/PlayerPicker";
import CurrentPickInfo from "../components/CurrentPickInfo";
import DraftStatusTabs from "../components/DraftStatusTabs";

class DraftView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    state = {
        timer: null
    }

    render() {
        if(!this.props.playersArray) this.renderLoading();
        return (
        <div>
            <Grid columns={2} divided>
                <Grid.Column>
                    <Grid.Row>
                        <CurrentPickInfo
                            timeLeftString={this.props.timeLeftString}
                            isDraftInProgress={this.props.isDraftInProgress}
                            currentPick={this.props.currentPick}
                            currentRound={this.props.currentRound}
                            currentPickName={this.props.currentPickName}
                            nextPickName={this.props.nextPickName}
                            selectedPlayer={this.props.selectedPlayer}
                            bestAvailablePlayer={this.props.bestAvailablePlayer}/>
                    </Grid.Row>
                    <Grid.Row>
                        <PlayerPicker
                            playersArray={this.props.playersArray}
                            selectedPlayer={this.props.selectedPlayer}
                            onClick={this.onRowClick}
                            onDeselectClick={this.onDeselectClick}
                            canFinalizeSelection={this.props.canFinalizeSelection}
                            canDraftPlayer={this.props.canDraftPlayer}
                            finalizePlayerSelection={this.finalizePlayerSelection}
                            isDefenseEnabled={this.props.isDefenseEnabled}/>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                    <Grid.Row>
                        <DraftStatusTabs
                            currentPickName={this.props.currentPickName}
                            isDraftInProgress={this.props.isDraftInProgress}
                            draftStatusLeague={this.props.draftStatusLeague}
                            draftStatusTeam={this.props.draftStatusTeam}/>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
            <div>
                <Button
                    primary={!this.props.isDraftInProgress}
                    secondary={this.props.isDraftInProgress}
                    disabled={this.props.isDraftFinished}
                    onClick={() =>  this.startOrStopDraft()}>
                {(this.props.isDraftInProgress ? "Pause" : "Start") + " Draft"}
                </Button>
                <Button
                    primary={true}
                    onClick={() =>  this.resetDraft()}>
                Reset Draft
                </Button>
            </div>
        </div>
        );
    }

    renderLoading() {
        return (
            <p>Loading....</p>
        );
    }

    onRowClick(playerID) {
        this.props.dispatch(draftActions.selectPlayer(playerID));
    }

    onDeselectClick() {
        this.props.dispatch(draftActions.clearPlayerSelection());
    }

    startOrStopDraft() {
        if(this.props.isDraftInProgress){
            clearInterval(this.state.timer);
            this.props.dispatch(draftActions.endDraft());
            this.props.dispatch(routerActions.endDraft());
        } else {
            this.props.dispatch(draftActions.startDraft());
            this.props.dispatch(routerActions.startDraft());
            this.startTimer();
        }
    }

    resetDraft() {
        this.props.dispatch(draftActions.setInitialDraftData(true));
        this.props.dispatch(routerActions.endDraft());
    }

    tick() {
        if( this.props.timeLeft > 1 ){
            this.props.dispatch(draftActions.timerTick());
        } else {
            this.props.dispatch(draftActions.finalizePlayerSelection());
        }
        if ( !this.props.isDraftInProgress ){
            clearInterval(this.state.timer);
            if(this.props.isDraftFinished)
                this.props.dispatch(routerActions.showResults());
        }
    }

    finalizePlayerSelection(){
        this.props.dispatch(draftActions.finalizePlayerSelection());
        this.startTimer();
    }

    startTimer(){
        if( this.state.timer )
            clearInterval(this.state.timer);
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
    }
}

    function mapStateToProps(state) {
        const { timeLeft, secondsLeft, timeLeftString, percentValue } = draftSelectors.getTimeLeftInfo(state);
        return {
            timeLeft,
            timeLeftString,
            percentValue,
            secondsLeft,
            playersArray: draftSelectors.getAvailablePlayersForView(state),
            selectedPlayer: draftSelectors.getSelectedPlayer(state),
            canFinalizeSelection: draftSelectors.isTopicSelectionValid(state),
            canDraftPlayer: draftSelectors.canDraftPlayer(state),
            isDraftInProgress: draftSelectors.isDraftInProgress(state),
            bestAvailablePlayer: draftSelectors.getBestAvailablePlayer(state),
            currentPickName: draftSelectors.getCurrentPickName(state),
            nextPickName: draftSelectors.getNextPickName(state),
            currentPick: draftSelectors.getCurrentPickForView(state),
            currentRound: draftSelectors.getCurrentRound(state),
            draftStatusLeague: draftSelectors.getDraftStatusLeague(state),
            draftStatusTeam: draftSelectors.getDraftStatusTeam(state),
            isDraftFinished: draftSelectors.isDraftFinished(state),
            isDefenseEnabled: draftSelectors.isDefenseEnabled(state)
        };
    }

export default connect(mapStateToProps)(DraftView);