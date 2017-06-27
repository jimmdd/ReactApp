import React, { Component } from 'react';
import QuestionBox from './QuestionBox';
import jQuery from 'jquery';

class SurveyBox extends Component {

    constructor() {
        super();

        this.state = {
            questions: [],
            value: '',
            isToggled: false
        };
    }
    componentWillMount() {
        this._fetchQuestions();
    }
    _getQuestions() {
        return this.state.questions.map((_question) => {
            return <QuestionBox
                question={_question.question}
                answer={_question.answer}
                key={_question.id} />
        });

    }
    _fetchQuestions() {
        jQuery.ajax({
            method: 'GET',
            url: './questions.json',
            success: (questions) => {
                console.log(questions)
                this.setState({ questions })
            }
        });
    }
    _addQuestions() {
        //if anwer is not empty then add question
        if (this.state.value !== '') {
            const que = {
                id: this.state.questions.length + 1,
                question: this.state.value,
                answer: ''
            };
            this.setState({ questions: this.state.questions.concat([que]) });
            //TO-DO AJAX CALL TO SERVER TO ADD
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
    _handleToggle(event){
        console.log(this.state.isToggled);
        this.setState({isToggled: true})
    }
    render() {
        const questions = this._getQuestions();
        return (
            <div className="survey-container">
                <form onSubmit={this._handleSubmit.bind(this)}>
                    <label>Create New Survey Questions</label>
                    <div className="comment-form-fields">
                        <br />
                        <textarea placeholder="Write your question here:" value={this.state.value} onChange={this._handleChange.bind(this)} ></textarea>
                    </div>
                    <div>
                        <button type="submit">
                            Create Question
                        </button>
                    </div>
                </form>
                <div>
                    <button type="submit">
                        Create Survey
                        </button>
                </div>
                <div> {questions}</div>
            </div>
        );
    }
}
export default SurveyBox;