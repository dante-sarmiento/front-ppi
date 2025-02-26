import GeneralInput from '@/components/GeneralInput'
import GeneralSelect from '@/components/GeneralSelect'
import React from 'react'

const From = ({
    bonds = [],
    formData,
    handleChange,
    quantityTypes = []
}) => {
    return (
        <div className="w-full grid grid-cols-5 gap-3">
            <GeneralSelect
                label="Instrumento"
                data={bonds}
                instrumentSelected={formData.ticker}
                setInstrumentSelected={(value) => handleChange("ticker", value)} />
            <input
                className="h-[56px] w-full bg-gray-200 border-[1px] border-black rounded-md p-2"
                type="date"
                id="start"
                name="trip-start"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                min={new Date().setFullYear(
                    new Date().getFullYear(),
                )}
                max="2040-12-31" />
            <GeneralSelect
                label="Tipo de cantidad"
                data={quantityTypes}
                instrumentSelected={formData.quantityType}
                setInstrumentSelected={(value) => handleChange("quantityType", value)} />
            <GeneralInput
                label="Cantidad"
                onChange={(e) => handleChange("quantity", e.target.value)}
                value={formData.quantity}
            />
            <GeneralInput
                label="Cantidad de dinero"
                onChange={(e) => handleChange("amountOfMoney", e.target.value)}
                value={formData.amountOfMoney}
            />
            <GeneralInput
                label="Precio"
                onChange={(e) => handleChange("price", e.target.value)}
                value={formData.price}
            />
            <GeneralInput
                label="Tipo de cambio"
                onChange={(e) => handleChange("exchangeRate", e.target.value)}
                value={formData.exchangeRate}
            />
            <GeneralInput
                label="Tasa de capital"
                onChange={(e) => handleChange("equityRate", e.target.value)}
                value={formData.equityRate}
            />
            <GeneralInput
                label="Amortizacion del tipo de cambio"
                onChange={(e) => handleChange("exchangeRateAmortization", e.target.value)}
                value={formData.exchangeRateAmortization}
            />
            <GeneralInput
                label="Amortización por ajuste de tasa"
                onChange={(e) => handleChange("rateAdjustmentAmortization", e.target.value)}
                value={formData.rateAdjustmentAmortization}
            />
        </div>
    )
}

export default From