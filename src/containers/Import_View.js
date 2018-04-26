// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Form, Grid } from 'semantic-ui-react';
import * as importActions from '../store/leagueImport/actions';
import * as importSelectors from '../store/leagueImport/reducer';
import 'react-tabs/style/react-tabs.css';
import ImportedLeagueView from "../components/ImportedLeagueView";

class ImportView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div>
                    <strong>Instructions:</strong> Go to your ESPN fantasy league (link to come, sample here: https://pastebin.com/raw/2eAbShZE ),
                    use Control-A to select the <strong>entire</strong> page.<br/>Paste into the box below. League preview will show in right pane. Then, go to the Setup tab.
                </div>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                <Form.Group>
                                    <Form.Input
                                        label='Paste ESPN League Here'
                                        control='textarea'
                                        rows='6'
                                        value={this.props.leagueInput}
                                        onChange={this.handleInputChange} />
                                </Form.Group>
                                    <Form.Field
                                        value={JSON.stringify(this.props.parsedLeague, null, "\t")}
                                        control='textarea'
                                        rows='6'/>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <ImportedLeagueView parsedLeague={this.props.parsedLeague}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

    renderLoading() {
        return (
            <p>Loading....</p>
        );
    }

    handleInputChange(e){
        const input = e.target.value;
        this.props.dispatch(importActions.processUserInput(input));
    }
}

function mapStateToProps(state) {
    return {
        parsedLeague: importSelectors.getParsedLeague(state),
        leagueInput: importSelectors.getLeagueInput(state)
    };
}

export default connect(mapStateToProps)(ImportView);
