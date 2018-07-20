import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Modal, Button, Input } from 'semantic-ui-react';

export default class ConfirmPasswordModal extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    state = { password: '',
              passwordIncorrect: false };

    handlePasswordChange = (v) => this.setState( { password: v.target.value } );

    render() {
        return (
                <Modal
                    open={this.props.showConfirmPassword}
                    closeOnEscape={true}
                    closeOnRootNodeClick={true}
                    size='mini'
                    onClose={() => this.props.closeConfirmPasswordModal()}>
                    <Modal.Header content='Confirm Password'/>
                    <Modal.Content>
                        <Input
                            label='Password'
                            type='password'
                            value={this.state.password}
                            error={this.state.passwordIncorrect}
                            fluid
                            onChange={this.handlePasswordChange}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={ () => this.props.closeConfirmPasswordModal() } content='Cancel'/>
                        <Button positive labelPosition='right' icon='checkmark' content={this.props.confirmMessage} onClick={ () =>{ this.confirm() } } />
                    </Modal.Actions>
                </Modal>
        );
    }

    confirm() {
        const passwordCorrect = this.props.checkPassword( this.state.password );
        if( passwordCorrect ) {
            if( typeof this.props.clickFunction === 'function')
                this.props.clickFunction();
            this.setState( { password: '' } );
            this.props.closeConfirmPasswordModal();
        }
        this.setState( { passwordIncorrect: !passwordCorrect } );
    }
}