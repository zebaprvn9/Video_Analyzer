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
            uploadMessage: null,
            objectDetected: null,
            faceAnalyzer: null,
            wordTag: []
        };
        this.onUpload = this.onUpload.bind(this);
        this.onBeforeUpload = this.onBeforeUpload.bind(this);
        this.monitorProgress = this.monitorProgress.bind(this);
        this.onBeforeSend = this.onBeforeSend.bind(this);
        this.onError = this.onError.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getWordTagData = this.getWordTagData.bind(this);

    }

    onError(event) {
        this.setState({response: data, uploadMessage : "Some Error is occured on uloading file..."});
    }

    onBeforeUpload(event) {
        //console.log("onBeforeUpload", event);
        this.setState({uploadMessage : "Uploading..."});
        
    }

    onSelect(event) {
        //console.log("onSelect", event);
        this.setState({uploadMessage : "Uploading..."});
    }
   
    onBeforeSend(event) {
        //console.log("onBeforeSend", event);
        this.setState({uploadMessage : "Uploading..."});
    }

    monitorProgress(event) {
        //console.log("monitorProgress", event);
        this.setState({uploadMessage : "Summarizing"});
    }

    getWordTagData(responseData) {
        return responseData
        .sort((x,y)=>x.Confidence < y.Confidence)
        .filter((y, index, self) => index === self.findIndex(z => z.name === y.name))
        .slice(0,10)
        .map(x => {return {[x.name]:  x.confidence}});
    }

    getFaceAnalayzerWordTag(responseData) {
        let faceLabelKeys = ['Smile', 'Eyeglasses', 'Sunglasses', 'Gender', 'Beard', 'Mustache',
        'EyesOpen', 'MouthOpen']
        let faceLabel = {
            Smile: 0,
            Eyeglasses: 0,
            Sunglasses: 0,
            Gender: 0,
            Beard: 0,
            Mustache: 0,
            EyesOpen: 0,
            MouthOpen: 0
        };
        responseData.forEach(element => {
            faceLabelKeys.filter(x => element[x].Value).forEach(y => faceLabel[y] += 1);
            let emotionType = element.Emotions.sort((x,y)=>x.Confidence < y.Confidence)[0].Type;
            faceLabel[emotionType] = faceLabel[emotionType] ? (faceLabel[emotionType] + 1) : 1;
        });
        console.log("faceLabel", faceLabel);
        return faceLabel;
    }

    onUpload(event) {
        console.log(event, event.xhr, event.xhr.response, "onUpload");
        // event.xhr.onreadystatechange = (l,m,n) => {
        //     console.log("event.xhr", l,m,n);
        // }
       // console.log(event, event.xhr.responseText(), "onUpload");
       let fileName = null;
       if( event.xhr && event.xhr.response) {
        fileName = JSON.parse(event.xhr.response)[0].file;
       }
        console.log("onUpload");
        this.setState({uploadMessage: 'Analysing Object...'});
        /*return fetch('http://54.210.242.45:5000/analyse-video', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => response.json()).then(json => {
            console.log("json", json);
            fileName = json[0].file;
            this.setState({
                uploadMessage: 'Analysing Object...',
            });*/
        return fetch(`http://54.210.242.45:5000/extract-labels?file=${fileName}`)
        .then(response => response.json())
        .then(responseJson => {
            //console.log("myJson", responseJson);
            this.setState({objectDetected : responseJson, 
                uploadMessage: 'Detecting Faces...',
                wordTag: this.getWordTagData(responseJson[0]['object-detected']['labels'])
            });
            return fetch(`http://54.210.242.45:5000/extract-face-analysis?file=${fileName}`);
        })
        .then(response => response.json())
        .then(responseJson => {
            let { wordTag = [] } = this.state;
            console.log("ww", wordTag);
            this.setState({faceAnalyzer: responseJson, 
                uploadMessage: null, 
                wordTag: wordTag.concat(this.getFaceAnalayzerWordTag(responseJson[0]['face-analysis']['labels']))});
            console.log(this.state.wordTag);
        });
    }

    render () {
        
        const objectDetected = this.state.objectDetected && this.state.objectDetected[0]['object-detected']['labels'];
        //console.log("objectDetected", objectDetected);
        const faceAnalyzer = this.state.faceAnalyzer && this.state.faceAnalyzer[0]['face-analysis']['labels'];
        //const tagLabel = this.state.wordTag && this.state.wordTag;
        
        return (
            <div className="container">
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Video Analyzer</h1>
                    </div>
                </div>
                <div className="content-section implementation">
                    <FileUpload 
                        name="file" url="http://54.210.242.45:5000/analyse-video" 
                        onUpload={this.onUpload} 
                        //onSelect={this.onSelect}
                        onBeforeUpload={this.onBeforeUpload}
                        onBeforeSend={this.onBeforeSend}
                        onError={this.onError}
                        accept="file/*" 
                        maxFileSize={10000000}
                        onProgress={this.monitorProgress} />
                    <Growl ref={(el) => { this.growl = el; }}></Growl>
                    <span>{this.state.uploadMessage}</span>
                </div>
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8">
                        {this.state.wordTag ? <WordTag tagLabelResponse={this.state.wordTag}/> : undefined}
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

