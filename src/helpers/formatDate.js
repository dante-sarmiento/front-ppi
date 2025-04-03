export const formatTimestamp = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Extraer día, mes y año
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
    const year = date.getFullYear();

    // Extraer horas y minutos
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
};

