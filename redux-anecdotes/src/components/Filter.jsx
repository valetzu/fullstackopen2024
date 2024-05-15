import { useSelector, useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = () => {
    const dispatch = useDispatch()
    return (
        <div>
          <input name="searchbar" onChange={event => dispatch(filterChange(event.target.value))}></input>
        </div>
    )
}

export default Filter