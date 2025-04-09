import ClientDataWidget from '@/components/ClientsManagement/ClientDataWidget'
import Layout from '@/layout'
import React, { useState, useContext } from 'react'
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import ModalInfo from '@/components/ModalInfo';
import { getUser, updateUser } from '@/connections/user';
import { Context } from '@/context/ContextProvider';

const Perfil = () => {
  const [modalInfo, setModalInfo] = useState({
    type: 0,
    message: "",
    active: false
  })
  const [newDataUser, setNewDataUser] = useState({})
  const [loader, setLoader] = useState(false)
  const [dataUser, setDataUser] = useState({})
  const context = useContext(Context)
  if (!context) console.log("Error de contexto")
  const { user } = context

  const getUserIdFromUrl = () => {
    const parts = window.location.pathname.split("/")
    return parts[parts.length - 1]
  };

  const getDataUser = async () => {
    const userId = getUserIdFromUrl();
    try {
      const userData = await getUser(userId);
      setDataUser(userData)
    } catch (error) {
      setModalInfo({
        type: 0,
        message: error?.response?.data?.error || "Ha ocurrido un error",
        active: true
      })
    }
  }

  const handleUpdateUser = async () => {
    setLoader(true)
    const dataSend = {
      ...newDataUser,
      id: user._id
    }
    try {
      const updUser = await updateUser(dataSend)
      setModalInfo({
        type: 1,
        message: "Contraseña modificada con éxito",
        active: true
      })
    } catch (error) {
      setModalInfo({
        type: 0,
        message: error?.response?.data?.error || "Ha ocurrido un error",
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

  console.log("user", user);
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
      <ClientDataWidget
        userData={dataUser}
        isAdmin={user?.role == "ADMINISTRADOR" || true}
        newDataUser={newDataUser}
        setNewDataUser={setNewDataUser}
        handleUpdateUser={handleUpdateUser} />
    </Layout>
  )
}

export default Perfil