import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import '../css/DraftPreview.css';
import 'react-table/react-table.css';
import _filter from 'lodash/filter';

export default class DraftPreview extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        if (typeof this.props.createDraftArray === 'function') {
          this.props.createDraftArray();
        }
    }

    render() {
        const columns = [
            {
                Header: "Round",
                id: "round",
                Cell: (row) => {
                    return <div>{~~( row.index / this.props.numOfTeams )+1}</div>
                },
                sortable: false,
                minWidth: 5
            },
            {
                Header: "#",
                Cell: (row) => {
                    return <div>{row.index + 1}</div>
                },
                id: "viewIndex",
                sortable: false,
                minWidth: 7
            },
            {
                Header: "Owner",
                id: "originalOwner",
                accessor: "Original_Owner_Name",
                sortable: false,
                minWidth: 15
            },
            {
                Header: "Trade Pick?",
                id: "newOwner",
                accessor: "Traded_To_Hash_Key",
                Cell: (row) => {
                   return( <select
                      onChange={event => this.handlePickTrade(row.index, event.target.value)}
                      style={{ width: "100%" }}
                      value={row.value}
                    >
                    <option key="no" value=""/>
                    { this.generateFilter( this.props.teamNames, row.original.Original_Owner_Hash_Key ) }
                    </select> )
                },
                sortable: false,
                minWidth: 15
            }
        ];
        return (
            <div className="DraftPreview">
                <ReactTable
                    data={this.props.draftArray}
                    noDataText="No draft found."
                    columns={columns}
                    minRows={0}
                    resizable={false}
                    className="-striped -highlight"
                    sortable={false}
                    pageSize={this.props.draftArray.length}
                    showPagination={false}/>
            </div>
        );
    }

  generateFilter( teamNames, owner ) {
    let dataWithout = _filter(teamNames, function( team ){ return team.hashKey !== owner });
    return ( dataWithout || [] ).map( ( x ) => <option key={x.hashKey} value={x.hashKey}>{x.teamName}</option> )
  }

  handlePickTrade( index, tradedTo ) {
    if (typeof this.props.handlePickTrade === 'function') {
      this.props.handlePickTrade( index, tradedTo );
    }
  }

}