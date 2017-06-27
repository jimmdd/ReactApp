import React, { Component } from 'react';

class QuestionBox extends Component {

    render() {
        return (
            <div>
                <form>
                    <label>
                        {this.props.question}
                    </label><br/>
                    <label>
                    <input type="text" name="name" value = '' placeholder ="Write your answer here"/>
                    </label>
                </form>
            </div>
        );
    }
}
export default QuestionBox;