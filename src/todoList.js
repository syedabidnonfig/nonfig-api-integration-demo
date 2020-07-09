import React from 'react'
import Todo from './todo'

export const TodoList = ({ todos, remove }) => {
  // Map through the todos
  const todoNode = todos.map((todo, index) => {
    return (
      <Todo todo={todo} key={todo.id} remove={remove} position={index + 1} />
    )
  })
  return (
    <div className='list-group' style={{ marginTop: '30px' }}>
      {todoNode}
    </div>
  )
}
export default TodoList
