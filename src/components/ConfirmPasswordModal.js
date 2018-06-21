import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Modal, Button } from 'semantic-ui-react';

export default class ConfirmPasswordModal extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
                <Modal
                open={this.props.showConfirmPassword}
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                onClose={this.close}>
                <Modal.Header>Confirm Password</Modal.Header>
                <Modal.Content>
                    <p>This is a test.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={ () => this.props.closeConfirmPasswordModal() } content='Cancel'/>
                    <Button positive labelPosition='right' icon='checkmark' content={this.props.confirmMessage} onClick={ () =>{ this.confirm() } } />
                </Modal.Actions>
                </Modal>
        );
    }

    confirm() {
        if( typeof this.props.clickFunction === 'function')
            this.props.clickFunction();
        this.props.closeConfirmPasswordModal();
    }
}