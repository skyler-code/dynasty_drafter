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
                    <Tab.Pane>
                        <DraftStatusLeague
                            draftStatusLeague={this.props.draftStatusLeague}/>
                    </Tab.Pane>
            },
            {
                menuItem: this.props.currentPickName + " Team Info",
                render: () =>
                    <Tab.Pane>
                        <DraftStatusTeam
                            draftStatusTeam={this.props.draftStatusTeam}/>
                    </Tab.Pane>
            }
        ];
        return <Tab panes={panes}/>
    }
}