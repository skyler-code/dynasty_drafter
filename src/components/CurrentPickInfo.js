import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Grid, Statistic, Header } from 'semantic-ui-react';
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
            <Grid columns={3} divided verticalAlign='middle'>
                <Grid.Column>
                    <Statistic>
                        <Statistic.Value>{this.props.timeLeftString}</Statistic.Value>
                        <Statistic.Label>Time Left</Statistic.Label>
                    </Statistic>
                </Grid.Column>
                <Grid.Column>
                    <div>
                        <Header as='h3'>{ "Pick: "  + this.props.currentPick }</Header>
                    </div>
                    <div>
                        <Header as='h3'>{ "Round: " + this.props.currentRound }</Header>
                    </div>
                    <div>
                        { "Current Pick: " + this.props.currentPickName }
                    </div>
                    <div>
                        { this.props.nextPickName ? "Next Pick: " + this.props.nextPickName : "" }
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