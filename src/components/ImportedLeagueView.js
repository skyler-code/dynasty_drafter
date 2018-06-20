import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import autoBind from "react-autobind";

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
        this.setState({ activeIndex: newIndex });
    };

    render() {
        const { activeIndex } = this.state;
        const self = this;

        function generateAccordionRows(){
            let currentIndex = 0;
            return self.props.parsedLeague.teamInfo.map( function( team ){
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
            <div>
                <Accordion styled>
                    {generateAccordionRows()}
                </Accordion>
            </div>
        )
    }
}
