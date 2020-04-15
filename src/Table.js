import React from 'react';

const TableHeader = () => { 
    return (
        <thead>
            <tr>
                <th>Title</th>
                <th>Note</th>
                <th>Last Modified</th>
                <th>Remove</th>
            </tr>
        </thead>
    );
}

const TableBody = props => { 
    const rows = props.noteEntryData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.title}</td>
                <td>{row.note_text}</td>
                <td>{row.last_modified_date}</td>
                <td><button onClick={() => props.removeNoteEntry(index)}>Delete</button></td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { noteEntryData, removeNoteEntry } = props;
        return (
            <table>
                <TableHeader />
                <TableBody noteEntryData={noteEntryData} removeNoteEntry={removeNoteEntry} />
            </table>
        );
}

export default Table;
