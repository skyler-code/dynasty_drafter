import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import autoBind from 'react-autobind';
import _ from 'lodash';
import '../css/DraftOrderSorter.css';
import 'react-table/react-table.css';

export default class DraftOrderSorter extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    renderEditable(cellInfo) {
        return <div
                    style={{ backgroundColor: "#fafafa" }}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                        const draftOrder = [...this.props.draftOrder];
                        const cell = _.cloneDeep(draftOrder[cellInfo.index]);
                        cell[cellInfo.column.id] = e.target.innerHTML;
                        draftOrder[cellInfo.index] = cell;
                        this.props.updateDraftOrder( draftOrder );
                    }}
                    dangerouslySetInnerHTML={{
                        __html: this.props.draftOrder[cellInfo.index][cellInfo.column.id]
                    }}/>
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
                minWidth: 3
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
                Header: "Record",
                id: "record",
                accessor: t => t.record.recordString,
                sortable: false,
                minWidth: 3
            },
            {
                Header: "",
                id: "sorterButtons",
                Cell: (row) => {
                    const index = row.viewIndex;
                    const lastIndex = ( this.props.draftOrder || [] ).length - 1;
                    const upIndex = index > 0 ? index - 1 : lastIndex;
                    const downIndex = index + 1 > lastIndex ? 0 : index + 1;
                    return (
                        <div>
                            <Button icon={<Icon name='chevron up' />} onClick={() => this.props.shiftDraftOrder( index, upIndex )}/>
                            <Button icon={<Icon name='chevron down' />} onClick={() => this.props.shiftDraftOrder( index, downIndex )}/>
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