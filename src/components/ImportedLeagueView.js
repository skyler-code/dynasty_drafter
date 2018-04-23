import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import autoBind from "react-autobind";
import _ from 'lodash';

export default class ImportedLeagueView extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex })
  };

  render() {
    const { activeIndex } = this.state;
    const self = this;

    function generateAccordion() {
        let currentIndex = 0;
        if(self.props.parsedLeague){
            const teamInfoArray = _.toArray(self.props.parsedLeague.teamInfo);
            return teamInfoArray.map( function( team ){
                currentIndex++;
                return(
                    <div key={team.teamName}>
                        <Accordion.Title active={activeIndex === currentIndex} index={currentIndex} onClick={self.handleClick}>
                          <Icon name='dropdown' />
                            {team.teamName}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === currentIndex}>
                            { generateAccordionContent( team.players ) }
                        </Accordion.Content>

                    </div>
                );
            } );
        }
    }

    function generateAccordionContent( players ){
        return players.map( function ( player ){
            return (
                <div key={player.Name}>
                    {player.Name + " - " + player.FantasyPosition}
                </div>
            );
        } );
    }

    return (
      <Accordion styled>
          {generateAccordion()}
      </Accordion>
    )
  }
}
