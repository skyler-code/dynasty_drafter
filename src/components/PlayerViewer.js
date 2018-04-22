import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Card, Image } from 'semantic-ui-react'

export default class PlayerViewer extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const player = this.selectedPlayer();
    return (
        <div className="PlayerViewer">
          <Card>
            <Card.Content>
              <Image floated='right' size='mini' src={player.PhotoUrl} />
              <Card.Header>
                {player.Name || "No Selected Player"}
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

  generateMetaInfo(){
    if( this.isPlayerSelected() ){
      const player = this.selectedPlayer();
      return(
        <div>
          {player.FantasyPosition} {player.Number ? " #" + player.Number : ""}
        </div>
      );
    }
  }

  generatePlayerDescription(){
    if( this.isPlayerSelected() ){
      const player = this.selectedPlayer();
      return(
        <div>
          Team Name: {player.FullTeamName}<br/>
          {player.College ? "College: " + player.College : ""}
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
