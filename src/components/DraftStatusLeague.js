import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../css/DraftStatusLeague.css';

export default class DraftStatusLeague extends Component {
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
                minWidth: 10
            },
            {
                Header: "Team",
                id:"team",
                accessor: "teamName",
            },
            {
                Header: "Player",
                id: "playerName",
                accessor: "playerName",
            }
        ];
        return (
            <div className="DraftStatusLeague">
                <ReactTable
                    data={this.props.draftStatusLeague}
                    noDataText="No players found."
                    columns={columns}
                    minRows={0}
                    resizable={false}
                    sortable={false}
                    className="-striped -highlight"
                    pageSize={(this.props.draftStatusLeague || []).length}
                    showPagination={false}/>
            </div>
        );
    }
}