import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Tab } from 'semantic-ui-react';

export default class DraftPreview extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        if(!this.props.isDraftInProgress) return null;
        const currentTeamInfoTabName = this.props.getCurrentPickName + " Team Info";
        const panes = [
            {
                menuItem: 'Draft Results',
                render: () =>
                    <Tab.Pane>
                        <div>
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