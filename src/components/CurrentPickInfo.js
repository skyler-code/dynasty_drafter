import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Grid, Statistic, Header } from 'semantic-ui-react';
import PlayerViewer from "./PlayerViewer";

export default class CurrentPickInfo extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <Grid columns={3} divided verticalAlign='middle'>
                <Grid.Column>
                    <Statistic>
                        <Statistic.Value content={this.props.timeLeftString}/>
                        <Statistic.Label content='Time Left'/>
                    </Statistic>
                </Grid.Column>
                <Grid.Column>
                        <Header as='h3'
                                content={
                                    <div>
                                        {"Pick: " + this.props.currentPick}<br/>
                                        {"Round: " + this.props.currentRound}
                                    </div>
                                }/>
                        { "Current Pick: " + this.props.currentPickName }<br/>
                        { this.props.nextPickName ? "Next Pick: " + this.props.nextPickName : "" }
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