import React from 'react'

const Todo = ({ todo = '', remove, position }) => {
  // Each Todo
  return (
    <div>
      <a href='/' className='list-group-item'>
        {todo.text}
        <span
          class='badge badge-primary badge-pill'
          onClick={() => {
            remove(todo.id)
          }}
        >
          Delete
        </span>
      </a>
    </div>
  )
}
export default Todo
