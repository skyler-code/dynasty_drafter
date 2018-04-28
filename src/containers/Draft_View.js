// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import * as draftActions from "../store/draft/actions";
import * as draftSelectors from '../store/draft/reducer';
import PlayerPicker from "../components/PlayerPicker";
import PlayerViewer from "../components/PlayerViewer";
import DraftTimer from "../components/DraftTimer";

class DraftView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    state = {
        timer: null
    };

    componentDidMount() {
        if(!this.props.playersArray)
            this.props.dispatch(draftActions.setInitialDraftData());
    }

    render() {
        if(!this.props.playersArray) this.renderLoading();
        return (
        <div>
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <DraftTimer
                            timeLeftString={this.props.timeLeftString}
                            isDraftInProgress={this.props.isDraftInProgress}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                        <Grid.Column>
                            <PlayerPicker
                                playersArray={this.props.playersArray}
                                selectedPlayer={this.props.selectedPlayer}
                                onClick={this.onRowClick}
                                onDeselectClick={this.onDeselectClick}
                                canFinalizeSelection={this.props.canFinalizeSelection}
                                canDraftPlayer={this.props.canDraftPlayer}/>
                        </Grid.Column>
                        <Grid.Column>
                            <div>
                                <PlayerViewer
                                    selectedPlayer={this.props.selectedPlayer}/>
                            </div><br/>
                            <div>
                                <Button
                                    primary={!this.props.isDraftInProgress}
                                    secondary={this.props.isDraftInProgress}
                                    onClick={() =>  this.startOrStopDraft()}>
                                {(this.props.isDraftInProgress ? "Stop" : "Start") + " Draft"}
                                </Button>
                            </div>
                      </Grid.Column>
                </Grid.Row>
            </Grid>
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

    startOrStopDraft(e) {
        if(this.props.isDraftInProgress){
            this.props.dispatch(draftActions.setInitialDraftData());
        } else {
            this.props.dispatch(draftActions.startDraft());
            let timer = setInterval(this.tick, 1000);
            this.setState({timer});
        }
    }

    tick() {
        if( this.props.isDraftInProgress ){
            this.props.dispatch(draftActions.timerTick());
        } else {
            clearInterval(this.state.timer);
        }
    }
}

    function mapStateToProps(state) {
        const { timeLeft, secondsLeft, timeLeftString, percentValue } = draftSelectors.getTimeLeftInfo(state);
        return {
            timeLeft,
            timeLeftString,
            percentValue,
            secondsLeft,
            playersArray: draftSelectors.getPlayersForView(state),
            selectedPlayer: draftSelectors.getSelectedPlayer(state),
            canFinalizeSelection: draftSelectors.isTopicSelectionValid(state),
            canDraftPlayer: draftSelectors.canDraftPlayer(state),
            isDraftInProgress: draftSelectors.isDraftInProgress(state)
        };
    }

export default connect(mapStateToProps)(DraftView);

/**/