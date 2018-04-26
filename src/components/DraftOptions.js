import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Form, Radio } from 'semantic-ui-react';

export default class DraftOptions extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
    }

    handleChange = (e, { value }) => this.props.updateDraftType(value);

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
                            label='Seconds Per Pick'
                            control='input'
                            type='number'
                            value={this.props.secondsPerPick}
                            onChange={this.props.handleSecondsPerPicks} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <Radio
                                label='Snake'
                                name='radioGroup'
                                value='true'
                                checked={this.props.draftType}
                                onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                              <Radio
                                label='Linear'
                                name='radioGroup'
                                value='false'
                                checked={!this.props.draftType}
                                onChange={this.handleChange} />
                        </Form.Field>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}