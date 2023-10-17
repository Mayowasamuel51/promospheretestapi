import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
// import "./paystack.js"
import { PaystackButton } from 'react-paystack'
const publicKey = "pk_test_7ce5ec2ad909fa7b6203f6e43667889d0c2555db"
const Dashboard = () => {
    const { user } = useStateContext();
    const amount = 1000000 // Remember, set in kobo!
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const componentProps = {
        email,
        amount,
        metadata: {
            name,
            phone,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () =>
            alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    }
    return (
        <div>
            <h1>Dashboard</h1>

            <h1>Payment form for    {user.name}</h1>

            <div className="checkout-form">
                <div className="checkout-field">
                    <label>Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="checkout-field">
                    <label>Email</label>
                    <input
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="checkout-field">
                    <label>Phone</label>
                    <input
                        type="text"
                        id="phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <PaystackButton className="paystack-button" {...componentProps} />
            </div>
        </div>
    )
}

export default Dashboard;