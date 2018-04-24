// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import { Form } from 'semantic-ui-react';
import * as setupSelectors from "../store/setup/reducer";
import * as setupActions from "../store/setup/actions";
import DraftPreview from "../components/DraftPreview";

class SetupView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        if( ( !this.props.draftArray || !this.props.draftArray.length) )
            this.props.dispatch( setupActions.getInitialDraftInfo() );
    }

    render() {
        return (
            <div>
                <DraftPreview
                            draftArray={this.props.draftArray}
                            draftOrder={this.props.draftOrder}
                            teamNames={this.props.teamNames}
                            handlePickTrade={this.handlePickTrade}/>
            </div>
        );
    }

    handlePickTrade(index, tradedTo){
        this.props.dispatch( setupActions.makeDraftTrade( index, tradedTo ) );
    }


}

function mapStateToProps(state) {
    const { draftOrder, teamNames } = setupSelectors.getDraftOrder(state);
    const draftArray = setupSelectors.getDraftArrayForView(state);
    return {
        draftOrder,
        teamNames,
        draftArray
    };
}

export default connect(mapStateToProps)(SetupView);