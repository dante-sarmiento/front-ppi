import { useState, useEffect } from "react";
import axios from "axios";

export default function useQuotes() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Asegurar que la variable de entorno se carga correctamente
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/searchInstrument?Name="BONOS"`);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
    // const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

    // return () => clearInterval(interval);
  }, []);

  return { data, error };
}
