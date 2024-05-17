import { Link } from 'react-router-dom'
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@mui/material'

const NoteList = ({ notes, changeImportance }) => {
     
    return (
        <>
        <div>
            <h2>Notes</h2>
            <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
                <button onClick={() => {changeImportance(note.id)}}>{note.important ? 'important' : 'not important'}</button>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        </>
    )
}

export default NoteList