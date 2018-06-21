import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Form, Radio, Checkbox, Button, Input, Header, Divider } from 'semantic-ui-react';

export default class DraftOptions extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    state = { password: '' };

    handleSnakeChange = (e, { value }) => this.props.updateDraftType( value );
    handleDefenseChange = (e, { checked }) =>  this.props.updateDefenseEnabled( checked );
    handlePasswordChange = (v) => this.setState( { password: v.target.value } );
    savePassword = () => {
        this.props.updatePassword( this.state.password );
        this.setState( { password: '' } );
    };

    renderPasswordHeader = () => {
        if( this.props.isPasswordSet )
            return <Header as='h3' color='green'>Password Set</Header>;
        else
            return <Header as='h3' color='red'>Password Not Set</Header>;
    };

    render() {
        return (
            <div className="DraftOptions">
                <Form>
                    <Form.Group>
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
                    <Form.Group>
                        <Form.Field>
                            <Radio
                                label='Snake'
                                name='radioGroup'
                                value='true'
                                checked={this.props.draftType}
                                onChange={this.handleSnakeChange} />
                        </Form.Field>
                        <Form.Field>
                              <Radio
                                label='Linear'
                                name='radioGroup'
                                value='false'
                                checked={!this.props.draftType}
                                onChange={this.handleSnakeChange} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <Checkbox
                                label='Defenses Enabled'
                                name='defense_checkbox'
                                checked={this.props.defenseEnabled}
                                onChange={this.handleDefenseChange} />
                        </Form.Field>
                    </Form.Group>
                </Form>
                <Divider/>
                {this.renderPasswordHeader()}
                <Input
                    label='Admin Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handlePasswordChange} />
                    <Button content='Set' onClick={()=> this.savePassword()}/>
            </div>
        );
    }
}