import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Grid, Statistic } from 'semantic-ui-react';
import PlayerViewer from "./PlayerViewer";

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
            <Grid columns={3} divided>
                <Grid.Column>
                    <Statistic>
                        <Statistic.Value>{this.props.timeLeftString}</Statistic.Value>
                        <Statistic.Label>Time Left</Statistic.Label>
                    </Statistic>
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
                <Grid.Column>
                        <PlayerViewer
                            selectedPlayer={this.props.selectedPlayer}
                            bestAvailablePlayer={this.props.bestAvailablePlayer}
                            isDraftInProgress={this.props.isDraftInProgress}/>
                </Grid.Column>
            </Grid>
        );
    }
}