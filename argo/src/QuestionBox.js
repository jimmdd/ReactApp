import React, { Component } from 'react';

class QuestionBox extends Component {
constructor(){
    super();
    this.state = {
        value: ''
    }
}
    _handleChange(event) {
        this.setState({ value: event.target.value });
    }
    render() {
        return (
            <div>
                
                    <label>
                        {this.props.question}
                    </label><br/>
                    <label>
                    <input type="text" name="name" value = '' onChange ={this._handleChange.bind(this)} placeholder ="Write your answer here"/>
                    </label>
               
            </div>
        );
    }
}
export default QuestionBox;