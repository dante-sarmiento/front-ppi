import { TextField } from '@mui/material'
import React from 'react'

const Step1 = ({ missingField, newDataUser, setNewUserData }) => {

    const handleDataUser = (nameField, value) => {
        setNewUserData((prevUserData) => ({
            ...prevUserData,
            [nameField]: value,
        }));
    };

    return (
        <div className='w-full  max-h-[600px] bg-gray-200 rounded-lg flex flex-col justify-center items-center p-8 gap-4'>
            <p className='text-xl font-semibold text-black text-center'>
                Paso 1: Información del usuario.
            </p>
            <div className='w-full grid grid-cols-3 gap-4'>
                <TextField
                    required
                    id="outlined-required-01"
                    label="Nombre"
                    fullWidth
                    onChange={(e) => handleDataUser("firstName", e.target.value)}
                    helperText={missingField == "firstName" && "Campo requerido."}
                />
                <TextField
                    required
                    id="outlined-required-02"
                    label="Apellido"
                    fullWidth
                    onChange={(e) => handleDataUser("lastName", e.target.value)}
                    helperText={missingField == "lastName" && "Campo requerido."}
                />
                <TextField
                    required
                    id="outlined-required-03"
                    label="Email"
                    fullWidth
                    onChange={(e) => handleDataUser("email", e.target.value)}
                    helperText={missingField == "email" && "Campo requerido."}
                />
                {/* <TextField
                    id="outlined-password-input"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    required
                    fullWidth
                    onChange={(e) => handleDataUser("password", e.target.value)}
                    helperText={missingField == "password" && "Campo requerido."}
                /> */}
                <TextField
                    id="outlined-password-input"
                    label="Broker"
                    fullWidth
                    onChange={(e) => handleDataUser("broker", e.target.value)}
                    helperText={missingField == "broker" && "Campo requerido."}
                />
                <TextField
                    id="outlined-password-input"
                    label="Número de cuenta"
                    type="accountNumber"
                    fullWidth
                    onChange={(e) => handleDataUser("accountNumber", e.target.value)}
                    helperText={missingField == "accountNumber" && "Campo requerido."}
                />
            </div>

            {/* <button className='text-xl w-[250px] py-2 bg-green-500 rounded-lg text-white' onClick={handleRegister}>
              Registrar cliente
            </button> */}
        </div>
    )
}

export default Step1