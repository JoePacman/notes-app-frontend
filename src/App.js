import React, {Component} from 'react';
import Table from './Table';
import Form from './Form';

class App extends Component {

    // functions of the form 'function_name(vars..) {}' need to be bound in the constructor
    // see https://stackoverflow.com/questions/52472386/react-typeerror-this-fetchposts-is-not-a-function
    constructor(props){
        super(props);
        this.saveNoteCall = this.saveNoteCall.bind(this);

    }

    state = {
        noteEntries: []
    };

    componentDidMount() {
        this.getNotes()
    }


    getNotes() {
        //TODO deploy to GCP and setup environment variables
        fetch('http://localhost:8080/note/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"user": "joseph.w.packham@gmail.com"})
        })
            .then(result => result.json())
            .then(result => {
                this.setState({
                    noteEntries: result.matches
                })
            });
    };

    async saveNoteCall(noteEntry) {
        await fetch('http://localhost:8080/note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": noteEntry.title,
                "note_text": noteEntry.note_text,
                "user": "joseph.w.packham@gmail.com",
            })
        })
    };

    saveNote = noteEntry => {
        console.log(process.env.REACT_APP_API_BASE);
        this.saveNoteCall(noteEntry)
            .then(() => {
                this.getNotes();
            });
    };

    async removeNoteCall(noteEntry) {
        await fetch('http://localhost:8080/note', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": noteEntry.title,
            })
        })
    };


    removeNoteEntry = index => {
        const {noteEntries} = this.state;
        this.removeNoteCall(noteEntries[index])
            .then(() => {
                this.getNotes();
            });
    };

    render() {
        const {noteEntries} = this.state;

        return (
            <div className="container">
                <h1>Notes App Frontend</h1>
                <p>Add a Note with a title and a body to the table.</p>
                <Table
                    noteEntryData={noteEntries}
                    removeNoteEntry={this.removeNoteEntry}
                />
                <h3>Add New</h3>
                <Form saveNote={this.saveNote}/>
            </div>
        );
    }
}

export default App;
