import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Tab, Dropdown, Button } from 'semantic-ui-react';
import * as resultActions from '../store/results/actions';
import * as importActions from '../store/leagueImport/actions';
import * as setupActions from '../store/setup/actions';
import * as draftActions from '../store/draft/actions';
import * as resultSelectors from '../store/results/reducer';
import * as routerActions from "../store/router/actions";
import TeamStatusTable from '../components/results/TeamStatusTable';
import DraftResultsTable from '../components/results/DraftResultsTable';
import ExportTab from '../components/results/ExportTab';
import ConfirmPasswordModal from '../components/ConfirmPasswordModal';
import * as setupSelectors from "../store/setup/reducer";

class ResultsView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
            this.props.dispatch(resultActions.setResultDraftData());
    }

    state = {
        showConfirmPassword: false,
        clickFunction: undefined,
        confirmMessage: ""
    };

    render() {

        const panes = [
            {
                menuItem: 'Draft Results',
                render: () =>
                    <Tab.Pane>
                        <div>
                            <DraftResultsTable
                                draftResults={this.props.draftResults}
                                teamDropDownList={this.props.teamDropDownList}/>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'Team Info',
                render: () =>
                    <Tab.Pane>
                        <div>
                            <Dropdown selection options={this.props.teamDropDownList} defaultValue={this.props.selectedTeam} onChange={(e, d) => this.onTeamDropDownChange(d)}/>
                        </div>
                        <div>
                            <TeamStatusTable
                                selectedTeamStatus={this.props.selectedTeamStatus}/>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'Export',
                render: () =>
                    <Tab.Pane>
                        <ExportTab
                            draftResultsCSV={this.props.draftResultsCSV}
                            formatDraftResultsCSVName={this.props.formatDraftResultsCSVName}/>
                    </Tab.Pane>
            }
        ];
        return (
            <div>
                <Tab panes={panes} /><br/>
                <Button content='Reset War Room' onClick={() => this.passwordCheckRequired( this.resetRouter, 'Reset War Room' )}/>
                <ConfirmPasswordModal
                    showConfirmPassword={this.state.showConfirmPassword}
                    closeConfirmPasswordModal={this.closeConfirmPasswordModal}
                    clickFunction={this.state.clickFunction}
                    confirmMessage={this.state.confirmMessage}
                    checkPassword={this.props.checkPassword}/>
            </div>

        );
    }

    onTeamDropDownChange( data ){
        this.props.dispatch( resultActions.setSelectedTeam( data.value ) );
    }

    resetRouter(){
        this.props.dispatch( importActions.resetState() );
        this.props.dispatch( setupActions.resetState() );
        this.props.dispatch( draftActions.resetState() );
        this.props.dispatch( routerActions.resetState() );
    }

    closeConfirmPasswordModal(){
        this.setState({showConfirmPassword: false})
    }

    passwordCheckRequired( clickFunction, confirmMessage ) {
        this.props.isPasswordSet ? this.setState( { showConfirmPassword: true, clickFunction: clickFunction, confirmMessage: confirmMessage } ) : clickFunction();
    }
}

function mapStateToProps(state) {
    return {
        finalDraftArray: resultSelectors.getFinalDraftArray(state),
        finalLeagueArray: resultSelectors.getFinalLeagueArray(state),
        teamDropDownList: resultSelectors.getTeamList(state),
        selectedTeam: resultSelectors.getSelectedTeam(state),
        selectedTeamStatus: resultSelectors.getSelectedTeamInfo(state),
        draftResults: resultSelectors.getDraftResultsTable(state),
        draftResultsCSV: resultSelectors.getDraftResultCSV(state),
        formatDraftResultsCSVName: resultSelectors.formatDraftResultsCSVName(state),
        isPasswordSet: setupSelectors.isPasswordSet(state),
        checkPassword: setupSelectors.checkPassword(state)
    };
}

export default connect(mapStateToProps)(ResultsView);
