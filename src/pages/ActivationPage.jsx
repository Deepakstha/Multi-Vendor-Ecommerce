import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { server } from "../server"
import axios from "axios"

const ActivationPage = () => {
    const { activation_token } = useParams()
    const [error, setError] = useState(false)
    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${server}/user/activation`, {
                        activation_token
                    })
                    console.log(activation_token, "activation Token")
                    console.log(res.data, "resds")
                } catch (error) {
                    console.log(error)
                    setError(true)
                }
                console.log(activation_token, "activation Token")


            }
            activationEmail()
        }
    }, [activation_token])
    return (
        <div>
            {error ? <h1>Error</h1> : <h1>Success</h1>}
        </div>
    )
}

export default ActivationPage