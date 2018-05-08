import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Grid } from 'semantic-ui-react';
import DraftTimer from "./DraftTimer";

export default class CurrentPickInfo extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
    }

    render() {
        if(!this.props.isDraftInProgress) return null;
        return (
            <Grid columns={2} divided>
                <Grid.Column>
                    <DraftTimer
                        timeLeftString={this.props.timeLeftString}
                        isDraftInProgress={this.props.isDraftInProgress}/>
                </Grid.Column>
                <Grid.Column>
                    <div>
                        { "Pick: "  + this.props.currentPick }
                    </div>
                    <div>
                        { "Round: " + this.props.currentRound }
                    </div>
                    <div>
                        { "Current Pick: " + this.props.getCurrentPickName }
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}