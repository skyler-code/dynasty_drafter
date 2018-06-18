import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Form } from 'semantic-ui-react';
import 'react-table/react-table.css';
import fileDownload from 'js-file-download';

export default class ExportTab extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    download(){
        fileDownload(this.props.draftResultsCSV, this.props.formatDraftResultsCSVName)
    }

    render() {
        return (
            <div className="ExportTab">
                <Form>
                    <Form.Group>
                        <Form.Input
                            label='Draft Results CSV'
                            control='textarea'
                            rows='6'
                            width={12}
                            value={this.props.draftResultsCSV}
                            readOnly/>
                        <Form.Button
                            primary
                            onClick={() =>  this.download()}>
                            Download CSV
                        </Form.Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}