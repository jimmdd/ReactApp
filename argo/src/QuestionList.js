import React, { Component } from 'react';
import jQuery from 'jquery';
import QuestionBox from './QuestionBox';


class QuestionList extends Component {

    constructor() {
        super();
        this.state = {
            questions: [],
            dbName: '',
            value: ''
        }
    }
    componentWillMount() {
        this._setDbName();
        this._fetchQuestions();
    }
    _setDbName() {
        this.setState({ dbName: this.props.dbName });

    }
    _fetchQuestions() {
        if (this.state.dbName !== null) {
            jQuery.ajax({
                method: 'GET',
                url: this.props.url + 'api/questions/get',
                dataType: 'jsonp',
                success: (questions) => {
                    this.setState({ questions });
                },
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }
    _fetchSurveys() {
        jQuery.ajax({
            method: 'GET',
            url: this.props.url + 'api/surveys/',
            dataType: 'jsonp',
            success: (questions) => {
                this.setState({ questions });
            }
        });
    }
    _createSurvey() {
        if (this.state.dbName == null) {
            alert("Your survey URL is incorrect!");
            window.location.assign(this.props.url);
        } else {
            alert("Successfully get the survey!");
            this._fetchSurveys();
        }
    }
    _getQuestions() {
        this._fetchQuestions();
        return this.state.questions.map((_question) => {
            return <QuestionBox
                question={_question.question}
                answer={_question.answer}
                key={_question.id}
                dbName={this.state.dbName} />
        });
    }
    //TO-DO handle answers POST
    _handleSubmit(event) {
        event.preventDefault();
        this._addQuestions();
        this.setState({ value: '' });
    }
    _addQuestions() {
        //if anwer is not empty and dbname is set then add question
        if (this.state.value !== '' && this.state.dbName !== '') {
            const que = {
                id: this.state.questions.length + 1,
                question: this.state.value,
                answer: '',
                dbName: this.state.dbName
            };
            this.setState({ questions: this.state.questions.concat([que]) });
            jQuery.ajax({
                method: 'POST',
                url: this.props.url + 'api/questions/post',
                data: que,
            });
        } else if (this.state.dbName === '') {
            alert("Please enter a valid survey title first");
        } else {
            alert("Please enter a valid question");
        }
    }
    render() {
        return (
            <div>
                <h3>Survey Title: {this.state.dbName}</h3>
                <p><h4>Your Survey Link: </h4>{this.props.url}api/surveys/{this.state.dbName}</p>
                <form onSubmit={this._handleSubmit.bind(this)}>
                    <div>
                        <h3>Question List: </h3>
                        {this._getQuestions()}
                    </div>
                    <button type="submit">Finish Survey</button>
                </form>
            </div>
        );
    }
}
export default QuestionList;