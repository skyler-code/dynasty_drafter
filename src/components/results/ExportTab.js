import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Form } from 'semantic-ui-react';
import fileDownload from 'js-file-download';
import TrollModal from '../TrollModal';

export default class ExportTab extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    state = {
        showPane: false
    };

    componentDidMount(){
        this.setState( { showPane: this.props.showTrollPane } );
    }

    download(){
        fileDownload(this.props.draftResultsCSV, this.props.formatDraftResultsCSVName)
    }

    toggleTrollModal() {
        this.setState( { showPane: !this.state.showPane } );
    }

    render() {
        return (
            <div className="ExportTab">
                <Form>
                    <Form.TextArea
                        rows='6'
                        width='6'
                        value={this.props.draftResultsCSV}
                        readOnly/>
                    <Form.Button
                        primary
                        onClick={() =>  this.download()}
                        content='Download CSV'/>
                </Form>
                <TrollModal
                    showTrollPane={this.state.showPane}
                    toggleTrollModal={this.toggleTrollModal}/>
            </div>
        );
    }
}