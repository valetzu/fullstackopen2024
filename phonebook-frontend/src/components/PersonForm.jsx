import { useState } from 'react'


function PersonForm({newName, newPhone, nameChangeHandler, submitHandler, phoneChangeHandler}) {
  return (
    <div>
     <form onSubmit={submitHandler}>
      <div>
        name: <input value={newName} onChange={nameChangeHandler}/>
      </div>
      <div>number: <input value={newPhone} onChange={phoneChangeHandler}/> </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </div>
  )
}

export default PersonForm
