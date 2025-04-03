import React, { useState } from 'react'
import Step1 from './step1'
import crypto from "crypto";
import { register } from '@/connections/user'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import ModalInfo from '@/components/ModalInfo'

const NewClientForm = ({
  setEmail,
  setPassword,
  setAccountNumber
}) => {
  const [missingField, setMissingField] = useState("")
  const [loader, setLoader] = useState(false)
  const [equalPasswords, setEqualPassword] = useState(false)
  const [modalInfo, setModalInfo] = useState({
    type: 0,
    message: "",
    active: false
  })
  const [newUserData, setNewUserData] = useState({
    email: "",
    password: "",
    role: "CLIENTE",
    firstName: "",
    lastName: "",
    broker: "",
  })

  const handleRegister = async () => {
    setLoader(true)
    try {
      const data = await register({ newUserData })
      if (data) {
        setModalInfo({
          type: 1,
          message: "Usuario creado con éxito",
          active: true
        })
        setNewUserData({
          email: "",
          password: "",
          role: "CLIENTE",
          firstName: "",
          lastName: "",
          broker: "",
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

  const closeModal = () => {
    setModalInfo({
      type: 0,
      message: "",
      active: false
    })
  }

  const passwordAutogenerate = (length = 8) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=<>?/";
    const passRdm = Array.from(crypto.randomBytes(length))
      .map((byte) => chars[byte % chars.length])
      .join("");
    return passRdm;
  };


  const createRdmPass = () => {
    const password = passwordAutogenerate();
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      password: password,
    }));
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
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
      <Step1
        missingField={missingField}
        newUserData={newUserData}
        setNewUserData={setNewUserData}
        createRdmPass={createRdmPass}
        equalPasswords={equalPasswords}
        setEqualPassword={setEqualPassword} />
      <div className='w-full flex justify-center items-center'>
        <button className='h-[50px] px-4 rounded-md bg-blue-500 text-white'
          onClick={handleRegister}
          disabled={!equalPasswords}>
          Crear nuevo cliente
        </button>
      </div>
    </div>
  )
}

export default NewClientForm