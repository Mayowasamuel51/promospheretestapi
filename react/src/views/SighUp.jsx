import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosclinet from "../axios-clinet";
import { useStateContext } from "../contexts/ContextProvider";




function SighUp() {
    const nameRef = useRef();
    const [error, setError] = useState(null)
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfrimationRef = useRef();
    const { setUser, setToken } = useStateContext()
    const formSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfrimationRef.current.value,
            email:emailRef.current.value
        }       
        
        axiosclinet.post('/api/register', payload, {
            headers: {
                Accept: "application/vnd.api+json",  
            }
        }).then((res) => {
            setUser(res.data.users)
            setToken(res.data.token)
        }).catch(err => {
           console.log(payload)
            console.log(err.message)
            const response = err.response;
            console.log(response)
            if (response && response.status === 422) {
                // response.data.errors
                console.log(response.data.errors)
                setError(response.data.errors)
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
            <h1>SighUp</h1>
            {error && <div className="text-danger">{
                Object.keys(error).map(key => ( 
                    <p key={key}>{error[key][0] }</p>
            ))
            }</div>}
            <form onSubmit={formSubmit} className="container" method="post">
                <input ref={nameRef} placeholder="fullname" className="form-control" />
                <input ref={emailRef} placeholder="email" className="form-control" />
                <input ref={passwordRef} placeholder="password" className="form-control" />
                <input ref={passwordConfrimationRef} placeholder="password confrimation " className="form-control" />
                <button type="submit" className="btn btn-info">register </button>

                <div>
                    <Link to="/login">login</Link>
                </div>
                <div>

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

export default SighUp;