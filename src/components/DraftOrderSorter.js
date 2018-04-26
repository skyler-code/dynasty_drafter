import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import autoBind from 'react-autobind';
import _ from 'lodash';
import '../css/DraftOrderSorter.css';
import 'react-table/react-table.css';

export default class DraftPreview extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
    }

    renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const draftOrder = [...this.props.draftOrder];
          const cell = _.clone(draftOrder[cellInfo.index]);
          cell[cellInfo.column.id] = e.target.innerHTML;
          draftOrder[cellInfo.index] = cell;
          this.props.updateDraftOrder( draftOrder );
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.draftOrder[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

    render() {
        const columns = [
            {
                Header: "Pick #",
                Cell: (row) => {
                    return <div>{row.index + 1}</div>
                },
                id: "index",
                sortable: false,
                minWidth: 7
            },
            {
                Header: "Team",
                id: "teamName",
                accessor: "teamName",
                Cell: this.renderEditable,
                sortable: false,
                minWidth: 15
            },
            {
                Header: "",
                id: "sorterButtons",
                Cell: (row) => {
                    const index = row.viewIndex;
                    const lastIndex = ( this.props.draftOrder || [] ).length - 1;
                    return (
                        <div>
                            <Button icon disabled={index === 0} onClick={() => this.props.shiftDraftOrder( index, index > 0 ? index - 1 : 0 )}>
                                <Icon name='chevron up' />
                            </Button>
                            <Button icon disabled={index === lastIndex} onClick={() => this.props.shiftDraftOrder (index, index + 1 )}>
                                <Icon name='chevron down' />
                            </Button>
                        </div>)
                },
                sortable: false,
                minWidth: 5
            }
        ];
        return (
            <div className="DraftOrderSorter">
                <ReactTable
                    data={this.props.draftOrder}
                    noDataText="No draft found."
                    columns={columns}
                    minRows={0}
                    resizable={false}
                    className="-striped -highlight"
                    sortable={false}
                    pageSize={(this.props.draftOrder || []).length}
                    showPagination={false}/>
            </div>
        );
    }

}