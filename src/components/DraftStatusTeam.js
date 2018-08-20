import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../css/DraftStatusLeague.css';
import _without from "lodash/without";
import * as constants from '../data/constants';

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
                minWidth: 25,
                filterable: true,
                filterMethod: (filter, row) => {
                    return filter.value === "all" || row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}>
                        {this.generateFilter( constants.NFL_TEAMS )}
                    </select>
            },
            {
                Header: "Position",
                id: "position",
                accessor: "FantasyPosition",
                minWidth: 25,
                filterable: true,
                filterMethod: (filter, row) => {
                    return filter.value === "all" || row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}>
                        {this.generateFilter( _without( constants.PLAYER_POSITIONS, this.props.isDefenseEnabled ? null : 'D/ST' ) )}
                    </select>
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

    generateFilter( data ) {
        return [<option key="all" value="all">Show All</option>].concat( ( data || [] ).map( ( x ) => <option key={x} value={x}>{x}</option> ) );
    }
}