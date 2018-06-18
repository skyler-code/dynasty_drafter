import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class DraftResultsTable extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const columns = [
            {
                Header: "#",
                Cell: (row) => {
                    return <div>{row.viewIndex + 1}</div>
                },
                id: "viewIndex",
                minWidth: 15
            },
            {
                Header: "Player",
                id:"name",
                accessor: "Player",
            },
            {
                Header: "Team",
                id: "team",
                accessor: "Team",
                minWidth: 15
            }
        ];
        return (
            <div className="DraftResultsTable">
                <ReactTable
                    data={this.props.draftResults}
                    noDataText="No players found."
                    columns={columns}
                    minRows={0}
                    resizable={false}
                    sortable={false}
                    className="-striped -highlight"
                    pageSize={(this.props.draftResults || []).length}
                    showPagination={false}/>
            </div>
        );
    }
}