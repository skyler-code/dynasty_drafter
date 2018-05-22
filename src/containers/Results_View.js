import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Form, Grid, TextArea } from 'semantic-ui-react';
import * as resultActions from '../store/results/actions';
import * as resultSelectors from '../store/results/reducer';

class ResultsView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
            this.props.dispatch(resultActions.setResultDraftData());
    }

    render() {
        return (
            <div>

                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                <TextArea
                                    label='Final Draft Array'
                                    value={JSON.stringify(this.props.finalDraftArray, null, "\t")}
                                    rows='12'/>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <Form>
                                <TextArea
                                    label='Final League Array'
                                    value={JSON.stringify(this.props.finalLeagueArray, null, "\t")}
                                    rows='12'/>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        finalDraftArray: resultSelectors.getFinalDraftArray(state),
        finalLeagueArray: resultSelectors.getFinalLeagueArray(state)
    };
}

export default connect(mapStateToProps)(ResultsView);
