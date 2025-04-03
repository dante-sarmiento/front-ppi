import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

const Step1 = ({ missingField, newUserData, setNewUserData, createRdmPass, equalPasswords, setEqualPassword }) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const handleDataUser = (nameField, value) => {
        setNewUserData((prevUserData) => ({
            ...prevUserData,
            [nameField]: value,
        }));
    };

    const passwordCompare = (pass) => {
        if(pass) {
            setEqualPassword(pass == newUserData.password)
        }
    }

    return (
        <div className='w-full  max-h-[600px] bg-gray-200 rounded-lg flex flex-col justify-center items-center p-8 gap-4'>
            <p className='text-xl font-semibold text-black text-center'>
                Paso 1: Información del usuario.
            </p>
            <div className='w-full grid grid-cols-2 gap-4'>
                <TextField
                    required
                    id='outlined-required-01'
                    label='Nombre'
                    value={newUserData?.firstName}
                    fullWidth
                    onChange={(e) => handleDataUser('firstName', e.target.value)}
                    helperText={missingField == 'firstName' && 'Campo requerido.'}
                />
                <TextField
                    required
                    id='outlined-required-02'
                    label='Apellido'
                    value={newUserData?.lastName}
                    fullWidth
                    onChange={(e) => handleDataUser('lastName', e.target.value)}
                    helperText={missingField == 'lastName' && 'Campo requerido.'}
                />
                <TextField
                    required
                    id='outlined-required-03'
                    label='Email'
                    value={newUserData?.email}
                    fullWidth
                    onChange={(e) => handleDataUser('email', e.target.value)}
                    helperText={missingField == 'email' && 'Campo requerido.'}
                />
                <TextField
                    id='outlined-required'
                    label='Broker'
                    value={newUserData?.broker}
                    fullWidth
                    onChange={(e) => handleDataUser('broker', e.target.value)}
                    helperText={missingField == 'broker' && 'Campo requerido.'}
                />
                <div className='w-full h-hull flex flex-col justify-start items-start gap-3'>
                    <TextField
                        id='outlined-password-input'
                        label='Contraseña'
                        type={showPassword ? "text" : "password"}
                        // autoComplete="current-password"
                        required
                        value={newUserData?.password}
                        fullWidth
                        onChange={(e) => handleDataUser('password', e.target.value)}
                        helperText={missingField == 'password' && 'Campo requerido.'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <button className='text-sm text-green-500' onClick={createRdmPass}>
                        Generar contraseña segura
                    </button>
                </div>
                <TextField
                    id='outlined-password-input'
                    label='Confirmar contraseña'
                    type={showPassword ? "text" : "password"}
                    disabled={!newUserData?.password}
                    // autoComplete="current-password"
                    required
                    fullWidth
                    onChange={(e) => passwordCompare(e.target.value)}
                    helperText={!equalPasswords && 'Las contraseñas no coinciden.'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default Step1;
