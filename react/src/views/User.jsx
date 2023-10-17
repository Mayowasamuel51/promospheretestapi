import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import { PaystackButton } from 'react-paystack'
import { Form, useAsyncError } from "react-router-dom";

// const publicKey = "pk_test_7ce5ec2ad909fa7b6203f6e43667889d0c2555db"
let mykey;
function User() {

    const [publicKey, setPublicKey] = useState([]);
    const getkey = async () => {
        const response = await fetch('http://localhost:8000/api/publickey');
        const data = await response.json()
        setPublicKey(data)
        console.log(data)
        return data
    }

    // publicKey.map((item) => {
    //     mykey = item.publickey
    // })
    const { user, token} = useStateContext();
    const [input, setInput] = useState({
        name:'',
        email: user.email,
        lastname: user.name
    })
  
    const [price, setPrice] = useState(100)
    const handlInput = (e) => {
        setInput({ ...input, [e.target.value]: e.target.name })
    }
    const [forminput, setForminput] = useState({
    
        brandName:'',
        aboutMe: '',
        Language: '',
        messageCompany: '',
        locations: '',
        websiteName: '',
        nin: '',
        passport: '',
        countrys: '',
        phone:'',
        BirthDate:'',
        name:user.name,
    })
    const handlforminput = (e) => {
        setForminput({ ...forminput, [e.target.name]: e.target.value })
    }


    const handLeSubmit = async (e, paymentmode) => {
        e.preventDefault();
        const data = {
            name: input.name,
            // email: input.email,
            lastname: input.lastname,
            paymentmode: paymentmode,
            amount: input.amount
        }
        switch (paymentmode) {
            case 'paystack':
                axios.post('http://localhost:8000/api/payment', data).then((res) => {
                    if (res.data.status === 200) {
                        let handler = PaystackPop.setup({
                            key: res.data.headers,
                            email: input.email,
                            amount: res.data.amount,
                            plan: 'PLN_kcp1464jaxs7o74',
                            plan_code: 100,
                            ref: '' + Math.floor((Math.random() * 1000000000) + 1),
                            onClose: function () {
                                alert('Window closed.');
                            },
                            callback: function (response) {
                                let message = 'Payment complete! Reference: ' + response.reference;
                                alert(message);
                                alert(amount)
                                alert(email)
                                // axios.get('http://localhost:8000/api/')
                            }
                        });
                        handler.openIframe();


                    }
                }).catch((err) => alert(err))
                break

        }
    }
    const form =  (e) => {
        e.preventDefault()
        const data = {
            phone:'',
            aboutMe: forminput.aboutMe,
            Language: forminput.Language,
            passport: forminput.passport,
            nin: forminput.nin,
            BirthDate: forminput.BirthDate,
            countrys: forminput.countrys,
            websiteName: forminput.websiteName,
            messageCompany:forminput.messageCompany,
            brandName: forminput.brandName  
        }
        axios.put(`http://localhost:8000/api/updateusersinfo/${user.id}`, data, {
            headers: {
                'Accept': 'application/vnd.api+json',
                'Authorization':`Bearer ${token}`
            },
        }).then((res) => {
            if (res.data.status === 200) {
                alert('done')
            }
        }).catch((err) => console.log('error', err.message))
    }
    return (
        <>
            <h1>User</h1>
            {/* <h2>payment monlthly {price}</h2> */}
            {user.name}
            {/* <form onSubmit={handLeSubmit} id="paymentForm">
                <input type="text" name="name" value={input.name} onChange={handlInput} />
                <input type="email" name="email" value={input.email} onChange={handlInput} />
                <input type="text" name="lastname" value={input.lastname} onChange={handlInput} />

                <button type="submit" onClick={(e) => handLeSubmit(e, 'paystack')}>pay</button>

            </form> */}

            <form onSubmit={form}>
                <h1>UPDATE USERS RECORDS</h1>
                <input type="text" name="name" placeholder="name" value={forminput.name} onChange={handlforminput} />


                <input type="text" name="brandName" placeholder="brandName" value={forminput.brandName} onChange={handlforminput} />


                <input type="text" name="nin" placeholder="nin" value={forminput.nin} onChange={handlforminput} />

                <input type="date" name="BirthDate" placeholder="BirthDate" value={forminput.BirthDate} onChange={handlforminput} />
                <input type="date" name="phone" placeholder="phone" value={forminput.phone} onChange={handlforminput} />

                <input type="text" name="websiteName" placeholder="websiteName" value={forminput.websiteName} onChange={handlforminput} />


                <input type="text" name="passport" placeholder="passport" value={forminput.passport} onChange={handlforminput} />
             


                <input type="text" name="Language" placeholder="Language" value={forminput.Language} onChange={handlforminput} />

                <input type="text" name="countrys" placeholder="countrys" value={forminput.countrys} onChange={handlforminput} />

                
                <input type="text" name="locations" placeholder="locations" value={forminput.locations} onChange={handlforminput} />

                <input type="text" name="aboutMe" placeholder="aboutMe" value={forminput.aboutMe} onChange={handlforminput} />

                <input type="text" name="messageCompany" placeholder="messageCompany" value={forminput.messageCompany} onChange={handlforminput} />
               
                <button type="submit">save</button>

               
            </form>

        </>
    )
}

export default User;