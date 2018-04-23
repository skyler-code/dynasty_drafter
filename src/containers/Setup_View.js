// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as setupSelectors from "../store/setup/reducer";
import * as setupActions from "../store/setup/actions";

class SetupView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        if( !this.props.draftOrder )
            this.props.dispatch( setupActions.getInitialDraftOrder() );
    }

    render() {
        return (
            <div>
                {this.props.draftOrder ? this.props.draftOrder : ""}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const draftOrder = setupSelectors.getDraftOrder(state);
    return {
        draftOrder
    };
}

export default connect(mapStateToProps)(SetupView);
