import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Returns = ({ data = [] }) => {
    const [instrumentSelected, setInstrumentSelected] = useState(null);

    return (
        <div className="w-full h-[400px]  bg-gray-200 rounded-lg p-6 gap-3 justify-start items-start">
            <div className="w-full grid grid-cols-5 gap-3">
                <Autocomplete
                    disablePortal
                    options={data}
                    fullWidth
                    getOptionLabel={(option) => option.ticker} // Para mostrar el label en el input
                    value={instrumentSelected} // Guardamos el objeto completo
                    onChange={(_, newValue) => setInstrumentSelected(newValue)} // Guardamos el objeto completo
                    renderInput={(params) => <TextField {...params} label="Instrumento" />}
                    renderOption={(props, option) => (
                        <li {...props} className="">
                            <div className="flex items-center justify-start p-2 hover:bg-gray-200 cursor-pointer">
                                <p className="text-black text-[16px]">{option.ticker}</p>
                            </div>
                        </li>
                    )}
                />
                <input
                    className="h-[56px] w-full bg-gray-200 border-[1px] border-gray-400 rounded-md p-2"
                    type="date"
                    id="start"
                    name="trip-start"
                    value=""
                    min={new Date().setFullYear(
                        new Date().getFullYear(),
                    )}
                    max="2040-12-31" />
                <Autocomplete
                    disablePortal
                    options={data}
                    fullWidth
                    getOptionLabel={(option) => option.ticker} // Para mostrar el label en el input
                    value={instrumentSelected} // Guardamos el objeto completo
                    onChange={(_, newValue) => setInstrumentSelected(newValue)} // Guardamos el objeto completo
                    renderInput={(params) => <TextField {...params} label="Tipo de cantidad" />}
                    renderOption={(props, option) => (
                        <li {...props} className="">
                            <div className="flex items-center justify-start p-2 hover:bg-gray-200 cursor-pointer">
                                <p className="text-black text-[16px]">{option.ticker}</p>
                            </div>
                        </li>
                    )}
                />
                <TextField
                    id="outlined-required"
                    label="Cantidad"
                    fullWidth
                // onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-required"
                    label="Cantidad de dinero"
                    fullWidth
                // onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-required"
                    label="Precio"
                    fullWidth
                // onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-required"
                    label="Tipo de cambio"
                    fullWidth
                // onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-required"
                    label="Tasa de capital"
                    fullWidth
                // onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-required"
                    label="Amortizacion del tipo de cambio"
                    fullWidth
                // onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-required"
                    label="Amortización por ajuste de tasa"
                    fullWidth
                    className="text-black"
                // onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Returns;
