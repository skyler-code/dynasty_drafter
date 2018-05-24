import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Form, Grid, TextArea, Tab, Dropdown } from 'semantic-ui-react';
import * as resultActions from '../store/results/actions';
import * as resultSelectors from '../store/results/reducer';
import TeamStatusTable from '../components/results/TeamStatusTable';

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
                            <Grid columns={2} divided>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form>
                                            <TextArea
                                                label='Final Draft Array'
                                                value={JSON.stringify(this.props.finalDraftArray, null, "\t")}
                                                rows='12'/>
                                        </Form>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form>
                                            <TextArea
                                                label='Final League Array'
                                                value={JSON.stringify(this.props.finalLeagueArray, null, "\t")}
                                                rows='12'/>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
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
        selectedTeamStatus: resultSelectors.getSelectedTeamInfo(state)
    };
}

export default connect(mapStateToProps)(ResultsView);
