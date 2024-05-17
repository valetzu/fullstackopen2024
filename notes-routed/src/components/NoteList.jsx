import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const NoteList = ({ notes, changeImportance }) => {
     
    return (
        <>
        <div>
            <h2>Notes</h2>
            <Table striped>
                <tbody>
                {
                    notes.map(note => { 
                        return(
                            <tr key={note.id}>
                                <td>
                                    <Link to={`/notes/${note.id}`}>
                                        {note.content}
                                    </Link>
                                    <button onClick={() => changeImportance(note.id)}>
                                        {note.important ? 'important' : 'not important'}
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default NoteList