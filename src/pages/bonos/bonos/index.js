import { getInstrument, marketData, MarketDataSearch, MarketDataCurrent } from '@/connections/markets'
import Layout from '@/layout'
import React, { useState } from 'react'

const Bonos = () => {
  const [data, setData] = useState(null)
  const name = "BONOS"
  const ticker = "AL30"
  const type = "BONOS"

  const getData = async () => {
    try {
      const result = await getInstrument(name, ticker)
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

  return (
    <Layout>
      <div className='w-full flex flex-col justify-start items-start gap-4'>
        <button onClick={getMarketData} className='bg-blue-500'>
          Obtener datos del mercado
        </button>
        <button onClick={getMarketDataCurrent} className='bg-green-500'>
          Obtener datos ACTUALES del mercado
        </button>
        <button onClick={getData} className='bg-yellow-700'>
          obtener bonos
        </button>
        <button onClick={getMarketDataSearch} className='bg-red-700'>
          obtener HISTORICO
        </button>
      </div>
    </Layout>
  )
}

export default Bonos