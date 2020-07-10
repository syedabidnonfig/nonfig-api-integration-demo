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
      isEng: true,
      settings: {
        canDeleteListItem: false,
        en: {
          deleteText: 'Delete',
          addText: 'Add'
        },
        de: {
          deleteText: 'Löschen',
          addText: 'Hinzufügen'
        }
      }
    }
    this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }
  // Lifecycle method
  componentDidMount () {
    // Get Nonfig configuration
    nonfigInstance
      .findByName('settings')
      .then(settings => {
        console.log(settings)
        this.setState({
          settings
        })
      })
      .catch(err => {
        console.log(err)
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
    if (!this.state.settings.canDeleteListItem) {
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
              settings={this.state.settings}
            />
            <TodoList
              isEng={this.state.isEng}
              todos={this.state.data}
              remove={this.handleRemove.bind(this)}
              settings={this.state.settings}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TodoApp
