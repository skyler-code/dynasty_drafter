// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Form, Grid, Header, Icon } from 'semantic-ui-react';
import * as importActions from '../store/leagueImport/actions';
import * as importSelectors from '../store/leagueImport/reducer';
import ImportedLeagueView from "../components/ImportedLeagueView";

class ImportView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
    }

    validLeagueIndicator(){
        if( this.props.successfulImport )
            return(
                <div>
                <Header as='h2'><Icon name='checkmark' color='green' size='large'/>Successful Import!</Header>
                </div>
            );
        else if (this.props.leagueInput && !this.props.successfulImport)
            return(
                <div>
                <Header as='h2'><Icon name='close' color='red' size='large'/>Invalid Input!</Header>
                </div>
            );
    }

    showLeaguePreview(){
        if( this.props.successfulImport )
            return(
                <div>
                    <Grid.Column verticalAlign='middle'>
                        <Header as='h2'>{this.props.leagueName}</Header>
                        <ImportedLeagueView parsedLeague={this.props.parsedLeague}/>
                    </Grid.Column>
                </div>
            );
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
                                        width={12}
                                        value={this.props.leagueInput}
                                        onChange={this.handleInputChange} />
                                </Form.Group>
                            </Form>
                            {this.validLeagueIndicator()}
                        </Grid.Column>
                        {this.showLeaguePreview()}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

    handleInputChange(e){
        this.props.dispatch( importActions.processUserInput( e.target.value ) );
    }
}

function mapStateToProps(state) {
    return {
        parsedLeague: importSelectors.getParsedLeague(state),
        leagueInput: importSelectors.getLeagueInput(state),
        leagueName: importSelectors.getLeagueName(state),
        successfulImport: importSelectors.successfulImport(state)
    };
}

export default connect(mapStateToProps)(ImportView);
