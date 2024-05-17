import { Link } from 'react-router-dom'
const NoteList = ({ notes, changeImportance }) => {
     
    return (
        <>
        <div>
            <h2>Notes</h2>
            <ul>
            {notes.map(note =>
            <li key={note.id}>
                <Link to={`/notes/${note.id}`}>
                    {note.content}
                </Link>
                <button onClick={() => changeImportance(note.id)}>{note.important ? 'important' : 'not important'}</button>
            </li>)}
            </ul>
        </div>
        </>
    )
}

export default NoteList