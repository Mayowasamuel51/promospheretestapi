
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosclinet from "../axios-clinet";
import { useStateContext } from "../contexts/ContextProvider"



function Login() {
    const [error, setError] = useState(null)
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser,setToken}= useStateContext()
    const formSubmit = (e) => {
        e.preventDefault();
        const payload = {
            password: passwordRef.current.value,
            email: emailRef.current.value
        }
        setError(null)
        axiosclinet.post('/api/login', payload, {
            headers: {
                Accept: "application/vnd.api+json",
            }
        }).then((res) => {
            setUser(res.data.data.users)
            console.log(res.data.data.token)
            setToken(res.data.data.token)
        }).catch(err => {
           
            console.log(err.message)
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setError(response.data.errors)
                }
                else {
                    setError({
                        email: [response.data.message]
                    })
                }
            }
        })
    }

    const [loginUrl, setLoginUrl] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/auth', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => setLoginUrl( data.url ))
            .catch((error) => console.error(error));
    }, []);
    
    return (
        <>
            <h1>Login</h1>
            {error && <div className="text-danger">{
                Object.keys(error).map(key => (
                    <p key={key}>{error[key][0]}</p>
                ))
            }</div>}
            <form onSubmit={formSubmit} className="container">

                <input ref={emailRef} placeholder="email" className="form-control" />

                <input ref={passwordRef} placeholder="password" className="form-control" />

                <button type="submit" className="btn btn-info">Login </button>
                <div>
                    <Link to="/sighup">creaate a account</Link>
                </div>
            </form>
            <div>
            {loginUrl != null && (
                <a href={loginUrl}>Google Sign In</a>
            )}
        </div>
        </>
    )
}

export default Login;