import { getTokenUser } from '@/helpers/getTokenUser';
import _Fetch from '../services/api'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
import axios from "axios";


const getHeaders = () => {
    const token = getTokenUser(); // Siempre obtiene el token más reciente
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

// Recupera una lista de mercados disponibles.
export const marketData = async () => {
    const headers = getHeaders();
    const response = await axios.get(`${baseUrl}/Configuration/Markets`, {
        headers
    });
    return response
}

// Busque artículos que coincidan con un filtro determinado
export const getInstrument = async (
    name = "",
    ticker = ""
) => {
    const headers = getHeaders();
    let query = []
    if (name) query.push(`Name=${name}`)
    if (ticker) query.push(`Ticker=${ticker}`)
    if (query.length) {
        query = `?${query.join("&")}`
    } else {
        query = ""
    }
    const response = await axios.get(`${baseUrl}/searchInstrument${query}`, {
        headers
    });
    return response
}


// Búsqueda de datos históricos del mercado.
export const MarketDataSearch = async (
    ticker = "",
    type = "",
    DateFrom = "2025-02-19T20:30:21.885681Z",
    DateTo = "2025-02-20T20:30:21.885611Z",
    Settlement = "INMEDIATA",
) => {
    const headers = getHeaders();
    let query = []
    if (ticker) query.push(`Ticker=${ticker}`)
    if (type) query.push(`Type=${type}`)
    if (DateFrom) query.push(`DateFrom=${DateFrom}`)
    if (DateTo) query.push(`DateTo=${DateTo}`)
    if (Settlement) query.push(`Settlement=${Settlement}`)
    if (query.length) {
        query = `?${query.join("&")}`
    } else {
        query = ""
    }
    const response = await axios.get(`${baseUrl}/MarketData/Search${query}`, {
        headers
    });
    return response
}

// Busque datos actuales del mercado.
export const MarketDataCurrent = async (
    ticker = "AL30",
    type = "BONOS",
    Settlement = "INMEDIATA"
) => {
    const headers = getHeaders();
    console.log("headers", headers);
    let query = []
    if (ticker) query.push(`Ticker=${ticker}`)
    if (type) query.push(`Type=${type}`)
    if (Settlement) query.push(`Settlement=${Settlement}`)
    if (query.length) {
        query = `?${query.join("&")}`
    } else {
        query = ""
    }
    const response = await axios.get(`${baseUrl}/MarketData/Current${query}`, {
        headers
    });
    return response
}

// Búsqueda de datos del mercado intradiario.
export const MarketDataintraday = async (
    ticker = "AE38",
    type = "BONOS",
    Settlement = "INMEDIATA"
) => {
    const headers = getHeaders();
    console.log("headers", headers);
    let query = []
    if (ticker) query.push(`Ticker=${ticker}`)
    if (type) query.push(`Type=${type}`)
    if (Settlement) query.push(`Settlement=${Settlement}`)
    if (query.length) {
        query = `?${query.join("&")}`
    } else {
        query = ""
    }
    const response = await axios.get(`${baseUrl}/MarketData/Intraday${query}`, {
        headers
    });
    return response
}

// Calcula el retorno de tus inversiones.
export const MarketDataBondsEstimate = async (
    ticker = "",
    Date = "2025-02-25T00:00:00Z",
    QuantityType = "PAPELES",
    Quantity = 100,
    AmountOfMoney = 65,
    Price = 65,
    ExchangeRate = 2,
    EquityRate = 1,
    ExchangeRateAmortization = 0.05,
    RateAdjustmentAmortization = 0.02
) => {
    const headers = getHeaders();
    let query = []
    if (ticker) query.push(`Ticker=${ticker}`)
    if (Date) query.push(`Date=${Date}`)
    if (QuantityType) query.push(`QuantityType=${QuantityType}`)
    if (Quantity) query.push(`Quantity=${Quantity}`)
    if (AmountOfMoney) query.push(`AmountOfMoney=${AmountOfMoney}`)
    if (Price) query.push(`Price=${Price}`)
    if (ExchangeRate) query.push(`ExchangeRate=${ExchangeRate}`)
    if (EquityRate) query.push(`EquityRate=${EquityRate}`)
    if (ExchangeRateAmortization) query.push(`ExchangeRateAmortization=${ExchangeRateAmortization}`)
    if (RateAdjustmentAmortization) query.push(`RateAdjustmentAmortization=${RateAdjustmentAmortization}`)
    if (query.length) {
        query = `?${query.join("&")}`
    } else {
        query = ""
    }
    const response = await axios.get(`${baseUrl}/MarketData/Bonds/Estimate${query}`, {
        headers
    });
    return response
}
