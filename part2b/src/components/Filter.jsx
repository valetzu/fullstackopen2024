import { useState } from 'react'


function Filter({ filterName, handler }) {
  const filter = filterName
  const searchHandler = handler
  return (
    <div>
     <h1>Search:</h1>
    <input value={filter} onChange={searchHandler}></input>
    </div>
  )
}

export default Filter
