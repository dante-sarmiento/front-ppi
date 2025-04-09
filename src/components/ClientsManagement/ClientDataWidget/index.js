import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { formatTimestamp } from '@/helpers/formatDate';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ClientDataWidget = ({ userData = {}, newDataUser, setNewDataUser, handleUpdateUser, isAdmin }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isUpdatePass, setIsUpdPass] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [equalPasswords, setEqualPassword] = useState(false)

    const passwordCompare = (pass = "") => {
        setEqualPassword(false)
        setIsEdit(false)
        if (pass != newDataUser?.password && newDataUser?.password) {
            setEqualPassword(false)
        } else {
            setEqualPassword(true)
            setIsEdit(true)
        }
    }

    useEffect(() => {
      if(newDataUser?.password && userData) {
        passwordCompare("")
      } else if(newDataUser && (!newDataUser.password || newDataUser.password == "")) {
        setEqualPassword(false)
        setIsEdit(false)
      }
    }, [newDataUser])
    
console.log("user", userData);
    return (
        <div className='w-full flex flex-col gap-4 rounded-md h-auto p-6 bg-gray-200'>
            <div className='w-full flex justify-between items-center'>
                <p className='text-2xl font-semibold'>
                    Información del cliente
                </p>
            </div>
            <div className='w-full flex flex-col justify-between items-start gap-4'>
                <div className='w-full flex justify-start items-start gap-4'>
                    <div className='w-full flex flex-col justify-start items-start border-b border-gray-900'>
                        <p className='text-sm text-black'>
                            Nombre de cliente
                        </p>
                        <p className='text-2xl text-black fotn-semibold'>
                            {userData?.firstName} {userData?.lastName}
                        </p>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start border-b border-gray-900'>
                        <p className='text-sm text-black'>
                            Email
                        </p>
                        <p className='text-2xl text-black fotn-semibold'>
                            {userData?.email}
                        </p>
                    </div>
                </div>
                <div className='w-full flex justify-start items-start gap-4'>
                    <div className='w-full flex flex-col justify-start items-start border-b border-gray-900'>
                        <p className='text-sm text-black'>
                            Fecha de creación
                        </p>
                        <p className='text-2xl text-black fotn-semibold'>
                            {formatTimestamp(userData?.createdAt)}
                        </p>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start border-b border-gray-900'>
                        <p className='text-sm text-black'>
                            ref
                        </p>
                        <p className='text-2xl text-black fotn-semibold'>
                            {userData?._id.slice(-5)}
                        </p>
                    </div>
                </div>
                {!isAdmin && (
                    <>
                        <button onClick={() => setIsUpdPass(true)}>
                            Cambiar contraseña
                        </button>
                        {isUpdatePass && (
                            <>
                                <div className='w-full flex justify-start items-start gap-4'>
                                    <TextField
                                        id='outlined-password-input'
                                        label='Contraseña nueva'
                                        type={showPassword ? "text" : "password"}
                                        // disabled={!newUserData?.password}
                                        // autoComplete="current-password"
                                        required
                                        fullWidth
                                        onChange={(e) => setNewDataUser({ ...newDataUser, password: e.target.value })}
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
                                    <TextField
                                        id='outlined-password-input-1'
                                        label='Confirmar contraseña'
                                        type={showPassword ? "text" : "password"}
                                        // disabled={!newUserData?.password}
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
                                <div className='w-full flex justify-center items-center h-[50px]'>
                                    <button className={`${isEdit ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-200"} px-4 py-2 rounded-md `} disabled={!isEdit} onClick={handleUpdateUser}>
                                        Guardar cambios
                                    </button>
                                </div>
                            </>

                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default ClientDataWidget