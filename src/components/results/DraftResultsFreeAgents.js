import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import _without from 'lodash/without';
import 'react-table/react-table.css';
import * as constants from '../../data/constants';

export default class PlayerPicker extends Component {

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
                sortable: false,
                minWidth: 10
            },
            {
                Header: "",
                Cell: (row) => {
                    return <div><img id="PlayerImage" src={row.original.PhotoUrl} alt={row.original.Name}/></div>
                },
                id: "image",
                sortable: false,
                minWidth: 15
            },
            {
                Header: "Standard",
                id:"adp",
                accessor: "AverageDraftPosition",
                minWidth: 17,
                sortMethod: this.sort
            },
            {
                Header: "Dynasty",
                id:"dynastyRanking",
                accessor: "DynastyRanking",
                minWidth: 17,
                sortMethod: this.sort
            },
            {
                Header: "Name",
                minWidth: 50,
                filterable: true,
                id: "Name",
                accessor: "Name",
                filterMethod: (filter, rows) => matchSorter( rows, filter.value, { keys: ["Name"] } ),
                filterAll: true
            },
            {
                Header: "Team",
                accessor: "Team",
                minWidth: 25,
                sortMethod: this.sort,
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
            },
            {
                Header: "Rookie",
                accessor: "Experience",
                id: "rookie",
                minWidth: 25,
                filterable: true,
                Cell: ({ value }) => ((value > 0 || value === undefined) ? "No" : "Yes"),
                filterMethod: (filter, row) => {
                if (filter.value === "yes")
                    return row[filter.id] === 0;
                return filter.value === "all" || row[filter.id] > 0 || row[filter.id] === undefined;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"} >
                        <option value="all">Show All</option>
                        <option value="yes">Rookies</option>
                        <option value="no">No Rookies</option>
                    </select>
            }
        ];
        return (
            <div className="DraftResultsFreeAgents">
                <ReactTable
                    data={this.props.freeAgents}
                    noDataText="No players found."
                    columns={columns}
                    minRows={0}
                    resizable={false}
                    className="-striped -highlight"
                    defaultSorted={ [ { id: "adp", desc: false } ] }
                />
          </div>
        );
    }

    sort(a, b) {
        if(!a && b){
            return 1;
        }
        if(a && !b){
            return -1;
        }
        return a > b ? 1 : -1;
    }

    generateFilter( data ) {
        return [<option key="all" value="all">Show All</option>].concat( ( data || [] ).map( ( x ) => <option key={x} value={x}>{x}</option> ) );
    }
}