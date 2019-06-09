import React from "react";
import {Growl} from 'primereact/growl';
import {FileUpload} from 'primereact/fileupload';
import { data } from "../response";
import { ObjectDetection } from "../object-detection/object-detection";
import { FaceAnalyzer } from "../face-analyzer/face-analyzer";
import { WordTag } from "../word-tag/word-tag";

export class UploadVideo extends React.Component {
    constructor() {
        super();
        this.state = {
            response : null,
            uploadMessage: null
        };
        this.onUpload = this.onUpload.bind(this);
        this.onBeforeUpload = this.onBeforeUpload.bind(this);
        this.monitorProgress = this.monitorProgress.bind(this);
        this.onBeforeSend = this.onBeforeSend.bind(this);
        this.onError = this.onError.bind(this);
        this.onSelect= this.onSelect.bind(this);

    }

    onError(event) {
        this.setState({response: data, uploadMessage : "Some Error is occured on uloading file..."});
    }

    onBeforeUpload(event) {
        console.log("onBeforeUpload", event);
        this.setState({uploadMessage : "Uploading..."});
    }

    onSelect(event) {
        console.log("onSelect", event);
        this.setState({uploadMessage : "Uploading..."});
    }
   
    onBeforeSend(event) {
        console.log("onBeforeSend", event);
        this.setState({uploadMessage : "Analyzing Object and Detecting Faces"});
    }

    monitorProgress(event) {
        console.log("monitorProgress", event);
        this.setState({uploadMessage : "Summarizing"});
    }

    onUpload(event) {
        console.log("onUpload");
        this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'})
        this.setState({response: data, uploadMessage : null});
    }

    render () {
        
        const objectDetected = this.state.response && this.state.response['object-detected'];
        const faceAnalyzer = this.state.response && this.state.response['face-analysis'];
        const tagLabel = this.state.response && this.state.response['label-tag-cloud'];
        
        return (
            <div className="container">
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Video Analyzer</h1>
                    </div>
                </div>
                <div className="content-section implementation">
                    <FileUpload 
                        name="demo[]" url="https://www.mocky.io/v2/5185415ba171ea3a00704eed" 
                        onUpload={this.onUpload} 
                        //onSelect={this.onSelect}
                        onBeforeUpload={this.onBeforeUpload}
                        onBeforeSend={this.onBeforeSend}
                        onError={this.onError}
                        accept="image/*" 
                        maxFileSize={1000000}
                        onProgress={this.monitorProgress} />
                    <Growl ref={(el) => { this.growl = el; }}></Growl>
                    <span>{this.state.uploadMessage}</span>
                </div>
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8">
                        {tagLabel ? <WordTag tagLabelResponse={tagLabel}/> : undefined}
                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
                { objectDetected ? <ObjectDetection objectDetectedResponse={objectDetected}/> : undefined }
                {faceAnalyzer ? <FaceAnalyzer faceAnalyzerResponse={faceAnalyzer}/> : undefined}
                
            </div>

        )
    }
}

