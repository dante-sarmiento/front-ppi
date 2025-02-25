
import { getInstrument, marketData, MarketDataSearch, MarketDataCurrent, MarketDataintraday } from '@/connections/markets'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
const Header = () => {
    const [data, setData] = useState(null)
    const name = "BONOS"
    const ticker = "AL30"
    const type = "CEDEARS"
    const router = useRouter()
    const section = router.pathname

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

    const closeSession = () => {
        localStorage.removeItem("tokenSession")
        localStorage.removeItem("accessToken")
        router.push("/login")
    }

    return (
        <div className="bg-gray-200 p-4 flex justify-between items-center">
            <p className='text-base font-bold text-black'>
                {section?.slice(1).toLocaleUpperCase()}
            </p>
            <button onClick={closeSession}>
                Cerrar sesión
            </button>

        </div>
    )
}

export default Header