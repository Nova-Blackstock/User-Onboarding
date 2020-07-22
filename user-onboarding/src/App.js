import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import formSchema from './formSchema'
import * as yup from 'yup'
import axios from 'axios'
import User from './User'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  term: {
    accept: false
  }
}

const initialFormErrors = {
  name: '',
  email: '',
  password: ''
}

const initialUsers= []
const initialDisabled = true

function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res =>{
        setUsers(res.data.data)
        console.log(res.data.data)
      })
      .catch(err =>{
        debugger
      })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res =>{
      setUsers([res.data, ...users])
      setFormValues(initialFormValues)
    })
    .catch(err => {
      debugger
    })
  }

  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid =>{
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const checkboxChange = (name, isChecked) =>{
    setFormValues({
      ...formValues,
      term: {
        ...formValues.term,
        [name]:isChecked,
      }
    })
  }

  const submit = () =>{
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      term: Object.keys(formValues.term).filter(t => formValues.term[t]),
    }
    postNewUser(newUser)
  }

  useEffect(() =>{
    getUsers()
  }, [])

  useEffect(() =>{
    formSchema.isValid(formValues).then(valid =>{
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Form
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />
      {
        users.map(user =>{
          return(
            <User key={user.id} user={user}/>
          )
        })
      }
    </div>
  );
}

export default App;
