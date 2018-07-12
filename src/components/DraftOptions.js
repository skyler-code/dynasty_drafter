import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Form, Button, Input, Header, Divider } from 'semantic-ui-react';

export default class DraftOptions extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    state = { password: '' };

    handleSnakeChange = (v) => this.props.updateDraftType(v);
    handleDefenseChange = () =>  this.props.updateDefenseEnabled();
    toggleConfirmWindow = () =>  this.props.toggleConfirmWindow();
    handlePasswordChange = (v) => this.setState( { password: v.target.value } );
    savePassword = () => {
        let passwordCleared = this.props.isPasswordSet && !this.state.password.length;
        this.props.updatePassword( this.state.password );
        this.setState( { password: '', passwordCleared: passwordCleared } );
    };

    renderPasswordHeader = () => {
        if( this.props.isPasswordSet )
            return <Header as='h3' color='green'>Password Set</Header>;
        else
            return <Header as='h3' color='red'>Password { this.state.passwordCleared ? "Cleared" : "Not Set" }</Header>;
    };

    render() {
        let isPasswordSet = this.props.isPasswordSet;
        let passLength = this.state.password.length;
        let clearPass = isPasswordSet && !passLength;
        return (
            <div className="DraftOptions">
                <Form>
                    <Form.Group inline>
                        <Form.Input
                            label='Number of Rounds (4-8)'
                            control='input'
                            type='number'
                            min={4}
                            max={8}
                            value={this.props.numOfRounds}
                            onChange={this.props.handleNumOfRounds} />
                        <Form.Input
                            label='Seconds Per Pick (45-300)'
                            control='input'
                            type='number'
                            min={45}
                            max={300}
                            value={this.props.secondsPerPick}
                            onChange={this.props.handleTempSecondsPerPicks}
                            onBlur={this.props.handleSecondsPerPicks} />
                    </Form.Group>
                    <Form.Group grouped>
                        <Form.Radio
                            label='Snake'
                            name='radioGroup'
                            value='true'
                            checked={this.props.draftType}
                            onChange={() => this.handleSnakeChange(true)}/>
                        <Form.Radio
                            label='Linear'
                            name='radioGroup'
                            value='false'
                            checked={!this.props.draftType}
                            onChange={() => this.handleSnakeChange(false)}/>
                        <Form.Checkbox
                            label='Defenses Enabled'
                            name='defense_checkbox'
                            checked={this.props.defenseEnabled}
                            onChange={this.handleDefenseChange}/>
                        <Form.Checkbox
                            label='Confirm Window Enabled'
                            name='confirm_window_checkbox'
                            disabled={isPasswordSet}
                            checked={isPasswordSet || this.props.isConfirmModalEnabled}
                            onChange={this.toggleConfirmWindow}/>
                    </Form.Group>
                </Form>
                <Divider/>
                {this.renderPasswordHeader()}
                <Input
                    label='Admin Password'
                    type='password'
                    fluid
                    value={this.state.password}
                    onChange={this.handlePasswordChange} /><br/>
                <Button compact
                    content={clearPass ? "Clear" : isPasswordSet ? "Update" : "Set"}
                    primary={passLength}
                    secondary={clearPass}
                    onClick={()=> this.savePassword()}
                    disabled={!passLength && !isPasswordSet}/>
            </div>
        );
    }
}