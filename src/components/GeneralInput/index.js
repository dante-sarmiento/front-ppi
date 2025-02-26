import React from 'react'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'black' },
        '&:hover fieldset': { borderColor: 'black' },
        '&.Mui-focused fieldset': { borderColor: 'blue' },
    },
    '& .MuiInputLabel-root': { color: 'black' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'blue' },
    '& .MuiOutlinedInput-input': { color: 'black' },
});

const GeneralInput = ({label = "", onChange, value}) => {
    return (
        <CustomTextField
            label={label}
            fullWidth
            autoComplete="off"
            onChange={onChange}
            value={value} />
    )
}

export default GeneralInput