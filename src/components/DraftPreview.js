// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ReactTable from 'react-table';
import '../css/DraftPreview.css';
import 'react-table/react-table.css';
import _ from 'lodash';
import * as constants from "../data/constants";

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
            accessor: "Original_Owner",
            sortable: false,
            minWidth: 15
        },
        {
            Header: "Trade Pick?",
            id: "newOwner",
            Cell: (row) => {
               return( <select
                  onChange={event => this.onChange(event.target.value)}
                  style={{ width: "100%" }}
                  defaultValue={"No"}
                >
                <option key="no" value="No">No</option>
                { this.generateFilter( this.props.leagueTeams, row.original.Original_Owner ) }
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
              />

      </div>
    );
  }

  generateFilter( data, owner ) {
    data = _.without(data, owner);
    return ( data || [] ).map( ( x ) => <option key={x} value={x}>{x}</option> )
  }

  onChange(value){
    console.log(value)
  }

}