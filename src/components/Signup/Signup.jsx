import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { RxAvatar } from "react-icons/rx"
import styles from "../../styles/styles"
import { Link } from "react-router-dom"
import axios from "axios"
import { server } from "../../server"
import { toast } from 'react-toastify';

const Signup = () => {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const [avatar, setAvatar] = useState(null)


    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const newForm = new FormData()
        newForm.append("file", avatar)
        newForm.append("fullname", fullname)
        newForm.append("email", email)
        newForm.append("password", password)

        axios.post(`${server}/user/create-user`, newForm, config).then((res) => {
            console.log(res)
            toast.success(res.data.message)
            setFullname("")
            setEmail("")
            setPassword("")
            setAvatar(null)
        }).catch((error) => {
            toast.error(error.message)
            console.log(error)
            console.log(error.response.data.message)
        })
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Fullname</label>
                            <div className="mt-1">
                                <input type="text" name="fullname" id="fullname" value={fullname} onChange={e => setFullname(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input type="email" name="email" id="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative">
                                <input type={visible ? "text" : "password"} name="password" autoComplete="current-password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                {visible ? < AiOutlineEye className="absolute right-2 top-2 cursor-pointer" size={25} onClick={() => setVisible(!visible)} /> : < AiOutlineEyeInvisible className="absolute right-2 top-2 cursor-pointer" size={25} onClick={() => setVisible(!visible)} />}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700"></label>
                            <div className="mt-2 flex items-center">
                                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                                    {avatar ? <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover rounded-full" /> : <RxAvatar className="h-8 w-8" />}
                                </span>
                                <label htmlFor="file-input" className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50  "> <span>Uplode File</span>
                                    <input type="file" name="avatar" id="file-input" accept=".jpg,.jpeg,.png" onChange={handleFileInputChange} className="sr-only" />
                                </label>
                            </div>
                        </div>

                        <div className="button">
                            <button type="submit" className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Signup</button>
                        </div>
                        <div className={`${styles.noramlFlex} w-full`}>
                            <h4>Already have account?</h4>
                            <Link to="/login" className="text-blue-500 pl-2"> Login</Link>
                        </div>



                    </form>

                </div>
            </div>

        </div>
    )
}

export default Signup