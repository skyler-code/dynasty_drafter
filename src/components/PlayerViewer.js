import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Card, Image } from 'semantic-ui-react'

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
              <Card.Header>
                {plr.Name || "No Player Selected"}
              </Card.Header>
              <Card.Meta>
                {this.generateMetaInfo()}
              </Card.Meta>
              <Card.Description>
                  {this.generatePlayerDescription()}
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
    );
  }

  generatePlayerImage(){
    if( this.isPlayerSelected() ){
      return( <Image floated='left' size='mini' src={this.selectedPlayer().PhotoUrl} /> )
    }
  }

  generateMetaInfo(){
    if( this.isPlayerSelected() ){
      const plr = this.selectedPlayer();
      return(
        <div>
          {plr.FantasyPosition} {plr.Number ? " #" + plr.Number : ""}
        </div>
      );
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
        </div>
      );
    }
  }

  selectedPlayer() {
    return ( this.props.selectedPlayer || {} ) ;
  }

  isPlayerSelected() {
    return !!this.props.selectedPlayer;
  }

}

// {this.isPlayerSelected() ? "Team Name: " + player.FullTeamName : ""}
