import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';

class App extends Component {
    state = {
        noteEntries: []
    };

    componentDidMount(){
        this.getNotes()
    }


    getNotes() {
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

    createNote = noteEntry => {
        fetch('http://localhost:8080/note', {
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

    removeNoteEntry = index => {
        // TODO deleting via endpoint
        const { noteEntries } = this.state;

        this.setState({
            noteEntries: noteEntries.filter((noteEntry, i) => {
                return i !== index;
            })
        });
    };

    handleSubmit = noteEntry => {
        this.createNote(noteEntry);
        // TODO doesn't show most recent note - read up on promises/ subscriptions?
        this.getNotes();
    };

    render() {
        const { noteEntries } = this.state;

        return (
            <div className="container">
                <h1>Notes App Frontend</h1>
                <p>Add a Note with a title and a body to the table.</p>
                <Table
                    noteEntryData={noteEntries}
                    removeNoteEntry={this.removeNoteEntry}
                />
                <h3>Add New</h3>
                <Form handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default App;
