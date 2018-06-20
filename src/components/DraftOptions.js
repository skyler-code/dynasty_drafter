import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Form, Radio, Checkbox } from 'semantic-ui-react';

export default class DraftOptions extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleSnakeChange = (e, { value }) => this.props.updateDraftType(value);
    handleDefenseChange = (e, { checked }) =>  this.props.updateDefenseEnabled( checked );

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
            </div>
        );
    }
}