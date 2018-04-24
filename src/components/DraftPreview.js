// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

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
                    { this.generateFilter( this.props.teamNames, row.Original_Owner_Hash_Key ) }
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