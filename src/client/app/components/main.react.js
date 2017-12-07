import React from 'react';

export default class Main extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="row">
                {this.props.children}
            </div>
        );
    }

}