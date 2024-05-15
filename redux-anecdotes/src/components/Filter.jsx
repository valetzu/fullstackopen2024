import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = () => {
    const dispatch = useDispatch()
    const style = {
        marginBottom: 10
      }
    return (
        <div style={style}>
          <input name="searchbar" onChange={event => dispatch(filterChange(event.target.value))}></input>
        </div>
    )
}

export default Filter