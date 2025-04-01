import ButtonGroup from '@/components/ButtonsGroup'
import Layout from '@/layout'
import React, { useState } from 'react'
import { register } from '@/connections/user';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import ModalInfo from '@/components/ModalInfo';
import NewClientForm from '@/components/ClientsManagement/NewClientForm';
import ClientsTable from '@/components/ClientsManagement/ClientsTable';

const buttons = [
  { label: "Tabla general", value: "general" },
  { label: "Agregar cliente nuevo", value: "agregarCliente" }
]

const GestionDeClientes = () => {
  const [selectedButton, setSelectedButton] = useState(buttons[0])
  const [loader, setLoader] = useState(false)
  const [email, setEmail] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [password, setPassword] = useState("")
  const [missingField, setMissingField] = useState("")
  const [modalInfo, setModalInfo] = useState({
    type: 0,
    message: "",
    active: false
  })

  const role = "CLIENTE"
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
      const data = await register({ email, password, accountNumber, role })
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
        message: error?.response?.data?.error|| "Ha ocurrido un error",
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
      <div className='w-full flex flex-col justify-center items-center gap-4'>

      <ButtonGroup
        data={buttons}
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton} />
      <div className='w-full h-full flex justify-center items-start'>
        {selectedButton.value == "general" && (
          <ClientsTable />
        )}

        {selectedButton.value == "agregarCliente" && (
          <NewClientForm
            setPassword={setPassword}
            setEmail={setEmail}
            setAccountNumber={setAccountNumber}
            handleRegister={handleRegister}
            missingField={missingField} />
        )}
      </div>
      </div>
    </Layout>


  )
}

export default GestionDeClientes