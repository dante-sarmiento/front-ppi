import React, { useState } from 'react'
import ButtonGroup from '@/components/ButtonsGroup'
import Layout from '@/layout'
import ClientDataWidget from '@/components/ClientsManagement/ClientDataWidget'
import ClientInvestments from '@/components/ClientsManagement/ClientInvestments'

const buttons = [
    { label: "Inversiones", value: "inversiones" },
    { label: "Datos del cliente", value: "clientData" }
]

const Client = () => {
    const [selectedButton, setSelectedButton] = useState(buttons[0])
    return (
        <Layout>
            <div className='w-full flex flex-col justify-center items-center gap-4'>
                <ButtonGroup
                    data={buttons}
                    selectedButton={selectedButton}
                    setSelectedButton={setSelectedButton} />
                {selectedButton.value == "clientData" && (
                    <ClientDataWidget />
                )}
                {selectedButton.value == "inversiones" && (
                    <ClientInvestments />
                )}
            </div>
        </Layout>
    )
}

export default Client