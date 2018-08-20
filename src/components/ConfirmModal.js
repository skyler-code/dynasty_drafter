import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Confirm } from 'semantic-ui-react';

export default class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div>
                <Confirm
                    open={this.props.showConfirmModal}
                    onCancel={this.props.toggleConfirmModal}
                    onConfirm={this.confirm}
                    confirmButton={this.props.confirmMessage}
                    content={this.props.topConfirmMessage}
                    size='mini'/>
            </div>
        );
    }

    confirm() {
        if( typeof this.props.clickFunction === 'function')
            this.props.clickFunction();
        this.props.toggleConfirmModal();
    }
}