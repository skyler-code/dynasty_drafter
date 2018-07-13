import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Form, Header, Divider, Grid } from 'semantic-ui-react';

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
        this.setState( {
            password: ''
            , passwordCleared: passwordCleared
            , passwordAlreadySet: this.props.isPasswordSet && !passwordCleared
        } );
    };

    renderPasswordHeader = () => {
        let isPassSet = this.props.isPasswordSet;
        let color = isPassSet ? 'green' : 'red';
        let content = 'Password ' + ( isPassSet ? ( this.state.passwordAlreadySet ? "Updated" : "Set" ) : ( this.state.passwordCleared ? "Cleared" : "Not Set" ) );
        return <Header as='h3' color={color} content={content}/>;
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
                    <Divider/>
                    {this.renderPasswordHeader()}<br/>
                    <Grid className="centered">
                        <Form.Group>
                            <Form.Input
                                placeholder='Admin Password'
                                type='password'
                                value={this.state.password}
                                onChange={this.handlePasswordChange}/>
                            <Form.Button
                                content={clearPass ? "Clear" : isPasswordSet ? "Update" : "Set"}
                                primary={passLength}
                                secondary={clearPass}
                                onClick={()=> this.savePassword()}
                                disabled={!passLength && !isPasswordSet}/>
                        </Form.Group>
                    </Grid>
                </Form>
            </div>
        );
    }
}