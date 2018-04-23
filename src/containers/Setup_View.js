// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import * as importSelectors from "../store/leagueImport/reducer";

class SetupView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <p>Hi</p>
            </div>
        );
    }

    renderLoading() {
        return (
            <p>Loading....</p>
        );
    }
}

function mapStateToProps(state) {
    const parsedLeague = importSelectors.getParsedLeague(state);
    return {
        parsedLeague
    };
}

export default connect(mapStateToProps)(SetupView);
