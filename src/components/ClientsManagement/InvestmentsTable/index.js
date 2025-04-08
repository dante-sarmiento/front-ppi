import PaginatorTables from '@/components/Tables/PaginatorTables'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Context } from '@/context/ContextProvider';

const InvestmentsTable = ({ data, setEditingAccount, editingAccount, setAccountIdDelete }) => {
    const context = useContext(Context)
    if (!context) console.log("Error de contexto")
    const { user } = context

    console.log("data", data);
    console.log("editing", editingAccount);
    return (
        <div className='w-full flex flex-col justify-start items-center rounded-md overflow-hidden'>
            <div className='w-full flex jutstify-start items-center bg-[#692D4F] h-[60px] px-2'>
                <p className='w-[6%] styleseHaderInv'>
                    Ticker
                </p>
                <p className='w-[10%] styleseHaderInv'>
                    Descripción
                </p>
                <p className='w-[7%] styleseHaderInv text-center'>
                    Nominales
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Precio
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Variación (%)
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Rendimiento
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Valor actual
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Valor inicial
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    Precio pormedio de compra
                </p>
                <p className='w-[9%] styleseHaderInv text-center'>
                    %
                </p>
                <p className='w-[8%] styleseHaderInv text-center'>
                    Días promedio de tenecia
                </p>
                {user?.role == "ADMINISTRADOR" && (
                    <p className='w-[6%] styleseHaderInv text-center'>
                        Acciones
                    </p>
                )}
            </div>
            {data && data.length > 0 ?
                <div className='w-full flex flex-col jutstify-start items-center'>
                    {data.map((d, index) => {
                        return (
                            <div key={index} className={`${editingAccount?._id == d._id && "bg-gray-400"} px-2 w-full flex jutstify-start items-center h-[50px] overflow-hidden`}>
                                <p className='w-[6%] styleseData'>
                                    {d.ticker}
                                </p>
                                <p className='w-[10%] styleseData truncate'>
                                    {d.description}
                                </p>
                                <input
                                    type='text'
                                    className='bg-transparent w-[7%] text-center stylesData outline-none'
                                    value={d.nominals}
                                    disabled={editingAccount?._id != d._id}
                                />
                                <input
                                    type='text'
                                    className='bg-transparent w-[9%] text-center stylesData outline-none'
                                    value={d.price}
                                    disabled={editingAccount?._id != d._id}
                                />
                                <input
                                    type='text'
                                    className='bg-transparent w-[9%] text-center stylesData outline-none'
                                    value={d.variation}
                                    disabled={editingAccount?._id != d._id}
                                />
                                <input
                                    type='text'
                                    className='bg-transparent w-[9%] text-center stylesData outline-none'
                                    value={d.performance}
                                    disabled={editingAccount?._id != d._id}
                                />
                                <input
                                    type='text'
                                    className='bg-transparent w-[9%] text-center stylesData outline-none'
                                    value={d.currentValue}
                                    disabled={editingAccount?._id != d._id}
                                />
                                <input
                                    type='text'
                                    className='bg-transparent w-[9%] text-center stylesData outline-none'
                                    value={d.initialValue}
                                    disabled={editingAccount?._id != d._id}
                                />
                                <input
                                    type='text'
                                    className='bg-transparent w-[9%] text-center stylesData outline-none'
                                    value={d.averagePurchasePrice}
                                    disabled={editingAccount?._id != d._id}
                                />
                                <input
                                    type='text'
                                    className='bg-transparent w-[9%] text-center stylesData outline-none'
                                    value={d.percentage}
                                    disabled={editingAccount?._id != d._id}
                                />
                                <input
                                    type='text'
                                    className='bg-transparent w-[9%] text-center stylesData outline-none'
                                    value={d.holdingPercentageDays}
                                    disabled={editingAccount?._id != d._id}
                                />
                                {user?.role == "ADMINISTRADOR" && (
                                    <div className='w-[6%] flex justify-center items-center gap-3'>
                                        <button className='p-1 rounded-md bg-red-500' onClick={() => setAccountIdDelete(d)}>

                                            < Image
                                                src='/img/deleteIcon.svg'
                                                width={10}
                                                height={10}
                                                alt='borrar'
                                                className="w-[20px] h-[20px]"
                                            />
                                        </button>
                                        <button className='p-1 rounded-md bg-blue-500' onClick={() => setEditingAccount(d)}>
                                            < Image
                                                src='/img/editIcon.svg'
                                                width={10}
                                                height={10}
                                                alt='editar'
                                                className="w-[20px] h-[20px]"
                                            />
                                        </button>
                                    </div>

                                )}
                            </div>
                        )
                    })}
                </div> :
                <div className='w-full flex justify-center items-center min-h-[220px]'>
                    Noy hay datos para mostrar.
                </div>
            }
            <PaginatorTables
                data={data}
            />
        </div>
    )
}

export default InvestmentsTable