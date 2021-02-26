import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

async function loginUser(credentials){
    return fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Login() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    function validateForm() {
        return username.length > 0 && password.length > 0
    }

    function handleSubmit(event){
        event.preventDefault()
    }

    return (
        <div className="App">
            <h1>Welcome to Berd's Website</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoFocus type="text" value={username} onChange={e => setUserName(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="username">
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}