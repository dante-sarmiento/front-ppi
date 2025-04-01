import React, { useState } from 'react'
import Step1 from './step1'
import Image from 'next/image'
import ButtonNextPrev from '@/components/ButtonNextPrev'
import Step2 from './step2'
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
  const [modalInfo, setModalInfo] = useState({
    type: 0,
    message: "",
    active: false
  })
  const [newUserData, setNewUserData] = useState({
    email: "",
    accountNumber: "",
    // password: "",
    role: "CLIENTE",
    firstName: "",
    lastName: "",
    broker: "",
    accountData: []
  })
  const [accountNewUser, setAccountNewUser] = useState({
    ticker: "",
    description: "",
    nominals: "",
    price: "",
    variation: "",
    performance: "",
    currentValue: "",
    initialValue: "",
    averagePurchasePrice: "",
    daysOfHolding: "",
    percentage: ""
  })

  const handleInstrument = () => {
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      accountData: [...prevUserData.accountData, accountNewUser],
    }));

    setAccountNewUser({
      ticker: "",
      description: "",
      nominals: "",
      price: "",
      variation: "",
      performance: "",
      currentValue: "",
      initialValue: "",
      averagePurchasePrice: "",
      daysOfHolding: "",
      percentage: "",
      holdingPercentage: ""
    });
  };

  const role = "CLIENTE"
  const handleRegister = async () => {
    const dataSend = newUserData
    try {
      const data = await register({ dataSend })
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

console.log("newUserData", newUserData);
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
        setNewUserData={setNewUserData} />
      <Step2
        missingField={missingField}
        accountNewUser={accountNewUser}
        setAccountNewUser={setAccountNewUser}
        handleInstrument={handleInstrument}
        newUserData={newUserData} />
        <div className='w-full flex justify-center items-center'>
          <button className='h-[50px] px-4 rounded-md bg-blue-500 text-white' onClick={handleRegister}>
            Crear nuevo cliente
          </button>
        </div>
    </div>
  )
}

export default NewClientForm