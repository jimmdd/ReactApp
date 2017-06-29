import React, { Component } from 'react';
import QuestionBox from './QuestionBox';
import Surveylist from './SurveyList';
import QuestionList from './QuestionList';
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
            dbName: '',
            answers: ''
        };
    }
    componentWillMount() {
       //parse the url to get dbName and check if it's a survey link
        let loc = window.location.pathname;
        let parts = loc.split('/');
        let name = parts.pop() || parts.pop();
        let des = '/api/surveys/'+name;
        if (loc === des) {
            this._fetchDbName(name);
        }
    }
    // make sure user will create the dbName
    componentDidMount() {
        //reset the dbName for user to input if survey is not already made
        if(!this.state.isToggled)
         this.setState({ dbName: '' });
    }
    _fetchDbName(name){
        this.setState({dbName: name});
        this.setState({isToggled: true});
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
                dbName={this.state.dbName} />
        });
    }

    // AJAX data from server and package it to json in express
    // _fetchQuestions() {
    //     if(this.state.dbName!==null){
    //     jQuery.ajax({
    //         method: 'GET',
    //         url: this.props.url + 'api/questions/get',
    //         dataType: 'jsonp',
    //         success: (questions) => {
    //             console.log(questions);
    //             this.setState({ questions });
    //         }
    //     });
    //     }
    // }
    _fetchSurveys(){
        jQuery.ajax({
            method: 'GET',
            url: this.props.url + 'api/surveys/get',
            dataType: 'jsonp',
            success: (questions) => {
                this.setState({ questions });
            }
        });
    }
    _createSurvey() {
        alert(this.state.questions);
        if (this.state.questions == null) {
            alert("Please create questions in the survey!");
        } else {
            alert("You are about to take the survey!");
            this.setState({ isToggled: true });
            this._fetchSurveys();
        }
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
    //submit answers by line
    _addAnswers() {
        if (this.state.value !== '') {
            const que = {
                id: this.state.questions.length + 1,
                question: this.state.value,
                answer: this.state.answers,
                dbName: this.state.dbName
            };
            this.setState({ questions: this.state.questions.concat([que]) });
            jQuery.ajax({
                method: 'POST',
                url: this.props.url + 'api/questions/post',
                data: que,
            });
        } else {
            alert("Please enter a valid question");
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
    _handleTitleChange(event) {
        this.setState({ dbName: event.target.value });
    }
    _handleAnswerChange(event) {
        this.setState({ answers: event.target.value });
    }
    //create collection name for db 
    _handleSurveyTitle(event) {
        if (this.state.dbName === '') {
            alert("Please enter your survey title");
        } else {
            this.setState({ isTitled: true });
            this._setSurveyTitle();
        }
    }
    _setSurveyTitle() {
        if (this.state.isTitled && this.state.dbName !== '') {
            return (
                <h3>Survey Name: {this.state.dbName}</h3>
            );
        }
        else {
            return (
                <form onSubmit={this._handleSurveyTitle.bind(this)}>
                    <label>Please write your survey title</label><br />
                    <input placeholder="Write your SurveyTitle" value={this.state.dbName} onChange={this._handleTitleChange.bind(this)} />
                    <button type="submit">Submit Title</button>
                </form>);
        }
    }

    render() {
        const surveyTitle = this._setSurveyTitle();
        if (!this.state.isToggled) {
            return (
                <div className="survey-container">
                    {surveyTitle}
                    <Surveylist value={this.state.value}
                        handlechange={this._handleChange.bind(this)}
                        isToggled={this.state.isTaggled}
                        handleSubmit={this._handleSubmit.bind(this)}
                        createSurvey ={this._createSurvey.bind(this)} 
                        questions = {this._getQuestions()}
                        url = {this.props.url}
                        dbName = {this.state.dbName}/>
                </div>
            );
        } else {
            return (
                <QuestionList 
                    url = {this.props.url}
                    dbName = {this.state.dbName}
                />
            );
        }
    }
}

export default SurveyBox;