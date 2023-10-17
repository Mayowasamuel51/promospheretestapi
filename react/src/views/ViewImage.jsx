
import { useEffect, useState } from "react";
import axiosclinet from "../axios-clinet";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

function ViewImage() {


    const { user, token } = useStateContext();

    const [data, setData] = useState([]);

    const fetchfun = async () => {
        axiosclinet.get(`/api/getimage`).then((res) => {
            console.log(res.data.category)
            setData(res.data.category)
        })

        // axiosclinet.get(`/api/getmore/${user.id}`).then((res) => {
        //     console.log(res.data.images)
        //     setData(res.data.category)
        // })
    }
    useEffect(() => {
        fetchfun()
    }, [])
    return (
        <div>

            {data.map((item, index) => {
                return (
                    <div key={item.id}>
                        <div className="d-flex justify-content-between">
                            <img src={`${item.titleImageUrl}`} width="200px" height="170px" />
                            {/* <Link>{ite }</Link> */}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
export default ViewImage;