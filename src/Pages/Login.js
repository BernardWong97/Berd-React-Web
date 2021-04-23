import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import potoo_img from '../images/potoo_ct.png'
import {zoomIn, shake} from 'react-animations'
import styled, { keyframes } from 'styled-components'
import {ErrorDiv} from '../components/ErrorDiv'

const IP = "192.168.0.168"
const zoomInAnim = keyframes`${zoomIn}`
const shakeAnim = keyframes`${shake}`
const ZoomDiv = styled.div`animation: 1s ${zoomInAnim}`
const ShakeDiv = styled.div`animation: 0.25s ${shakeAnim}`

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
    const [badLogin, setBadLogin] = useState(false)

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
        window.localStorage.setItem('user', JSON.stringify(token["user"]))

        if(token["status"] === "NO")
            setBadLogin(true)
    }

    return (
        <ZoomDiv className="Login">
            <h1 id="form_title">Welcome to Berd's Website</h1>
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
                <ErrorDiv visible={badLogin} duration="1.5" onDurationEnd={setBadLogin}>
                    <ShakeDiv>
                        <p id="errorMsg">Username or password incorrect</p>
                    </ShakeDiv>
                </ErrorDiv>
                <Form.Group size="lg" controlId="username">
                    <Button variant="dark" block size="lg" type="submit" disabled={!validateForm()}>
                        Login
                    </Button>
                </Form.Group>
                <p style={{color: "black", fontWeight: "bolder"}}>
                    If you want to register, please contact <a href="mailto:ben_wc88@live.com">Mr. Berd</a>.
                </p>
            </Form>
        </ZoomDiv>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}