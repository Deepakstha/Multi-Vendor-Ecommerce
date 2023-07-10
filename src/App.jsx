import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from './pages/SignupPage'
import ActivationPage from './pages/ActivationPage'
import HomePage from './pages/HomePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store'
import { loadUser } from './redux/actions/user'

function App() {
  useEffect(() => {
    store.dispatch(loadUser)
    console.log("first")

  }, [])

  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/activation/:activation_token" element={<ActivationPage />} />
          {/* <Route path="*" element={<ActivationPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
