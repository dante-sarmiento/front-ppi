import React, { useState } from 'react'
import GeneralSelect from '@/components/GeneralSelect'
import { INSTRUMENTS } from '@/constants/instruments'
import InvestmentsTable from '../InvestmentsTable'

const ClientInvestments = ({ data, setEditingAccount, editingAccount, setAccountIdDelete}) => {
    const [instrumentSelected, setInstrumentselected] = useState(INSTRUMENTS[0])

    return (
        <div className='w-full flex flex-col gap-4 rounded-md h-auto p-6 bg-gray-200'>
            <div className='w-full flex justify-between items-center'>
                <p className='text-2xl font-semibold'>
                    Instrumentos cotizados en DOLARES
                </p>
                <div className='flex gap-2 items-center justify-end w-[260px]'>
                    <p className='text-xl font-semibold'>
                        Tipo:
                    </p>
                    <GeneralSelect
                        data={INSTRUMENTS}
                        instrumentSelected={instrumentSelected}
                        setInstrumentSelected={(value) => setInstrumentselected(value)} />
                </div>
            </div>
            <InvestmentsTable
                data={data}
                setEditingAccount={setEditingAccount}
                editingAccount={editingAccount}
                setAccountIdDelete={setAccountIdDelete} />
        </div>
    )
}

export default ClientInvestments