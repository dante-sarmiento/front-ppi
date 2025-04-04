import React, { useEffect, useState } from 'react'
import ButtonGroup from '@/components/ButtonsGroup'
import Layout from '@/layout'
import ClientDataWidget from '@/components/ClientsManagement/ClientDataWidget'
import ClientInvestments from '@/components/ClientsManagement/ClientInvestments'
import AddInstrument from '@/components/ClientsManagement/addInstrument'
import { addAccount, getAccounts } from '@/connections/accounts'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import ModalInfo from '@/components/ModalInfo'

const buttons = [
    { label: "Inversiones", value: "inversiones" },
    { label: "Datos del cliente", value: "clientData" }
]

const Client = () => {
    const [selectedButton, setSelectedButton] = useState(buttons[0])
    const [loader, setLoader] = useState(false)
    const [dataInvestments, setDataInvestments] = useState([])
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

    console.log("account new user", accountNewUser)

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
                    userId: "",
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
                {selectedButton.value == "clientData" && (
                    <ClientDataWidget />
                )}
                {selectedButton.value == "inversiones" && (
                    <>
                        <ClientInvestments
                            data={dataInvestments}
                            accountNewUser={accountNewUser}
                            setAccountNewUser={setAccountNewUser}
                            setEditingAccount={setEditingAccount}
                            editingAccount={editingAccount} />
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