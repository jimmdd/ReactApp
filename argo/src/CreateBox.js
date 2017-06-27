import React, { Component } from 'react';
class CreateBox extends Component {

    render() {
        return (
            <div>
                    <label>New Question</label>
                    <div className="comment-form-fields">
                            <br />
                        <textarea placeholder="Write your question here:" ></textarea>
                    </div>
            </div>
        );
    }
}
export default CreateBox;