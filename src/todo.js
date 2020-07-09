import React from 'react'

const Todo = ({ todo = '', remove, isEng, language }) => {
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
          {isEng ? language.deleteTextEn : language.deleteTextGerman}
        </span>
      </a>
    </div>
  )
}
export default Todo
