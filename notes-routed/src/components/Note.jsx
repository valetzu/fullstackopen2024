import { useParams } from 'react-router-dom'
const Note = ({ notes }) => {
    const id = useParams().id
    const note = notes.find(n => n.id === Number(id))
    const showNoteContent = () => {
        return (
            <>
                <h2>{note.content}</h2>
                <div>Important: {note.important}</div>
                <div>{note.user}</div>
            </>
        )
    }

    const DoesNotExist = () => {
        return (
            <>
                <h2>The note with ID {id} does not exist.</h2>
            </>
        )
    }
    return (
        <>
            {note !== undefined ? showNoteContent() : DoesNotExist()}
        </>
    )
}
export default Note