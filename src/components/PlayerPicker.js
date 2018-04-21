// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter'
import _ from 'lodash';
import '../containers/Draft_View.css'
import 'react-table/react-table.css'
import * as constants from '../data/constants'

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
            minWidth: 10,
            resizable: false
        },
        {
            Header: "",
            Cell: (row) => {
                return <div><img height={65} src={row.original.PhotoUrl} alt={row.original.Name}/></div>
            },
            id: "image",
            sortable: false,
            minWidth: 15,
            resizable: false
        },
        {
            Header: "ADP",
            id:"adp",
            accessor: "AverageDraftPosition",
            minWidth: 20,
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
            accessor: p => p.Name,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["Name"] }),
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
                if (filter.value === "all") {
                  return true;
                }
                const selectedTeam = _.find(constants.NFL_TEAMS, (team) => team === filter.value );
                if(selectedTeam)
                    return row[filter.id] === selectedTeam;
              },
            Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : "all"}
                >
                <option key="all" value="all">Show All</option>
                { this.generateTeamFilter() }
                </select>
        },
        {
            Header: "Position",
            accessor: "FantasyPosition",
            minWidth: 25,
            filterable: true,
            filterMethod: (filter, row) => {
                if (filter.value === "all") {
                  return true;
                }
                const selectedPosition = _.find(constants.PLAYER_POSITIONS, (position) => position === filter.value );
                if(selectedPosition)
                    return row[filter.id] === selectedPosition;
              },
            Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : "all"}
                >
                <option key="all" value="all">Show All</option>
                { this.generatePositionFilter() }
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
            <button className="DraftPlayer" id="DraftPlayer" disabled={!this.props.canFinalizeSelection} >Draft Player</button>
            <button className="DraftPlayer" id="DeselectPlayer" onClick={this.onDeselectClick} disabled={!this.props.canFinalizeSelection} >Clear Selection</button>
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

  isSelected( player ) {
    return ( this.props.selectedPlayer || {} ).PlayerID === player.PlayerID ;
  }

  generatePositionFilter() {
    return constants.PLAYER_POSITIONS.map( ( position ) => <option key={position} value={position}>{position}</option> )
  }

  generateTeamFilter() {
    return constants.NFL_TEAMS.map( ( team ) => <option key={team} value={team}>{team}</option> )
  }

}