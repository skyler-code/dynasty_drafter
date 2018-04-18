// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './Draft_View.css';
import * as draftActions from '../store/draft/actions';
import * as draftSelectors from '../store/draft/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';

class DraftView extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(draftActions.fetchPlayers());
  }

  render() {
    if (!this.props.topicsByUrl) return this.renderLoading();
    return (
      <div className="DraftView">
        <h3>Choose 3 topics of interest</h3>
        <ListView
          rowsIdArray={this.props.topicsUrlArray}
          rowsById={this.props.topicsByUrl}
          renderRow={this.renderRow} />
        {!this.props.canFinalizeSelection ? false :
          <button className="NextScreen" onClick={this.onNextScreenClick} />
        }
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(topicUrl, topic) {
    const selected = this.props.selectedTopicsByUrl[topicUrl];
    return (
      <ListRow
        rowId={topicUrl}
        onClick={this.onRowClick}
        selected={selected}>
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </ListRow>
    )
  }

  onRowClick(topicUrl) {
    this.props.dispatch(draftActions.selectTopic(topicUrl));
  }

  onNextScreenClick() {
    this.props.dispatch(draftActions.finalizeTopicSelection());
  }

}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  const [topicsByUrl, topicsUrlArray] = draftSelectors.getTopics(state);
  return {
    topicsByUrl,
    topicsUrlArray,
    selectedTopicsByUrl: draftSelectors.getSelectedTopicsByUrl(state),
    canFinalizeSelection: draftSelectors.isTopicSelectionValid(state)
  };
}

export default connect(mapStateToProps)(DraftView);