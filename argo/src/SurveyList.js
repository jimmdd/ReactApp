import React, { Component } from 'react';

class SurveyList extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    placeholder='Questions...'
                />
                <input
                    type='text'
                    placeholder='say something'
                    value={this.state.text}
                    onChange={this.handleTextChange} />
                <input
                    type='submit'
                    value='Post' />
            </form>
        );
    }
}
export default SurveyList;