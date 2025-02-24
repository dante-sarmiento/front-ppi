import React, { useState } from 'react'
import Layout from '@/layout'
import TableMarket from '@/components/TableMarket'
import { BONDS } from '@/constants/bonds'
import Modal from '@/components/Modal'
import BondDetail from '@/components/BondDetail'
import { MarketDataCurrent } from '@/connections/markets'
import Loader from '@/components/Loader'

const headerTable = [
    "Nombre",
    "Moneda",
    "Tipo",
    "Mercado"
]

const Bonos = () => {
    const [selectedData, setSelectedData] = useState(null)
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const handleData = (data) => {
        setSelectedData(data)
        getMarketDataCurrent(data)
        
    }

    const getMarketDataCurrent = async (data) => {
        setLoader(true)
        try {
            const result = await MarketDataCurrent(data.ticker, data.type)
            setData(result?.data)
            setOpenModal(true)
        } catch (error) {
            console.log("errorr", error)
        }
        setLoader(false)
    }

    const handleCloseModal = () => {
        setSelectedData(null)
        setOpenModal(false)
    }

    return (
        <Layout>
            {openModal && (
                <Modal>
                    <BondDetail 
                    dataTable={selectedData}
                    data={data}
                    closeModal={handleCloseModal}/>
                </Modal>
            )}
            {loader && (
                <Loader />
            )}
            <div className='w-full h-full flex flex-col justify-start items-start gap-2'>
                <p className='text-3xl font-bold'>
                    Bonos
                </p>
                <TableMarket
                    selectedData={selectedData}
                    handleData={handleData}
                    data={BONDS} />
            </div>
        </Layout>
    )
}

export default Bonos