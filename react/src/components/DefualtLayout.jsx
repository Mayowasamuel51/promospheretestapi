import { Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import { useEffect } from "react"
import axiosclinet from "../axios-clinet"

function DefualtLayout() {
    const { user, token ,setUser,setToken} = useStateContext()
    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosclinet.post("/api/logout").then(() => {
            setUser({})
            setToken(null)
        })
    }

    useEffect(() => {
        axiosclinet.get("/api/user").then(({ data }) => {
            setUser(data)
        }) 
        
        axiosclinet.get("/api/try").then(({ data }) => {
            console.log(data.hello)
       }) 
    },[])
    return (
        <>
            <div className="">
                <nav className="nav">
                    <Link className="nav-link" to="/dashboard">dashboard</Link>
                    <Link className="nav-link" to="/users">users</Link>
                    <Link className="nav-link" to="/post">post</Link>
                    <Link className="nav-link" to="/views">views</Link>
                </nav>
                <div >
                    {/* <h1> {user.name}  {user.email} {user.avatar }</h1> */}
                    <a className="btn btn-dark btn-small" onClick={onLogout}>logout</a>
                </div>



                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default DefualtLayout