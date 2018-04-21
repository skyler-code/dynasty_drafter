// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as draftActions from '../store/draft/actions';
import * as draftSelectors from '../store/draft/reducer';
import * as importSelectors from '../store/leagueImport/reducer';
import 'react-tabs/style/react-tabs.css';
import PlayerPicker from "../components/PlayerPicker";

class DraftView extends Component {

constructor(props) {
    super(props);
    autoBind(this);
}

componentDidMount() {
}

render() {
    return (
        <PlayerPicker
                playersArray={this.props.playersArray}
                selectedPlayer={this.props.selectedPlayer}
                onClick={this.onRowClick}
                onDeselectClick={this.onDeselectClick}
                canFinalizeSelection={this.props.canFinalizeSelection}/>
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
  const playersArray = importSelectors.getPlayersForView(state);
  return {
    playersArray,
    selectedPlayer: draftSelectors.getSelectedPlayer(state),
    canFinalizeSelection: draftSelectors.isTopicSelectionValid(state)
  };
}

export default connect(mapStateToProps)(DraftView);

/**/