import React, { Component } from 'react';
import autoBind from 'react-autobind';
import '../css/DraftPreview.css';
import 'react-table/react-table.css';

export default class DraftPreview extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {

    }

    render() {
        return(
            <div>Coming soon...</div>
        )
    }

}