import { getInstrument, marketData, MarketDataSearch, MarketDataCurrent, MarketDataintraday, balancesAndPositions } from '@/connections/markets'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '@/context/ContextProvider';
import Layout from '@/layout';
import Loader from '@/components/Loader';
import ClientInvestments from '@/components/ClientsManagement/ClientInvestments';
import ModalInfo from '@/components/ModalInfo';
import Modal from '@/components/Modal';
import { getAccounts } from '@/connections/accounts';

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loader, setLoader] = useState(false)
  const [dataInvestments, setDataInvestments] = useState([])
  const [modalInfo, setModalInfo] = useState({
    type: 0,
    message: "",
    active: false
  })
  const context = useContext(Context)
  if (!context) console.log("Error de contexto")
  const { user } = context
  const name = "BONOS"
  const ticker = "AE38"
  const type = "CEDEARS"

  const getDataInvestments = async () => {
    setLoader(true)
    try {
      const data = await getAccounts(user._id)
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


  const getData = async () => {
    try {
      const result = await getInstrument(name)
      setData(result)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getMarketDataSearch = async () => {
    try {
      const result = await MarketDataSearch(ticker, type)
      setData(result)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getMarketData = async () => {
    try {
      const result = await marketData()
      setData(result)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getMarketDataCurrent = async () => {
    try {
      const result = await MarketDataCurrent()
      setData(result)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getIntradayMarket = async () => {
    try {
      const result = await MarketDataintraday()
      setData(result.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getBalances = async () => {
    try {
      const result = await balancesAndPositions()
      console.log("result", result);
    } catch (error) {
      console.log("error al obtener balances y posiciones", error);
    }
  }

  // const minPrice = Math.min(...data?.map((d) => d.price));
  // const maxPrice = Math.max(...data?.map((d) => d.price));

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
      {user.role == "CLIENTE" && (
        <div className='w-full flex flex-col justify-center items-center gap-4'>
          <>
            <ClientInvestments
              data={dataInvestments} />
          </>
        </div>
      )}
    </Layout>
  )
}

export default Dashboard