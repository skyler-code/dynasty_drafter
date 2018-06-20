// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import _without from 'lodash/without';
import '../css/PlayerPicker.css';
import 'react-table/react-table.css';
import * as constants from '../data/constants';
import { Button } from 'semantic-ui-react';

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
                Header: "ADP",
                id:"adp",
                accessor: "AverageDraftPosition",
                minWidth: 15,
                sortMethod: (a, b) => {
                    if(!a && b){
                        return 1;
                    }
                    if(a && !b){
                        return -1;
                    }
                    return a > b ? 1 : -1;
                }
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
                sortMethod: (a, b) => {
                    if(!a && b){
                        return 1;
                    }
                    if(a && !b){
                        return -1;
                    }
                    return a > b ? 1 : -1;
                },
                filterable: true,
                filterMethod: (filter, row) => {
                    return filter.value === "all" || row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                    >
                        <option key="all" value="all">Show All</option>
                        { this.generateFilter( constants.NFL_TEAMS ) }
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
                        value={filter ? filter.value : "all"} >
                        <option key="all" value="all">Show All</option>
                        { this.generateFilter( _without( constants.PLAYER_POSITIONS, this.props.isDefenseEnabled ? null : 'D/ST' ) ) }
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
            <div className="DraftView">
                <ReactTable
                    data={this.props.playersArray}
                    noDataText="No players found."
                    columns={columns}
                    minRows={0}
                    resizable={false}
                    className="-striped -highlight"
                    defaultSorted={ [ { id: "adp", desc: false } ] }
                    getTrProps={(state, rowInfo, column) => {
                    rowInfo = rowInfo || {};
                    const selected = this.isSelected( rowInfo.original );
                        return {
                            style: {
                                backgroundColor : selected ? '#c0f0ff' : null
                            },
                            onClick: (e) => {
                                this.onRowClick(rowInfo.original.PlayerID);
                            }
                        }
                    } }
                />
                <div>
                    <Button
                        primary={this.props.canDraftPlayer}
                        disabled={!this.props.canDraftPlayer}
                        onClick={() => this.finalizePlayerSelection()}>
                    Draft Player
                    </Button>
                    <Button
                        primary={this.props.canFinalizeSelection}
                        disabled={!this.props.canFinalizeSelection}
                        onClick={() => this.onDeselectClick()}>
                        Clear Selection
                    </Button>
                </div>
          </div>
        );
    }

    onRowClick(playerID) {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(playerID);
        }
    }

    onDeselectClick() {
        if (typeof this.props.onDeselectClick === 'function') {
            this.props.onDeselectClick();
        }
    }

    finalizePlayerSelection() {
        if (typeof this.props.finalizePlayerSelection === 'function') {
            this.props.finalizePlayerSelection();
        }
    }

    isSelected( player ) {
        return ( this.props.selectedPlayer || {} ).PlayerID === player.PlayerID ;
    }

    generateFilter( data ) {
        return ( data || [] ).map( ( x ) => <option key={x} value={x}>{x}</option> )
    }
}