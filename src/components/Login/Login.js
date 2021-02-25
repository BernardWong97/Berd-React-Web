import React from 'react'

export default function Login() {
    return (
        <div className="App">
            <h1>Welcome to Berd's Website</h1>
            <form>
                <label>
                    <p>Username or Email</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}
