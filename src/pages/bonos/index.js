import React, { useState } from 'react'
import Layout from '@/layout'
import TableMarket from '@/components/TableMarket'
import { BONDS } from '@/constants/bonds'
import Modal from '@/components/Modal'
import InstrumentDetail from '@/components/InstrumentDetail'
import { MarketDataBondsEstimate, MarketDataCurrent } from '@/connections/markets'
import Loader from '@/components/Loader'
import ButtonGroup from '@/components/ButtonsGroup'
import Returns from '@/components/Returns'

const buttons = [
    { label: "Vista general", value: "general" },
    { label: "Calcular retorno", value: "retorno" }
]

const Bonos = () => {
    const [selectedData, setSelectedData] = useState(null)
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [selectedButton, setSelectedButton] = useState(buttons[0])
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

    const getMarketDataBondsEstimate = async () => {
        try {
            const result = await MarketDataBondsEstimate(selectedData.ticker)
            console.log("result", result);
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <Layout>
            {openModal && (
                <Modal>
                    <InstrumentDetail
                        dataTable={selectedData}
                        data={data}
                        closeModal={handleCloseModal}
                        getMarketDataBondsEstimate={getMarketDataBondsEstimate} />
                </Modal>
            )}
            {loader && (
                <Loader />
            )}
            <div className='w-full h-full flex flex-col justify-start items-start gap-2'>

                <ButtonGroup
                    data={buttons}
                    selectedButton={selectedButton}
                    setSelectedButton={setSelectedButton} />
                {selectedButton.value == "general" &&
                    <TableMarket
                        selectedData={selectedData}
                        handleData={handleData}
                        data={BONDS} />
                }
                {selectedButton.value == "retorno" &&
                    <Returns />
                }
            </div>
        </Layout>
    )
}

export default Bonos