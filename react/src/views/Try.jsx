import { useEffect } from "react";
import axiosclinet from "../axios-clinet";




const Try = () => {
    useEffect(() => {
        async function fetchTry() {
            const response = await axiosclinet.get('/api/try');
            const data = await response.data.hello
            console.log(data)
        }
        fetchTry()
    })
    return ( 
        <div>

        </div>
    )
}

export default Try;