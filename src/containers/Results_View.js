import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Tab, Dropdown } from 'semantic-ui-react';
import * as resultActions from '../store/results/actions';
import * as resultSelectors from '../store/results/reducer';
import TeamStatusTable from '../components/results/TeamStatusTable';
import DraftResultsTable from '../components/results/DraftResultsTable';

class ResultsView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
            this.props.dispatch(resultActions.setResultDraftData());
    }

    render() {

        const panes = [
            {
                menuItem: 'Draft Results',
                render: () =>
                    <Tab.Pane>
                        <div>
                            <DraftResultsTable
                                draftResults={this.props.draftResults}/>
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
                    </Tab.Pane>
            }
        ];
        return (
            <div>
                <Tab panes={panes} />
            </div>
        );
    }

    onTeamDropDownChange( data ){
        this.props.dispatch( resultActions.setSelectedTeam( data.value ) );
    }
}

function mapStateToProps(state) {
    return {
        finalDraftArray: resultSelectors.getFinalDraftArray(state),
        finalLeagueArray: resultSelectors.getFinalLeagueArray(state),
        teamDropDownList: resultSelectors.getTeamList(state),
        selectedTeam: resultSelectors.getSelectedTeam(state),
        selectedTeamStatus: resultSelectors.getSelectedTeamInfo(state),
        draftResults: resultSelectors.getDraftResultsTable(state)
    };
}

export default connect(mapStateToProps)(ResultsView);
