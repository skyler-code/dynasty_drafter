import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Tab } from 'semantic-ui-react';
import DraftStatusLeague from '../components/DraftStatusLeague';
import DraftStatusTeam from '../components/DraftStatusTeam';

export default class DraftStatusTabs extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const panes = [
            {
                menuItem: 'Draft Results',
                render: () =>
                    <Tab.Pane content={<DraftStatusLeague draftStatusLeague={this.props.draftStatusLeague}/>}/>
            },
            {
                menuItem: this.props.currentPickName + " Team Info",
                render: () =>
                    <Tab.Pane content={<DraftStatusTeam
                                        draftStatusTeam={this.props.draftStatusTeam}
                                        isDefenseEnabled={this.props.isDefenseEnabled}/>}/>
            }
        ];
        return <Tab panes={panes}/>
    }
}