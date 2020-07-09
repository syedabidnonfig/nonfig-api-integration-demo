import React from 'react'
import './App.css'
import axios from 'axios'
import Title from './title'
import TodoList from './todoList'
import TodoForm from './todoForm'

// Nonfig SDK import
import { nonfig } from '@nonfig/node-sdk'

// Creating Nonfig instance
const nonfigInstance = nonfig({
  appId: '6ab3f6d3-f092-4a12-8eec-98f245104d83', // Add your AppId here
  appSecret: '6tQLZ43hMSxVnZBxTiy5', // Add AppSecret here
  debug: true, // default: false
  cacheEnable: true, // default: true
  cacheTtl: 60 // seconds
})
class TodoApp extends React.Component {
  constructor (props) {
    // Pass props to parent class
    super(props)
    // Set initial state
    this.state = {
      data: [],
      canDelete: false,
      language: {
        deleteTextEn: 'Delete',
        deleteTextGerman: 'löschen',
        addTextEn: 'Add',
        addTextGerman: 'hinzufügen'
      },
      isEng: true
    }
    this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }
  // Lifecycle method
  componentDidMount () {
    // Get Nonfig configuration
    nonfigInstance
      .findByName('setting')
      .then(res => {
        console.log(res)
        this.setState({
          canDelete: res.canDeleteListItem,
          language: {
            deleteTextEn: res.deleteTextEn,
            deleteTextGerman: res.deleteTextGerman,
            addTextEn: res.addTextEn,
            addTextGerman: res.addTextGerman
          }
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({ canDelete: false })
      })

    // Make HTTP reques with Axios
    axios.get(this.apiUrl).then(res => {
      // Set state with result
      this.setState({ data: res.data })
    })
  }
  // Add todo handler
  addTodo (val) {
    // Assemble data
    const todo = { text: val }
    // Update data
    axios.post(this.apiUrl, todo).then(res => {
      this.state.data.push(res.data)
      this.setState({ data: this.state.data })
    })
  }
  // Handle remove
  handleRemove (id) {
    // Can only delete list item if Nonfig configuration allow
    if (!this.state.canDelete) {
      alert('Sorry, you can delete list item enable delete from Nonfig.')
      return
    }

    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter(todo => {
      if (todo.id !== id) return todo
    })
    // Update state with filter
    axios.delete(this.apiUrl + '/' + id).then(res => {
      this.setState({ data: remainder })
    })
  }

  render () {
    // Render JSX
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <button
              className='btn btn-primary'
              onClick={() => this.setState({ isEng: !this.state.isEng })}
            >
              {!this.state.isEng
                ? 'Sprache ändern (en)'
                : 'Change language (de)'}
            </button>
            <Title todoCount={this.state.data.length} />
            <TodoForm
              isEng={this.state.isEng}
              addTodo={this.addTodo.bind(this)}
              language={this.state.language}
            />
            <TodoList
              isEng={this.state.isEng}
              todos={this.state.data}
              remove={this.handleRemove.bind(this)}
              language={this.state.language}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TodoApp
