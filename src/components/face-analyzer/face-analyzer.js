import React from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

export class FaceAnalyzer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        console.log("hi",this.props.faceAnalyzerResponse);
       

        return(
            <div>
                <h3>Face Analyzer</h3>
                <DataTable value={this.props.faceAnalyzerResponse}
                paginator={true} rows={5} first={this.state.first} 
                onPage={(e) => this.setState({first: e.first})}
                scrollable={true}
                style={{width: '100%'}}
                >
                    <Column style={{width: '5%'}} key={1} field="id" header="Id"/>
                    <Column style={{width: '6%'}} key={2} field="Age Range" header="Age Range" body={data => `${data.AgeRange.Low}-${data.AgeRange.High}`} />
                    <Column style={{width: '5%'}} key={3} field="Smile" header="Smile" body={data=> `${data.Smile.Value}`}/>
                    <Column style={{width: '5%'}} key={4} field="Eyeglasses" header="Eye Glass" body={data => `${data.Eyeglasses.Value}`}/>
                    <Column style={{width: '5%'}} key={5} field="Sunglasses" header="Sun Glass" body={data => `${data.Sunglasses.Value}`}/>
                    <Column style={{width: '7%'}} key={6} field="Gender" header="Gender" body={data => `${data.Gender.Value}`}/>
                    <Column style={{width: '6%'}} key={7} field="Beard" header="Beard" body={data => `${data.Beard.Value}`}/>
                    <Column style={{width: '8%'}} key={8} field="Mustache" header="Mustache" body={data => `${data.Mustache.Value}`}/>
                    <Column style={{width: '5%'}} key={9} field="EyesOpen" header="Eyes Open" body={data => `${data.EyesOpen.Value}`}/>
                    <Column style={{width: '6%'}} key={10} field="MouthOpen" header="Mouth Open" body={data => `${data.MouthOpen.Value}`}/>
                    <Column style={{width: '10%'}} key={11} field="Emotions" header="Emotions" body={data => `${ data.Emotions.sort((x,y)=>x.Confidence < y.Confidence)[0].Type}`}/>
                    <Column style={{width: '15%'}} key={12} field="Quality" header="Quality" body={data => `Brightness=${data.Quality.Brightness}, Sharpness=${data.Quality.Sharpness}`}/>
                    <Column style={{width: '20%'}} key={13} field="Pose" header="Pose" body={data => `Roll=${data.Pose.Roll}, Yaw=${data.Pose.Yaw}, Pitch=${data.Pose.Pitch}`}/>
                    <Column style={{width: '6%'}} key={14} field="timestamp" header="Time Stamp" />
                </DataTable>
            </div>
        )
    }
}