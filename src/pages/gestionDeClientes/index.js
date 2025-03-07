import ButtonGroup from '@/components/ButtonsGroup'
import Layout from '@/layout'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { register } from '@/connections/user';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import ModalInfo from '@/components/ModalInfo';

const buttons = [
  { label: "Vista general", value: "general" },
  { label: "Agregar cliente nuevo", value: "agregarCliente" }
]

const GestionDeClientes = () => {
  const [selectedButton, setSelectedButton] = useState(buttons[0])
  const [loader, setLoader] = useState(false)
  const [email, setEmail] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [password, setPassword] = useState("")
  const [missingField, setMissingField] = useState("")
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
      const roleSend = "CLIENTE"
      const data = await register({ email, password, accountNumber, roleSend })
      if (data?.status == 200) {
        setModalInfo({
          type: 1,
          message: "Usuario creado con éxito",
          active: true
        })
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
    <Layout>
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
      <ButtonGroup
        data={buttons}
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton} />
      <div className='w-full h-full flex justify-center items-start'>

        {selectedButton.value == "agregarCliente" && (
          <div className='w-[50%]  h-[450px] bg-gray-200 rounded-lg flex flex-col justify-center items-center p-8 gap-4'>
            <p className='text-xl font-normal text-black text-center'>
              Ingresá el email, contraseña y número de cuenta para registrar un nuevo cliente.
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
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                helperText={missingField == "password" && "Campo requerido."}
              />
              <TextField
                id="outlined-password-input"
                label="Número de cuenta"
                type="accountNumber"
                fullWidth
                onChange={(e) => setAccountNumber(e.target.value)}
                helperText={missingField == "accountNumber" && "Campo requerido."}
              />
            </div>

            <button className='text-xl w-[250px] py-2 bg-green-500 rounded-lg text-white' onClick={handleRegister}>
              Registrarme
            </button>
          </div>
        )}
      </div>
    </Layout>


  )
}

export default GestionDeClientes