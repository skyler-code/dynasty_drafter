// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import * as draftActions from "../store/draft/actions";
import * as draftSelectors from '../store/draft/reducer';
import PlayerPicker from "../components/PlayerPicker";
import PlayerViewer from "../components/PlayerViewer";

class DraftView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        if(!this.props.playersArray)
            this.props.dispatch(draftActions.getAvailablePlayers());
    }

    render() {
        if(!this.props.playersArray) this.renderLoading();
        return (
        <div>
            <Grid columns={2} divided>
                <Grid.Row>
                      <Grid.Column>
                        <PlayerPicker
                            playersArray={this.props.playersArray}
                            selectedPlayer={this.props.selectedPlayer}
                            onClick={this.onRowClick}
                            onDeselectClick={this.onDeselectClick}
                            canFinalizeSelection={this.props.canFinalizeSelection}/>
                      </Grid.Column>
                      <Grid.Column>
                        <PlayerViewer
                            selectedPlayer={this.props.selectedPlayer}/>
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
}

    function mapStateToProps(state) {
        return {
            playersArray: draftSelectors.getPlayersForView(state),
            selectedPlayer: draftSelectors.getSelectedPlayer(state),
            canFinalizeSelection: draftSelectors.isTopicSelectionValid(state)
        };
    }

export default connect(mapStateToProps)(DraftView);

/**/