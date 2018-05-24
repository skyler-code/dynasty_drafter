import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class TeamStatusTable extends Component {
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
                minWidth: 15
            },
            {
                Header: "Position",
                id: "position",
                accessor: "FantasyPosition",
                minWidth: 15
            }
        ];
        return (
            <div className="TeamStatusTable">
                <ReactTable
                    data={this.props.selectedTeamStatus}
                    noDataText="No players found."
                    columns={columns}
                    minRows={0}
                    resizable={false}
                    sortable={false}
                    className="-striped -highlight"
                    pageSize={(this.props.selectedTeamStatus || []).length}
                    showPagination={false}/>
            </div>
        );
    }
}