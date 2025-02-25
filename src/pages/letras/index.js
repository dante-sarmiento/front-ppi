import React, { useState } from 'react'
import Layout from '@/layout'
import TableMarket from '@/components/TableMarket'
import { LETRAS } from '@/constants/letras'
import Modal from '@/components/Modal'
import InstrumentDetail from '@/components/InstrumentDetail'
import { MarketDataBondsEstimate, MarketDataCurrent } from '@/connections/markets'
import Loader from '@/components/Loader'

const headerTable = [
    "Nombre",
    "Moneda",
    "Tipo",
    "Mercado"
]

const Letras = () => {
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

    // const getMarketDataLetrasEstimate = async () => {
    //     try {
    //         const result = await MarketDataBondsEstimate(selectedData.ticker)
    //         console.log("result", result);
    //     } catch (error) {
    //         console.log("error", error)
    //     }
    // }

    return (
        <Layout>
            {openModal && (
                <Modal>
                    <InstrumentDetail 
                    dataTable={selectedData}
                    data={data}
                    closeModal={handleCloseModal}
                    // getMarketDataLetrasEstimate={getMarketDataLetrasEstimate}
                    />
                </Modal>
            )}
            {loader && (
                <Loader />
            )}
            <div className='w-full h-full flex flex-col justify-start items-start gap-2'>
                <p className='text-3xl font-bold'>
                    Letras
                </p>
                <TableMarket
                    selectedData={selectedData}
                    handleData={handleData}
                    data={LETRAS} />
            </div>
        </Layout>
    )
}

export default Letras