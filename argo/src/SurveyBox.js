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
            isTitled: false,
            dbName: 'SurveyTemplate',
        };
    }
    //TO-DO rethink of this and make sure not load it from beginning. load it when user create survey
    componentWillMount() {
        this._fetchQuestions();
    }
    // make sure user will create the dbName
    componentDidMount(){
        //reset the dbName for user to input
        this.setState({dbName: ''});
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

    // AJAX data from server and package it to json in express
    _fetchQuestions() {
        jQuery.ajax({
            method: 'GET',
            url: this.props.url+'api/questions/get',
            dataType: 'jsonp',
            success: (questions) => {
                console.log(questions);
                this.setState({ questions });
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
                url: this.props.url+'api/questions/post',
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
    _handleTitleChange(event){
        this.setState({dbName: event.target.value});
    }
    //create collection name for db 
    _handleSurveyTitle(event) {
        console.log(this.state.dbName);
        this.setState({isTitled: true});
        this._setSurveyTitle();
    }
    _setSurveyTitle(){
        if(this.state.isTitled){
            return(
                <h3>Survey Name: {this.state.dbName}</h3>
            );
        }
        else{
            return(
                    <form onSubmit={this._handleSurveyTitle.bind(this)}>
                    <label>Please write your survey title</label><br/>
                    <input placeholder ="Write your SurveyTitle" value ={this.state.dbName} onChange={this._handleTitleChange.bind(this)}/>
                    <button type = "submit">Submit Title</button>
                    </form>);
        }
    }

    render() {
        const questions = this._getQuestions();
        const surveyTitle = this._setSurveyTitle();
        const toggle = this.state.isToggled;
        //const titled = this.state.isTitled;

        let title = "Create new survey questions";
        let submitButton = <button type="submit">Create Question</button>;
        let toggleButton = <button type="button" onClick={this._handleToggle}>Create Survey</button>;
        //if button clicked change the view

        if (toggle) {
            submitButton = <button type="submit">Finish Survey</button>;
            toggleButton = null;
            title = "Please take this Survey";
        }
        return (
            <div className="survey-container">
                {surveyTitle}
                <form onSubmit={this._handleSubmit.bind(this)}>
                    <label>{title}</label>
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
                <div>
                    <h3>Question List: </h3>
                     {questions}
                     </div>
            </div>
        );
    }
}

export default SurveyBox;