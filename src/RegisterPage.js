import React, {useState} from 'react'
import API from './API'

export default function RegisterPage(props) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {name, email, password}
    console.log('submiting : ', payload)
    API.post('/users', payload).then((res) => {
      alert('registered !')
    })
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} >
        <label htmlFor="name" required name="name">Name : </label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} /> 
        <label htmlFor="email" name="email">Email : </label>
        <input id="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> 
        <label htmlFor="password" name="password">Password : </label>
        <input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
        <input type="submit" value="Go"/>
      </form>
    </div>
  )
} 