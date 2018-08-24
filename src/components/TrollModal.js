import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Modal, Image, Button, Icon } from 'semantic-ui-react';
import Music from '../img/stilldre.mp3'

export default class TrollModal extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div>
                <Modal
                    open={this.props.showTrollPane}
                    onClose={this.props.toggleTrollModal}
                    basic
                    size='small'>
                    <Modal.Content>
                        <Image src='https://i.imgur.com/OMLWS2r.jpg'/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => this.props.toggleTrollModal()}>
                            <Icon name='checkmark' /> 420 BLAZE IT
                        </Button>
                    </Modal.Actions>
                </Modal>
                {this.playMusic()}
            </div>
        );
    }

    playMusic(){
        if( this.props.showTrollPane )
            return(
                <div>
                    <audio ref="audio_tag" src={Music} autoPlay/>
                </div>
            );
    }
}