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
                Header: "Round",
                id: "round",
                Cell: (row) => {
                    return <div>{~~( row.index / this.props.numOfTeams )+1}</div>
                },
                minWidth: 8
            },
            {
                Header: "#",
                Cell: (row) => {
                    return <div>{row.viewIndex + 1}</div>
                },
                id: "viewIndex",
                minWidth: 8
            },
            {
                Header: "Player",
                id:"name",
                accessor: "Player",
            },
            {
                Header: "hashKey",
                id:"hashKey",
                accessor: "hashKey",
                show: false
            },
            {
                Header: "Team",
                id: "team",
                accessor: "Team",
                filterable: true,
                filterMethod: (filter, row) => {
                return filter.value === "all" || filter.value === row.hashKey.toString();
                },
            Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : "all"}
                >
                <option key="all" value="all">Show All</option>
                { this.generateFilter( this.props.teamDropDownList ) }
                </select>
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

    generateFilter( data ) {
        return ( data || [] ).map( ( x ) => <option key={x.key} value={x.value}>{x.text}</option> )
    }
}