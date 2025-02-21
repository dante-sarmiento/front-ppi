import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "@/context/ContextProvider";
import { getTokenUser } from "@/helpers/getTokenUser";
import { ERRORS } from "@/constants/errors";

export default function useSession() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const context = useContext(Context)
  const { setTokenSession } = context
  const [tokenInit, setTokenInit] = useState("")
  const tokenStorage = getTokenUser()

  useEffect(() => {
    if (!tokenStorage) {
      fetchData()
    }
  }, [tokenStorage])


  // Asegurar que la variable de entorno se carga correctamente
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  const fetchData = async () => {
    try {
      console.log("Fetching data from:", `${baseUrl}/login`);
      const response = await axios.post(`${baseUrl}/login`);
      setData(response.data);
      localStorage.setItem('accessToken', response.data.accessToken);
      setTokenSession(response.data.accessToken)
      console.log("response", response)
    } catch (err) {
      setError(err);
      console.log("error al obtener token de acceso", err.response.data)
      if( err && err?.response?.data?.error == ERRORS.ERROR_01) {
        console.log(" acceso denegado")
        localStorage.removeItem('accessToken')
      }
    }
  };

  return { data, error };
}
