import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        
        this.initialState = {
            title: '',
            note_text: ''
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { title, value } = event.target;

        this.setState({
            [title] : value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { title, note_text } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    title="title"
                    id="title"
                    value={title}
                    onChange={this.handleChange} />
                <label htmlFor="note">Note</label>
                <input 
                    type="text" 
                    title="note_text"
                    id="note_text"
                    value={note_text}
                    onChange={this.handleChange} />
                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }
}

export default Form;
