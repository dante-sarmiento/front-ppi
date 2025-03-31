import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

const ClientDataWidget = () => {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className='w-full flex flex-col gap-4 rounded-md h-auto p-6 bg-gray-200'>
            <div className='w-full flex justify-between items-center'>
                <p className='text-2xl font-semibold'>
                    Información del cliente
                </p>
                <button className='rounded-md bg-blue-500 text-white px-3 py-1' onClick={() => setIsEdit(!isEdit)}>
                    Editar
                </button>
            </div>
            <div className='flex justify-start items-center gap-4'>
                <TextField
                    id="outlined-required"
                    label="Nombre completo"
                    fullWidth
                    disabled={!isEdit}
                // onChange={(e) => setEmail(e.target.value)}
                // helperText={missingField == "email" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required"
                    label="Email"
                    fullWidth
                    disabled={!isEdit}
                // onChange={(e) => setEmail(e.target.value)}
                // helperText={missingField == "email" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required"
                    label="Número de telefono"
                    fullWidth
                    disabled={!isEdit}
                // onChange={(e) => setEmail(e.target.value)}
                // helperText={missingField == "email" && "Campo requerido."}
                />
            </div>
            <div className='flex justify-start items-center gap-4'>
                <TextField
                    id="outlined-required"
                    label="Número de cuenta"
                    fullWidth
                    disabled={!isEdit}
                // onChange={(e) => setEmail(e.target.value)}
                // helperText={missingField == "email" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required"
                    label="Tipo de cuenta"
                    fullWidth
                    disabled={!isEdit}
                // onChange={(e) => setEmail(e.target.value)}
                // helperText={missingField == "email" && "Campo requerido."}
                />
                <TextField
                    id="outlined-required"
                    label="Fecha de creación"
                    fullWidth
                    disabled={true}
                // onChange={(e) => setEmail(e.target.value)}
                // helperText={missingField == "email" && "Campo requerido."}
                />
            </div>
            <div className='w-full flex justify-center items-center h-[50px]'>
                <button className={`${isEdit ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-200"} px-4 py-2 rounded-md `} disabled={!isEdit}>
                    Guardar cambios
                </button>
            </div>
        </div>
    )
}

export default ClientDataWidget