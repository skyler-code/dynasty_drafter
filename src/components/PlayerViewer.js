import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Card, Image } from 'semantic-ui-react'
import '../css/PlayerViewer.css';

export default class PlayerViewer extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const plr = this.selectedPlayer();
        return (
            <div className="PlayerViewer">
                <Card>
                    <Card.Content>
                        {this.generatePlayerImage()}
                        <Card.Header content={plr.Name || "No Player Selected"}/>
                        <Card.Meta content={this.generateMetaInfo()}/>
                        <Card.Description content={this.generatePlayerDescription()}/>
                    </Card.Content>
                </Card>
            </div>
        );
    }

    generatePlayerImage(){
        if( this.isPlayerSelected() )
            return <Image floated='left' size='mini' src={this.props.selectedPlayer.PhotoUrl} />
    }

    generateMetaInfo(){
        if( this.isPlayerSelected() ){
            const plr = this.props.selectedPlayer;
            return <div> {plr.FantasyPosition} {plr.Number ? " #" + plr.Number : ""} </div>
        }
    }

    generatePlayerDescription(){
        if( this.isPlayerSelected() ){
            const plr = this.selectedPlayer();
            return(
                <div>
                    <div>Team: {plr.FullTeamName}</div>
                    <div>{plr.College ? "College: " + plr.College : ""}</div>
                    <div>{plr.Age ? "Age: " + plr.Age : "" }</div>
                    <div>{plr.ExperienceString ? "Experience: " + plr.ExperienceString : ""}</div>
                    <div>{plr.Status ? "Status: " + plr.Status : ""}</div>
                </div>
            );
        } else if ( this.props.isDraftInProgress ) {
            const bestPlr = this.bestAvailablePlayer();
            return(
                <div>
                    If no player selected, {bestPlr.Name} {bestPlr.Position ? "(" + bestPlr.Position + ")" : ""} will be picked when time expires.
                </div>
            )
        }
    }

    selectedPlayer() {
        return ( this.props.selectedPlayer || {} ) ;
    }

    bestAvailablePlayer() {
        return ( this.props.bestAvailablePlayer || {} ) ;
    }

    isPlayerSelected() {
        return !!this.props.selectedPlayer;
    }

}