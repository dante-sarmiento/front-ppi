import React, { useContext, useState } from 'react'

//Context
import { Context } from '@/context/ContextProvider'
import TextField from '@mui/material/TextField';

//Components
import LayoutSession from '@/layout/layoutSession'
import Loader from '@/components/Loader'
import { login, loginApiPPI } from '@/connections/user';
import { useRouter } from 'next/router';

const Login = () => {
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(Context)
    if (!context) console.log("Error de contexto")
    const { setUser, setTokenSession } = context
    const router = useRouter()


    const handleLogin = async () => {
        if (email && password) {
            setLoader(true)
            try {
                const data = await login({ email, password })
                const apiToken = await loginApiPPI()
                if (data?.status == 200 && apiToken) {
                    const { user, token } = data.data
                    setUser({ ...user, token })
                    setTokenSession(apiToken.data.accessToken)
                    localStorage.setItem('accessToken', apiToken.data.accessToken);
                    localStorage.setItem('tokenSession', token)
                    router.push('/dashboard')
                }
            } catch (error) {
                console.log("Login error", error)
                setLoader(false)
            }
        } else {
            console.log("faltan campos requeridos");
            setLoader(false)
        }
    }

    return (
        <LayoutSession>
            {loader && (
                <Loader />
            )}
            <div className='w-[30%] h-[450px] bg-white rounded-lg flex flex-col justify-center items-center p-8 gap-4'>
                <p className='text-5xl font-bold text-center'>
                    Bienvenido!
                </p>
                <p className='text-xl font-normal text-black text-center'>
                    Ingresá tu email y contraseña para iniciar sesión.
                </p>
                <div className='w-full flex flex-col justify-center items-center gap-4'>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className='text-base font-normal text-green-600 text-start w-full' onClick={() => router.push("/register")}>
                    Crear cuenta nueva.
                </button>
                <button className='text-xl w-[250px] py-2 bg-blue-500 rounded-lg text-white' onClick={handleLogin}>
                    Iniciar sesión
                </button>
            </div>
        </LayoutSession>
    )
}

export default Login