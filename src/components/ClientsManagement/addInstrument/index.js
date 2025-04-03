import React from 'react'
import InvestmentsTable from '../InvestmentsTable';
import { TextField } from '@mui/material'


const AddInstrument = ({ missingField = "", setAccountNewUser, accountNewUser, handleInstrument, newUserData }) => {


    return (
        <div className='w-full  min-h-[300px] bg-gray-200 rounded-lg flex flex-col justify-start items-start p-8 gap-4'>
            <p className='text-xl font-semibold text-black text-center'>
                Agregar instrumentos
            </p>
            <div className='w-full grid grid-cols-5 gap-4'>
                <TextField
                    required
                    id="outlined-required-1"
                    label="Ticker"
                    fullWidth
                    value={accountNewUser.ticker} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, ticker: e.target.value })}
                    helperText={missingField == "ticker" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required-2"
                    label="Description"
                    fullWidth
                    value={accountNewUser.description} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, description: e.target.value })}
                />
                <TextField
                    id="outlined-required-2"
                    label="Type"
                    fullWidth
                    value={accountNewUser.type} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, type: e.target.value })}
                />
                <TextField
                    required
                    id="outlined-required-3"
                    label="Nominales"
                    fullWidth
                    value={accountNewUser.nominals} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, nominals: e.target.value })}
                    helperText={missingField == "nominals" && "Campo requerido."}
                />
                <TextField
                    required
                    id="outlined-required-4"
                    label="Precio"
                    fullWidth
                    value={accountNewUser.price} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, price: e.target.value })}
                    helperText={missingField == "price" && "Campo requerido."}
                />
                {/* <TextField
                    id="outlined-required-6"
                    label="% de tenencia"
                    fullWidth
                    value={accountNewUser.holdingPercentage} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, holdingPercentage: e.target.value })}
                    helperText={missingField == "holdingPercentage" && "Campo requerido."}
                /> */}
                <TextField
                    id="outlined-required-7"
                    label="Rendimiento"
                    fullWidth
                    value={accountNewUser.performance} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, performance: e.target.value })}
                    helperText={missingField == "performance" && "Campo requerido."}
                />
                 <TextField
                    id="outlined-required-7"
                    label="Variación"
                    fullWidth
                    value={accountNewUser.variation} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, variation: e.target.value })}
                    helperText={missingField == "variation" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required-8"
                    label="Valor actual"
                    fullWidth
                    value={accountNewUser.currentValue} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, currentValue: e.target.value })}
                    helperText={missingField == "currentValue" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required-9"
                    label="Valor inicial"
                    fullWidth
                    value={accountNewUser.initialValue} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, initialValue: e.target.value })}
                    helperText={missingField == "initialValue" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required-10"
                    label="Precio promedio de compra"
                    fullWidth
                    value={accountNewUser.averagePurchasePrice} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, averagePurchasePrice: e.target.value })}
                    helperText={missingField == "averagePurchasePrice" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required-11"
                    label="%"
                    fullWidth
                    value={accountNewUser.percentage} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, percentage: e.target.value })}
                    helperText={missingField == "percentage" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required-12"
                    label="Días promedio de tenencia"
                    fullWidth
                    value={accountNewUser.holdingPercentageDays} // ✅ Vinculación del input al estado
                    onChange={(e) => setAccountNewUser({ ...accountNewUser, holdingPercentageDays: e.target.value })}
                    helperText={missingField == "holdingPercentageDays" && "Campo requerido."}
                />
            <button className='text-xl w-[50px] h-[50px] bg-green-500 rounded-lg text-white' onClick={handleInstrument}>
                +
            </button>
            </div>


        </div>
    )
}

export default AddInstrument