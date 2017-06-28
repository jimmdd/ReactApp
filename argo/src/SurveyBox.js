import React, { Component } from 'react';
import QuestionBox from './QuestionBox';
import jQuery from 'jquery';

class SurveyBox extends Component {

    constructor() {
        super();

        this._handleToggle = this._handleToggle.bind(this);

        this.state = {
            questions: [],
            value: '',
            isToggled: false,
            dbName: 'SurveyTemplate',
        };
    }
    componentWillMount() {
        this._fetchQuestions();
    }

    _handleToggle() {
        this.setState({ isToggled: true });
    }

    _getQuestions() {
        return this.state.questions.map((_question) => {
            return <QuestionBox
                question={_question.question}
                answer={_question.answer}
                key={_question.id} 
                dbName = {this.state.dbName}/>
        });

    }

    //TO-DO AJAX data from server and package it to json in express
    _fetchQuestions() {
        jQuery.ajax({
            method: 'GET',
            url: this.props.url,
            dataType: 'jsonp',
            success: (questions) => {
                console.log(questions);
                this.setState({ questions }).bind(this);
            }
        });
    }
    _addQuestions() {
        //if anwer is not empty then add question
        if (this.state.value !== '') {
            const que = {
                id: this.state.questions.length + 1,
                question: this.state.value,
                answer: '',
                dbName: this.state.dbName
            };
            this.setState({ questions: this.state.questions.concat([que]) });
            //add question to database
            jQuery.ajax({
                method: 'POST',
                url: this.props.url,
                data: que,
            });
        }
    }
    _handleSubmit(event) {
        event.preventDefault();
        this._addQuestions();
        this.setState({ value: '' });
    }
    _handleChange(event) {
        this.setState({ value: event.target.value });
    }
    //create collection name for db 
    _handleSurveyTitle() {

    }

    render() {
        const questions = this._getQuestions();
        const toggle = this.state.isToggled;
        let title = <label>Create New Survey Questions</label>;
        let submitButton = <button type="submit">Create Question</button>;
        let toggleButton = <button type="button" onClick={this._handleToggle}>Create Survey</button>;
        //if button clicked change the view
        if (toggle) {
            submitButton = <button type="submit">Finish Survey</button>;
            toggleButton = null;
            title = <label>Please take this Survey</label>
        }
        return (
            <div className="survey-container">
                <form onSubmit={this._handleSubmit.bind(this)}>
                    {title}
                    <div className="comment-form-fields">
                        <br />

                        <textarea placeholder="Write your question here:" value={this.state.value} onChange={this._handleChange.bind(this)} ></textarea>
                    </div>
                    <div>
                        {submitButton}
                    </div>
                </form>
                <div>
                    {toggleButton}
                </div>
                <div> {questions}</div>
            </div>
        );
    }
}

export default SurveyBox;