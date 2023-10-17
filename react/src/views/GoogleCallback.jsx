import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import axiosclinet from '../axios-clinet';
import { useStateContext } from '../contexts/ContextProvider';

function GoogleCallback() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    // const [user, setUser] = useState(null);
    const location = useLocation();
    const { user, token ,setUser,setToken} = useStateContext()
    // On page load, we take "search" parameters
    // and proxy them to /api/auth/callback on our Laravel API
    
    useEffect(() => {
        axiosclinet.get(`http://localhost:8000/api/auth/callback${location.search}`).then((res) => {
            setUser(res.data.users)
            console.log(res.data.token)
            setToken(res.data.token)
        }).catch((err)=>console.log(err.message))
    },[])
    
    // useEffect(() => {
    //     fetch(`http://localhost:8000/api/auth/callback${location.search}`, {
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         }
    //     })
    //         .then((response) => {
    //             console.log(response)
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setLoading(false);
    //             setData(data);
    //             console.log(data.data.token)
    //             localStorage.setItem("ACCESS_TOKEN",data.token )
    //         });
    // }, []);

    // Helper method to fetch User data for authenticated user
    // Watch out for "Authorization" header that is added to this call
    // function fetchUserData() {
    //     fetch(`http://localhost:8000/api/user`, {
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer ' + data.data.token,
    //         }
    //     })
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setUser(data);
    //             localStorage.setItem("ACCESS_TOKEN",data.data.token )
    //         });
    // }

    // if (loading) {
    //     return <DisplayLoading/>
    // } else {
    //     if (user != null) {
    //         return <DisplayData data={user}/>
    //     } else {
    //         return (
    //             <div>
    //                 <DisplayData data={data}/>
    //                 <div style={{marginTop:10}}>
    //                     <button onClick={fetchUserData}>Fetch User</button>
    //                 </div>
    //             </div>
    //         );
    //     }
    // }
}

function DisplayLoading() {
    return <div>Loading....</div>;
}

function DisplayData(data) {
    return (
        <div>
            <samp>{JSON.stringify(data, null, 2)}</samp>
        </div>
    );
}

export default GoogleCallback;