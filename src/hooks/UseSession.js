import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "@/context/ContextProvider";

export default function useSession() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const context = useContext(Context)
  const {setTokenSession} = context
  

  // Asegurar que la variable de entorno se carga correctamente
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  useEffect(() => {
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
      }
    };

    fetchData();
  }, []);

  return { data, error };
}
