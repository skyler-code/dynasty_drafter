// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Tab, Grid, Button } from 'semantic-ui-react';
import * as setupSelectors from "../store/setup/reducer";
import * as setupActions from "../store/setup/actions";
import DraftPreview from "../components/DraftPreview";
import DraftOptions from "../components/DraftOptions";
import DraftOrderSorter from "../components/DraftOrderSorter";
import ConfirmModal from "../components/ConfirmModal";

class SetupView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        if( ( !this.props.draftOrder || !this.props.draftOrder.length) )
            this.props.dispatch( setupActions.getInitialDraftInfo() );
    }

    state = {
        showConfirm: false,
        activeIndex: 0
    };

    render() {
        const panes = [
            {
                menuItem: 'Settings',
                pane:
                    <Tab.Pane key='Settings'>
                        <div>
                            <Grid columns={2} divided>
                                <Grid.Row>
                                    <Grid.Column width={5}>
                                        <DraftOptions
                                            numOfRounds={this.props.numOfRounds}
                                            handleNumOfRounds={this.handleNumOfRounds}
                                            secondsPerPick={this.props.secondsPerPick}
                                            handleSecondsPerPicks={this.handleSecondsPerPicks}
                                            handleTempSecondsPerPicks={this.handleTempSecondsPerPicks}
                                            draftType={this.props.draftType}
                                            updateDraftType={this.updateDraftType}
                                            defenseEnabled={this.props.defenseEnabled}
                                            updateDefenseEnabled={this.updateDefenseEnabled}
                                            updatePassword={this.updatePassword}
                                            isPasswordSet={this.props.isPasswordSet}
                                            isConfirmModalEnabled={this.props.isConfirmModalEnabled}
                                            toggleConfirmWindow={this.toggleConfirmWindow}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <DraftOrderSorter
                                            draftOrder={this.props.draftOrder}
                                            updateDraftOrder={this.updateDraftOrder}
                                            shiftDraftOrder={this.shiftDraftOrder}/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'Trades',
                pane:
                    <Tab.Pane key='Trade'>
                        <DraftPreview
                            draftArray={this.props.draftArray}
                            teamNames={this.props.teamNames}
                            numOfTeams={this.props.numOfTeams}
                            handlePickTrade={this.handlePickTrade}/>
                    </Tab.Pane>
            }
        ];
        return (
            <div>
                <Tab panes={panes} activeIndex={this.state.activeIndex} renderActiveOnly={false} onTabChange={this.onTabChange}/><br/>
                <Button content='Reset Draft Options' onClick={() => this.toggleResetConfirm()}/>
                <ConfirmModal
                    showConfirmModal={this.state.showConfirm}
                    clickFunction={this.confirm}
                    confirmMessage='Reset Draft Options'
                    toggleConfirmModal={this.toggleResetConfirm}/>
            </div>
        );
    }

    onTabChange( e, t ){
        this.setState( { activeIndex: t.activeIndex } );
        if( t.activeIndex && !this.props.draftArray.length )
             this.props.dispatch( setupActions.createDraftArray() );
        else if ( !t.activeIndex )
            this.props.dispatch( setupActions.unloadDraftArray() );
    }

    handlePickTrade(index, tradedTo){
        this.props.dispatch( setupActions.makeDraftTrade( index, tradedTo ) );
    }

    handleNumOfRounds( val ){
        this.props.dispatch( setupActions.updateNumberOfRounds( val.target.value ) );
    }

    handleSecondsPerPicks( val ){
        this.props.dispatch( setupActions.updateSecondsPerPick( val.target.value ) );
    }

    handleTempSecondsPerPicks( val ){
        this.props.dispatch( setupActions.tempUpdateSecondsPerPick( val.target.value ) );
    }

    updateDraftOrder( draftOrder ){
        this.props.dispatch( setupActions.updateDraftOrder( draftOrder ) )
    }

    shiftDraftOrder( index, newIndex ){
        this.props.dispatch( setupActions.shiftDraftOrder( index, newIndex ) );
    }

    updateDraftType( snakeEnabled ){
        this.props.dispatch( setupActions.updateDraftType( snakeEnabled ) );
    }

    updateDefenseEnabled(){
        this.props.dispatch( setupActions.updateDefenseEnabled() );
    }

    updatePassword( value ){
        this.props.dispatch( setupActions.updatePassword( value ) );
    }

    toggleConfirmWindow(){
        this.props.dispatch( setupActions.toggleConfirmModal() );
    }

    toggleResetConfirm() {
        this.setState( { showConfirm: !this.state.showConfirm } );
    }

    confirm() {
        this.setState( { activeIndex: 0 } );
        this.props.dispatch( setupActions.resetState() );
        this.props.dispatch( setupActions.getInitialDraftInfo() );
        this.toggleResetConfirm();
    }

}

function mapStateToProps(state) {
    const { draftOrder, teamNames } = setupSelectors.getDraftOrderForView(state);
    return {
        draftOrder,
        teamNames,
        draftArray: setupSelectors.getDraftArrayForView(state),
        numOfTeams: setupSelectors.getNumberOfTeams(state),
        numOfRounds: setupSelectors.getNumOfRounds(state),
        secondsPerPick: setupSelectors.getSecondsPerPick(state),
        defenseEnabled: setupSelectors.isDefenseEnabled(state),
        draftType: setupSelectors.isSnakeDraftEnabled(state),
        isPasswordSet: setupSelectors.isPasswordSet(state),
        isConfirmModalEnabled: setupSelectors.isConfirmModalEnabled(state)
    };
}

export default connect(mapStateToProps)(SetupView);