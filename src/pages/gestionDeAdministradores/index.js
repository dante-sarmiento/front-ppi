import ButtonGroup from '@/components/ButtonsGroup'
import Layout from '@/layout'
import React, { useState } from 'react'
import { deleteUser, getUsers, register } from '@/connections/user';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import ModalInfo from '@/components/ModalInfo';
import NewClientForm from '@/components/ClientsManagement/NewClientForm';
import ClientsTable from '@/components/ClientsManagement/ClientsTable';
import { useEffect } from 'react';

const buttons = [
  { label: "Tabla general", value: "general" },
  { label: "Agregar adminsitrador nuevo", value: "agregarAdmin" }
]

const GestionDeAdministradores = () => {
  const [selectedButton, setSelectedButton] = useState(buttons[0])
  const [loader, setLoader] = useState(false)
  const [email, setEmail] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [password, setPassword] = useState("")
  const [missingField, setMissingField] = useState("")
  const [userIdDelete, setUserIdDelete] = useState(null)
  const [dataUsers, setDataUsers] = useState([])
  const [modalInfo, setModalInfo] = useState({
    type: 0,
    message: "",
    active: false
  })

  const role = "ADMINISTRADOR"

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
        getDataUsers()
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
        message: error?.response?.data?.error || "Ha ocurrido un error",
        active: true
      })
    }
    setLoader(false)
  }

  const getDataUsers = async () => {
    setLoader(true);
    try {
      const roleSend = 'ADMINISTRADOR';
      const dataUsers = await getUsers(roleSend);
      setDataUsers(dataUsers);
    } catch (error) {
      console.log('getUsers error', error);
    }
    setLoader(false);
  };

  useEffect(() => {
    getDataUsers();
  }, [selectedButton]);

  const closeModal = () => {
    setModalInfo({
      type: 0,
      message: "",
      active: false
    })
  }

  const handleDeleteUser = async () => {
    setLoader(true)
    try {
      console.log("userId funcion delete", userIdDelete);
      const deletedUser = await deleteUser(userIdDelete)
      setUserIdDelete(null)
      setLoader(false)
      setModalInfo({
        type: 1,
        message: "Usuario eliminado con éxito",
        active: true
      })
      getDataUsers()
    } catch (error) {
      console.log("deleteUser error", error)
      setModalInfo({
        type: 0,
        message: error?.response?.data?.error || "Ha ocurrido un error",
        active: true
      })
      setUserIdDelete(null)
      setLoader(false)
    }
    setUserIdDelete(null)

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
      {userIdDelete && (
        <Modal>
          <div className='w-[400px] h-[200px] rounded-md bg-gray-500 flex flex-col justify-center items-center gap-4'>
            <p className='text-xl text-white font-semibold'>
              Eliminar usuario
            </p>
            <div className='w-full flex justify-center items-center gap-4'>
              <button className='bg-red-500 rounded-md px-2 py-1 text-white' onClick={() => setUserIdDelete(null)}>
                Cancelar
              </button>
              <button className='bg-blue-500 rounded-md px-2 py-1 text-white' onClick={handleDeleteUser}>
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className='w-full flex flex-col justify-center items-center gap-4'>

        <ButtonGroup
          data={buttons}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton} />
        <div className='w-full h-full flex justify-center items-start'>
          {selectedButton.value == "general" && (
            <ClientsTable
              setUserIdDelete={setUserIdDelete}
              data={dataUsers} />
          )}

          {selectedButton.value == "agregarAdmin" && (
            <NewClientForm
              setPassword={setPassword}
              setEmail={setEmail}
              setAccountNumber={setAccountNumber}
              handleRegister={handleRegister}
              missingField={missingField}
              role={role} />
          )}
        </div>
      </div>
    </Layout>


  )
}

export default GestionDeAdministradores