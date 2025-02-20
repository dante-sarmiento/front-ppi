import { getTokenUser } from '@/helpers/getTokenUser';
import _Fetch from '../services/api'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

import axios from "axios";

let _token = ""

if (!_token) {
    _token = getTokenUser()
}

export const marketData = async () => {
    const response = await axios.get(`${baseUrl}/Configuration/Markets`, {
        headers: {
            'Authorization': `Bearer ${_token}`,
            'Content-Type': 'application/json',
        },
    });
    return response
}

export const getInstrument = async (
    name = "",
    ticker = ""
) => {
    let query = []
    if (name) query.push(`Name=${name}`)
    if (ticker) query.push(`Ticker=${ticker}`)
    if (query.length) {
        query = `?${query.join("&")}`
    } else {
        query = ""
    }
    const response = await axios.get(`${baseUrl}/searchInstrument${query}`, {
        headers: {
            'Authorization': `Bearer ${_token}`,
            'Content-Type': 'application/json',
        },
    });
    return response
}

export const MarketDataSearch = async (
    ticker = "",
    type = "",
    DateFrom = "2025-02-19T20:30:21.885681Z",
    DateTo = "2025-02-20T20:30:21.885611Z",
    Settlement= "INMEDIATA",
) => {
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
        headers: {
            'Authorization': `Bearer ${_token}`,
            'Content-Type': 'application/json',
        },
    });
    return response
}
