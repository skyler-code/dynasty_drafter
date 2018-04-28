import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Statistic } from 'semantic-ui-react';

export default class DraftTimer extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
    }

    render() {
        if(!this.props.isDraftInProgress) return null;
        return (
            <Statistic>
                <Statistic.Value>{this.props.timeLeftString}</Statistic.Value>
                <Statistic.Label>Time Left</Statistic.Label>
            </Statistic>
        );
    }
}