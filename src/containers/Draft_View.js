// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './Draft_View.css';
import 'react-table/react-table.css'
import * as draftActions from '../store/draft/actions';
import * as draftSelectors from '../store/draft/reducer';
import ReactTable from 'react-table';

class DraftView extends Component {

constructor(props) {
    super(props);
    autoBind(this);
}

componentDidMount() {
    this.props.dispatch(draftActions.fetchPlayers());
}

render() {
    if (!this.props.playersArray) return this.renderLoading();

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
            accessor: "Name",
            minWidth: 50
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
              }
        },
        {
            Header: "Position",
            accessor: "FantasyPosition",
            minWidth: 25
        }
    ];
    return (
        <div className="DraftView">
              <ReactTable
                data={this.props.playersArray}
                columns={columns}
                className="-striped -highlight"
                getTrProps={(state, rowInfo, column) => {
                rowInfo = rowInfo || {};
                const selected = this.isSelected( ( rowInfo.original || {} ).PlayerID );
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

renderLoading() {
    return (
        <p>Loading....</p>
    );
}

  onRowClick(playerID) {
    this.props.dispatch(draftActions.selectPlayer(playerID));
  }

  onDeselectClick() {
    this.props.dispatch(draftActions.clearPlayerSelection());
  }

  isSelected( playerID ) {
    return this.props.selectedPlayerID === playerID ;
  }

  playerArrayLength(){
    return this.props.playersArray.length;
  }

}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  const playersArray = draftSelectors.getPlayersMinimized(state);
  return {
    playersArray,
    selectedPlayerID: draftSelectors.getSelectedPlayerID(state),
    canFinalizeSelection: draftSelectors.isTopicSelectionValid(state)
  };
}

export default connect(mapStateToProps)(DraftView);