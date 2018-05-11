import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../css/DraftStatusLeague.css';

export default class DraftStatusTeam extends Component {
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
                Header: "Name",
                id:"name",
                accessor: "Name",
            },
            {
                Header: "Team",
                id: "team",
                accessor: "Team",
            },
            {
                Header: "Position",
                id: "position",
                accessor: "FantasyPosition",
            }
        ];
        return (
            <div className="DraftStatusTeam">
                <ReactTable
                    data={this.props.draftStatusTeam}
                    noDataText="No players found."
                    columns={columns}
                    minRows={0}
                    resizable={false}
                    sortable={false}
                    className="-striped -highlight"
                    pageSize={(this.props.draftStatusTeam || []).length}
                    showPagination={false}/>
            </div>
        );
    }
}