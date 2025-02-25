import { getPercenChangeIcon } from '@/helpers/getPercentChangeIcon';
import formatNumber, { NumberFormat } from '@/helpers/numberFormat';
import React from 'react'

const InstrumentDetail = ({ data = {}, closeModal, dataTable = "", getMarketDataBondsEstimate }) => {
    console.log("data", data);
    return (
        <div className='w-[70%] lg:w-[40%] h-auto bg-gray-200 rounded-lg flex flex-col justify-start items-start pb-4'>
            <div className='w-full flex justify-between items-start p-4'>
                <p className='text-4xl font-semibold '>
                    {dataTable?.ticker}
                </p>
                <button className='text-black text-lg' onClick={closeModal}>
                    Cerrar
                </button>
            </div>

            {data && (
                <div className='w-full h-full flex flex-col justify-center items-center gap-2 px-8'>
                    <button onClick={getMarketDataBondsEstimate && getMarketDataBondsEstimate}>
                        Calcular retorno
                    </button>
                    <div className='w-[70%] min-h-[150px] rounded-lg bg-blue-500 flex justify-between items-center'>
                        <div className='flex flex-col justify-center items-center w-1/2 gap-2'>
                            <p className='text-white font-semibold text-5xl'>
                                $ {formatNumber(data?.price)}
                            </p>
                            <p className='text-white text-xl'>
                                Último operado
                            </p>
                        </div>
                        <div className='flex flex-col justify-center items-center w-1/2 gap-2'>
                            <p className='text-white text-2xl font-semibold gap-2 flex'>
                                {data?.marketChangePercent}
                                <span className='text-white text-2xl font-normal'>
                                    ({data?.marketChange})
                                </span>
                            </p>
                            {getPercenChangeIcon(data?.marketChangePercent)}

                        </div>
                    </div>
                    <div className='w-full h-full flex flex-col justify-start items-center'>
                        <div className='w-full flex justify-between items-center py-1 border-b border-gray-400'>
                            <p>
                                Apertura
                            </p>
                            <p>
                                {data.openingPrice}
                            </p>
                        </div>
                        <div className='w-full flex justify-between items-center py-1 border-b border-gray-400'>
                            <p>
                                Cierre anterior
                            </p>
                            <p>
                                {data.previousClose}
                            </p>
                        </div>
                        <div className='w-full flex justify-between items-center py-1 border-b border-gray-400'>
                            <p>
                                Máximo
                            </p>
                            <p>
                                {data.max}
                            </p>
                        </div>
                        <div className='w-full flex justify-between items-center py-1 border-b border-gray-400'>
                            <p>
                                Mínimo
                            </p>
                            <p>
                                {data.min}
                            </p>
                        </div>
                        <div className='w-full flex justify-between items-center py-1 border-b border-gray-400'>
                            <p>
                                Volumen
                            </p>
                            <p>
                                {formatNumber(data?.volume)}
                            </p>
                        </div>
                        <div className='w-full flex justify-between items-center py-1 border-b border-gray-400'>
                            <p>
                                Moneda cotización
                            </p>
                            <p>
                                {dataTable?.currency}
                            </p>
                        </div>
                    </div>
                    <div className='w-full flex justify-start items-start'>
                        <div key={name} className="flex items-center">
                            <input
                                type="checkbox"
                                id={name}
                                value={false}
                                checked={false}
                                // onChange={() => handleCheckboxChange(option.value)}
                                className='w-[20px] h-[20px]'
                            />
                            <label className="ml-2 text-lg text-black">
                                Añadir a cuadro comparativo
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InstrumentDetail