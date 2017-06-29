import React, { Component } from 'react';

class SurveyList extends Component {

    //rendering the survey get from database by dbName
    render() {
        const toggle = this.props.isToggled;
        let title = "Create a new survey question";
        let submitButton = <button type="submit">Create Question</button>;
        let toggleButton = <button type="button" onClick={this.props.createSurvey}>Create Survey</button>;
        //if button clicked change the view
        if (toggle) {
            submitButton = <button type="submit">Finish Survey</button>;
            toggleButton = null;
            title = "Please take this Survey";
        }
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <label>{title}</label>
                    <div className="comment-form-fields">
                        <textarea placeholder="Write your question here:" 
                        value={this.props.value} 
                        onChange={this.props.handlechange} ></textarea>
                    </div>
                    <div>
                        {submitButton}
                    </div>
                </form>
                <div>
                    {toggleButton}
                </div>
                <div>
                    <h3>Question List: </h3>
                    {this.props.questions}
                </div>
            </div>
        );
    }
}
export default SurveyList;