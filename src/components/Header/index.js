import { getInstrument, marketData, MarketDataSearch, MarketDataCurrent, MarketDataintraday } from '@/connections/markets'
import React, { useState } from 'react'
const Header = () => {
    const [data, setData] = useState(null)
    const name = "BONOS"
    const ticker = "AL30"
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
            setData(result)
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className="bg-gray-200 p-4 flex justify-end items-center">
            <button onClick={getMarketData}>
                Ver cuadro comparativo
            </button>

        </div>
    )
}

export default Header