import React, { useContext, useState } from 'react'

//Context
import { Context } from '@/context/ContextProvider'
import TextField from '@mui/material/TextField';

//Components
import LayoutSession from '@/layout/layoutSession'
import Loader from '@/components/Loader'
import { login, loginApiPPI } from '@/connections/user';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Modal from '@/components/Modal';
import ModalInfo from '@/components/ModalInfo';

const Login = () => {
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        type: 0,
        message: "",
        active: false
    })
    const context = useContext(Context)
    if (!context) console.log("Error de contexto")
    const { setUser, setTokenSession } = context
    const router = useRouter()


    const handleLogin = async () => {
        if (email && password) {
            setLoader(true)
            try {
                const data = await login({ email, password })
                const ppiToken = await loginApiPPI()
                if (
                    data?.status == 200
                    && ppiToken
                ) {
                    const { user, token } = data.data
                    setUser({ ...user, token })
                    setTokenSession(data?.data?.token)
                    localStorage.setItem('user', data?.data?.user?._id);
                    localStorage.setItem('ppiToken', ppiToken?.data.accessToken);
                    localStorage.setItem('tokenSession', data?.data?.token)
                    if (data?.data?.user?.role == "ADMINISTRADOR") {
                        router.push('/gestionDeClientes')
                    } else {
                        router.push('/dashboard')
                    }
                }
            } catch (error) {
                console.log("Login error", error)
                setModalInfo({
                    type: 0,
                    message: error?.response?.data?.msg || "Ha ocurrido un error al inciar sesión",
                    active: true
                })
                setLoader(false)
            }
        } else {
            console.log("faltan campos requeridos");
            setLoader(false)
        }
    }

    const closeModal = () => {
        setModalInfo({
            type: 0,
            message: "",
            active: false
        })
    }

    return (
        <LayoutSession>
            {loader && (
                <Loader />
            )}
            {modalInfo.active && (
                <Modal>
                    <ModalInfo
                        type={modalInfo.type}
                        message={modalInfo.message}
                        closeModal={closeModal} />
                </Modal>
            )}
            <div className='w-[30%] h-[500px] bg-white rounded-lg flex flex-col justify-start items-center p-8 gap-6'>
                <Image
                    src='/img/amautaLogo.png'
                    width={450}
                    height={100}
                    alt='arrow'
                    className="h-[100px]"
                />
                <div className='w-full flex flex-col justify-center items-center gap-6 h-full'>
                    <p className='text-xl font-normal text-black text-center'>
                        Ingresá tu email y contraseña para iniciar sesión.
                    </p>
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
                    <button className='text-xl w-[250px] py-2 bg-blue-500 rounded-lg text-white' onClick={handleLogin}>
                        Iniciar sesión
                    </button>
                </div>
            </div>
        </LayoutSession>
    )
}

export default Login