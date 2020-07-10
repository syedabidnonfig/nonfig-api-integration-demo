import React from 'react'

const Todo = ({ todo = '', remove, isEng, settings }) => {
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
          {isEng ? settings.en.deleteText : settings.de.deleteText}
        </span>
      </a>
    </div>
  )
}
export default Todo
