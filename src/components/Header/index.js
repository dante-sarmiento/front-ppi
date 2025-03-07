
import { getInstrument, marketData, MarketDataSearch, MarketDataCurrent, MarketDataintraday } from '@/connections/markets'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '@/context/ContextProvider'
const Header = () => {
    const [data, setData] = useState(null)
    const name = "BONOS"
    const ticker = "AL30"
    const type = "CEDEARS"
    const router = useRouter()
    const section = router.pathname
    const context = useContext(Context)
    if (!context) console.log("Error de contexto")
    const { user } = context
    const [selectedSection, setSelectedSection] = useState("")

    useEffect(() => {
        if (section && section != "accionesUsa" && section != "fciExterior" && section != "/gestionDeClientes") {
            setSelectedSection(section.slice(1))
        } else if (section == "accionesUsa") {
            setSelectedSection("acciones-usa")
        } else if (section == "fciExterior") {
            setSelectedSection("fci-exterior")
        } else if (section == "/gestionDeClientes") {
            setSelectedSection("Gestión de clientes")
        }
    }, [section])

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
        localStorage.removeItem("user")
        router.push("/login")
    }

    return (
        <div className="bg-gray-200 p-4 flex justify-between items-center">

            <p className='text-base font-bold text-black'>
                {selectedSection}
            </p>
            <button onClick={closeSession}>
                Cerrar sesión
            </button>

        </div>
    )
}

export default Header