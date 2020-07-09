import React from 'react'

const TodoForm = ({ addTodo }) => {
  // Input Tracker
  let input
  // Return JSX
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        input.value = ''
      }}
    >
      <div className='row d-flex'>
        <div className='col-md-11'>
          <input
            className='form-control'
            ref={node => {
              input = node
            }}
          />
        </div>
        <div className='col-md-1'>
          <button
            className='btn btn-primary'
            onClick={() => addTodo(input.value)}
          >
            Add
          </button>
        </div>
      </div>
      <br />
    </form>
  )
}

export default TodoForm
