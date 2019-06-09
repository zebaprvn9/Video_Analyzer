import React from "react";
import { TagCloud } from "react-tagcloud";
 


export class WordTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    render() {
        const dynamicWordTagData = this.props.tagLabelResponse.map((col,i) => {
            return {value: Object.keys(col)[0], count: col[Object.keys(col)[0]]};
        });
        //const customRenderer = (tag, size, color) => {
        //    return <span key={tag.value} style={{color}} className={`tag-${size}`}>{tag.value}</span>;
          //};
        const customRenderer = (tag, size, color) => (
        <span key={tag.value}
                style={{
                animation: 'blinker 3s linear infinite',
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${size}em`,
                //border: `1px solid ${color}`,
                margin: '3px',
                padding: '3px',
                display: 'inline-block',
                color: `${color}`,
                }}>{tag.value}</span>
        );
        return(
            <TagCloud tags={dynamicWordTagData}
                minSize={1}
                maxSize={5}
                shuffle={true}
               // style={{width: 300, textAlign: 'left'}}
                renderer={customRenderer} />
        )
    }
}
 
