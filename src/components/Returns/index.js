import React, { useState } from "react";
// Components
import GeneralInput from "../GeneralInput";
import GeneralSelect from "../GeneralSelect";
import { BONDS } from '@/constants/bonds'
import Form from '@/components/Returns/Form'
import { MarketDataBondsEstimate } from "@/connections/markets";

const quantityTypes = [
    {ticker: "DINERO"},
    {ticker: "PAPELES"},
    {ticker: "CANTIDAD-TOTAL"}
]

const Returns = () => {
    const [formData, setFormData] = useState({
        ticker: null,
        date: null,
        quantityType: null,
        quantity: null,
        amountOfMoney: null,
        price: null,
        exchangeRate: null,
        equityRate: null,
        exchangeRateAmortization: null,
        rateAdjustmentAmortization: null
    });

    console.log("formData", formData);

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const getMarketDataBondsEstimate = async () => {
        try {
            const result = await MarketDataBondsEstimate(selectedData.ticker)
            console.log("result", result);
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className="w-full h-[400px]  bg-gray-200 rounded-lg p-6 gap-3 flex flex-col justify-start items-start">
            <Form
                formData={formData} 
                handleChange={handleChange} 
                bonds={BONDS}
                quantityTypes={quantityTypes}
            />
            <div className="w-full flex justify-center items-center">
                <button className="w-[250px] py-2 bg-blue-500 rounded-lg text-white font-semibold">
                    Calcular retorno
                </button>
            </div>

        </div>
    );
};

export default Returns;
