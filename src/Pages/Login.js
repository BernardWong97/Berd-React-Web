import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import potoo_img from '../images/potoo_ct.png'
import {fadeIn} from 'react-animations'
import styled, { keyframes } from 'styled-components'

const IP = "192.168.0.168"
const fadeInAnim = keyframes`${fadeIn}`
const FadeDiv = styled.div`animation: 3s ${fadeInAnim}`

async function loginUser(credentials){
    return fetch(`http://${IP}:5000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
    .catch(e => {
        console.log(e)
    })
}

export default function Login({setToken}) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    function validateForm() {
        return username.length > 0 && password.length > 0
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const token = await loginUser({
            username,
            password
        })
        setToken(token)
    }

    return (
        <FadeDiv className="Login">
            <h1>Welcome to Berd's Website</h1>
            <img id="potoo_ct" src={potoo_img} width="25%" height="25%" alt=""/>
            <Form onSubmit={handleSubmit} id="login_form">
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className="form_control" autoComplete="new-password" autoFocus type="text" value={username} onChange={e => setUserName(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="form_control" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="username">
                    <Button variant="dark" block size="lg" type="submit" disabled={!validateForm()}>
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </FadeDiv>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}