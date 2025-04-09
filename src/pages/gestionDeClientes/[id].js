import React, { useContext, useEffect, useState } from 'react'
import ButtonGroup from '@/components/ButtonsGroup'
import Layout from '@/layout'
import ClientDataWidget from '@/components/ClientsManagement/ClientDataWidget'
import ClientInvestments from '@/components/ClientsManagement/ClientInvestments'
import AddInstrument from '@/components/ClientsManagement/addInstrument'
import { addAccount, deleteAccount, getAccounts } from '@/connections/accounts'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import ModalInfo from '@/components/ModalInfo'
import { getUser } from '@/connections/user'
import { Context } from '@/context/ContextProvider';

const buttons = [
    { label: "Inversiones", value: "inversiones" },
    { label: "Datos del cliente", value: "clientData" }
]

const Client = () => {
    const context = useContext(Context)
    if (!context) console.log("Error de contexto")
    const { user } = context
    const [selectedButton, setSelectedButton] = useState(buttons[0])
    const [loader, setLoader] = useState(false)
    const [dataInvestments, setDataInvestments] = useState([])
    const [userData, setUserData] = useState(null)
    const [accountIdDelete, setAccountIdDelete] = useState(null)
    const [modalInfo, setModalInfo] = useState({
        type: 0,
        message: "",
        active: false
    })
    const [editingAccount, setEditingAccount] = useState(null)
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
        holdingPercentageDays: "",
        percentage: "",
        userId: "",
        type: ""
    })

    const getDataInvestments = async () => {
        setLoader(true)
        const userId = getUserIdFromUrl()
        try {
            const data = await getAccounts(userId)
            setDataInvestments(data)
        } catch (error) {
            console.log("error get investments", error)
            setModalInfo({
                type: 0,
                message: error?.response?.data?.error || "Ha ocurrido un error",
                active: true
            })
        }
        setLoader(false)
    }

    useEffect(() => {
        getDataInvestments()
    }, [])


    const getUserIdFromUrl = () => {
        const parts = window.location.pathname.split("/")
        return parts[parts.length - 1]
    };

    useEffect(() => {
        const userId = getUserIdFromUrl();
        setAccountNewUser({ ...accountNewUser, userId: userId })
    }, [])

    const getUserById = async () => {
        setLoader(true)
        try {
            const userId = getUserIdFromUrl()
            const dataUser = await getUser(userId)
            setUserData(dataUser?.user)
        } catch (error) {
            setModalInfo({
                type: 0,
                message: error?.response?.data?.error || "Ha ocurrido un error",
                active: true
            })
        }
        setLoader(false)
    }

    useEffect(() => {
        if (selectedButton.value == "clientData" && !userData) {
            getUserById()
        }
    }, [selectedButton])


    const handleInstrument = async () => {
        try {
            const account = await addAccount(accountNewUser)
            if (account) {
                getDataInvestments()
                setModalInfo({
                    type: 1,
                    message: "Registro creada con exito",
                    active: true
                })
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
                    holdingPercentageDays: "",
                    percentage: "",
                    userId: getUserIdFromUrl(),
                    type: ""
                })
            }
        } catch (error) {
            console.log("error al guardar cuenta", error)
            setModalInfo({
                type: 0,
                message: error?.response?.data?.error || "Ha ocurrido un error al crear cuenta",
                active: true
            })
        }
    }

    const closeModal = () => {
        setModalInfo({
            type: 0,
            message: "",
            active: false
        })
    }

    const handleDeleteAccount = async () => {
        setLoader(true)
        try {
            const deletAcc = await deleteAccount(accountIdDelete)
            setAccountIdDelete(null)
            setLoader(false)
            setModalInfo({
                type: 1,
                message: "Ceunta eliminada con éxito",
                active: true
            })
            getDataInvestments()
        } catch (error) {
            console.log("deleteAccount error", error)
            setModalInfo({
                type: 0,
                message: error?.response?.data?.error || "Ha ocurrido un error",
                active: true
            })
            setAccountIdDelete(null)
            setLoader(false)
        }
        setLoader(false)
    }

    useEffect(() => {

    }, [])



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
            {accountIdDelete && (
                <Modal>
                    <div className='w-[400px] h-[200px] rounded-md bg-gray-500 flex flex-col justify-center items-center gap-4'>
                        <p className='text-xl text-white font-semibold'>
                            Eliminar cuenta
                        </p>
                        <div className='w-full flex justify-center items-center gap-4'>
                            <button className='bg-red-500 rounded-md px-2 py-1 text-white' onClick={() => setAccountIdDelete(null)}>
                                Cancelar
                            </button>
                            <button className='bg-blue-500 rounded-md px-2 py-1 text-white' onClick={handleDeleteAccount}>
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
                {selectedButton.value == "clientData" && (
                    <ClientDataWidget
                        userData={userData}
                        isAdmin={user?.role == "ADMINISTRADOR" || true} />
                )}
                {selectedButton.value == "inversiones" && (
                    <>
                        <ClientInvestments
                            data={dataInvestments}
                            accountNewUser={accountNewUser}
                            setAccountNewUser={setAccountNewUser}
                            setEditingAccount={setEditingAccount}
                            editingAccount={editingAccount}
                            setAccountIdDelete={setAccountIdDelete} />
                        <AddInstrument
                            accountNewUser={accountNewUser}
                            setAccountNewUser={setAccountNewUser}
                            handleInstrument={handleInstrument} />
                    </>
                )}
            </div>
        </Layout>
    )
}

export default Client