import React, { useContext, useState } from 'react'

//Context
import { Context } from '@/context/ContextProvider'
import TextField from '@mui/material/TextField';

//Components
import LayoutSession from '@/layout/layoutSession'
import Loader from '@/components/Loader'
import { register } from '@/connections/user';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal';
import ModalInfo from '@/components/ModalInfo';

const Register = () => {
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [missingField, setMissingField] = useState("")
    const context = useContext(Context)
    if (!context) console.log("Error de contexto")
    const { setUser } = context
    const router = useRouter()
    const [modalInfo, setModalInfo] = useState({
        type: 0,
        message: "",
        active: false
    })


    const handleRegister = async () => {
        if (!password) {
            setMissingField("password")
            return
        }
        if (!email) {
            setMissingField("email")
            return
        }
        try {
            const data = await register({ email, password })
            if (data?.status == 200) {
                setModalInfo({
                    type: 1,
                    message: "Usuario creado con éxito",
                    active: true
                })
                setTimeout(() => {
                    router.push('/login')
                }, 2000);
            }
        } catch (error) {
            console.log("Register error", error)
            setModalInfo({
                type: 0,
                message: error?.response?.data || "Ha ocurrido un error",
                active: true
            })
        }
        setLoader(false)
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
            <div className='w-[30%] h-[450px] bg-white rounded-lg flex flex-col justify-center items-center p-8 gap-4'>
                <p className='text-5xl font-bold text-center'>
                    Bienvenido!
                </p>
                <p className='text-xl font-normal text-black text-center'>
                    Ingresá tu email y contraseña para registrarte.
                </p>
                <div className='w-full flex flex-col justify-center items-center gap-4'>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        helperText={missingField == "email" && "Campo requerido."}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={missingField == "password" && "Campo requerido."}
                    />
                </div>
                <button className='text-xl w-[250px] py-2 bg-green-500 rounded-lg text-white' onClick={handleRegister}>
                    Registrarme
                </button>
            </div>
        </LayoutSession>
    )
}

export default Register