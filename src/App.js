import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as draftSelectors from './store/draft/reducer';
import DraftView from './containers/Draft_View';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/*{!this.props.isSelectionFinalized ?
          <TopicsScreen /> :
          <PostsScreen />
        }*/}
        <DraftView />
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    //isSelectionFinalized: draftSelectors.isTopicSelectionFinalized(state)
  };
}

export default connect(mapStateToProps)(App);