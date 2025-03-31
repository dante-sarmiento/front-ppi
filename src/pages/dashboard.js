import { getInstrument, marketData, MarketDataSearch, MarketDataCurrent, MarketDataintraday, balancesAndPositions } from '@/connections/markets'
import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import Layout from '@/layout';

const Dashboard = () => {
  const [data, setData] = useState(null)
  const name = "BONOS"
  const ticker = "AE38"
  const type = "CEDEARS"

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
      <div className='w-full grid grid-cols-3 gap-4'>
        <button onClick={getMarketData}>
          Obtener datos del mercado
        </button>
        <button onClick={getMarketDataCurrent}>
          Obtener datos ACTUALES del mercado
        </button>
        <button onClick={getData}>
          obtener instrumentos especificos
        </button>
        <button onClick={getMarketDataSearch}>
          obtener HISTORICO
        </button>
        <button onClick={getIntradayMarket}>
          Obtener intradiarios
        </button>
         <button onClick={getBalances}>
          Obtener balances
        </button>

      </div>
      {/* <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" tickFormatter={(value) => value.slice(11, 16)} />
        <YAxis domain={[minPrice * 0.98, maxPrice * 1.02]} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer> */}
    </Layout>
  )
}

export default Dashboard