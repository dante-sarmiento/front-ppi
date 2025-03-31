import React from 'react'
import TextField from '@mui/material/TextField';

const NewClientForm = ({
    setEmail,
    setPassword,
    setAccountNumber,
    missingField,
    handleRegister
}) => {
  return (
    <div className='w-[50%]  h-[450px] bg-gray-200 rounded-lg flex flex-col justify-center items-center p-8 gap-4'>
            <p className='text-xl font-normal text-black text-center'>
              Ingresá el email, contraseña y número de cuenta para registrar un nuevo cliente.
            </p>
            <div className='w-full flex flex-col justify-center items-center gap-4'>
              <TextField
                required
                id="outlined-required"
                label="Email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                helperText={missingField == "email" && "Campo requerido."}
              />
              <TextField
                id="outlined-password-input"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                helperText={missingField == "password" && "Campo requerido."}
              />
              <TextField
                id="outlined-password-input"
                label="Número de cuenta"
                type="accountNumber"
                fullWidth
                onChange={(e) => setAccountNumber(e.target.value)}
                helperText={missingField == "accountNumber" && "Campo requerido."}
              />
            </div>

            <button className='text-xl w-[250px] py-2 bg-green-500 rounded-lg text-white' onClick={handleRegister}>
              Registrar cliente
            </button>
          </div>
  )
}

export default NewClientForm