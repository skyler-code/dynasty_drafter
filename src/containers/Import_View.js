// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as importActions from '../store/leagueImport/actions';
import * as importSelectors from '../store/leagueImport/reducer';
import 'react-tabs/style/react-tabs.css';

class ImportView extends Component {

constructor(props) {
    super(props);
    autoBind(this);
}

componentDidMount() {
}

render() {
    return (
        <p>Import</p>
    );
}

renderLoading() {
    return (
        <p>Loading....</p>
    );
}

}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(ImportView);
