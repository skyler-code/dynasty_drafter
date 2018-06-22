import React, { Component } from 'react'
import autoBind from "react-autobind";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../css/ImportedLeagueView.css';

export default class ImportedLeagueView extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    generateFilter( data ) {
        return ( data || [] ).map( ( x ) => <option key={x.key} value={x.value}>{x.text}</option> );
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
                id:"playerName",
                accessor: "playerName",
            },
            {
                Header: "Position",
                id:"position",
                accessor: "position",
                minWidth: 20
            },
            {
                Header: "hashKey",
                id:"hashKey",
                accessor: "hashKey",
                show: false
            },
            {
                Header: "Team",
                id: "teamName",
                accessor: "teamName",
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
                { this.generateFilter( this.props.teamList ) }
                </select>
            }
        ];
        return (
            <div className="ImportedLeagueView">
                <ReactTable
                    data={this.props.parsedLeagueView}
                    noDataText="No players found."
                    columns={columns}
                    minRows={0}
                    resizable={false}
                    sortable={false}
                    className="-striped -highlight"
                    pageSize={(this.props.parsedLeagueView || []).length}
                    showPagination={false}/>
            </div>
        )
    }
}
