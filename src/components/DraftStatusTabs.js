import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Tab } from 'semantic-ui-react';
import DraftStatusLeague from '../components/DraftStatusLeague';

export default class DraftStatusTabs extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const currentTeamInfoTabName = this.props.getCurrentPickName + " Team Info";
        const panes = [
            {
                menuItem: 'Draft Results',
                render: () =>
                    <Tab.Pane>
                        <div>
                            <DraftStatusLeague
                                draftStatusLeague={this.props.draftStatusLeague}/>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: currentTeamInfoTabName,
                render: () =>
                    <Tab.Pane>
                    </Tab.Pane>
            }
        ];
        return (
            <div>
                <Tab panes={panes}/>
            </div>
        );
    }

}