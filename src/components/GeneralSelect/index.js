import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const GeneralSelect = ({ data, label, instrumentSelected, setInstrumentSelected }) => {
    return (
        <Autocomplete
            disablePortal
            options={data}
            fullWidth
            getOptionLabel={(option) => option?.ticker || option} // Para mostrar el label en el input
            value={instrumentSelected} // Guardamos el objeto completo
            onChange={(_, newValue) => setInstrumentSelected(newValue?.ticker || newValue)} // Guardamos el objeto completo
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'black' },
                            '&:hover fieldset': { borderColor: 'black' },
                            '&.Mui-focused fieldset': { borderColor: 'blue' },
                        },
                        '& .MuiInputLabel-root': { color: 'black' },
                        '& .MuiInputLabel-root.Mui-focused': { color: 'blue' },
                        '& .MuiOutlinedInput-input': { color: 'black' },
                    }}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} className="bg-white hover:bg-gray-200 cursor-pointer">
                    <div className="flex items-center justify-start p-2">
                        <p className="text-black text-[16px]">{option.ticker}</p>
                    </div>
                </li>
            )}
        />
    );
};

export default GeneralSelect;
