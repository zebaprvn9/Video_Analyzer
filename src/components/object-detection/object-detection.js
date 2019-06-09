import React from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

export class ObjectDetection extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        console.log(this.props.objectDetectedResponse);
        const columns = [
            {field: 'id', header: 'Id'},
            {field: 'name', header: 'Name'},
            {field: 'confidence', header: 'Confidence'},
            {field: 'timestamp', header: 'Timestamp'}
        ];

        const dynamicColumns = columns.map((col,i) => {
            return <Column key={col.field} field={col.field} header={col.header} />;
        });

        return(
            <div>
                <h3>Object Detection</h3>
                <DataTable value={this.props.objectDetectedResponse}
                paginator={true} rows={5} first={this.state.first} 
                onPage={(e) => this.setState({first: e.first})}
                >
                    {dynamicColumns}
                </DataTable>
            </div>
        )
    }
}