export const getTokenUser = () => {
    let tokenUser = "";
    if (typeof window !== "undefined") tokenUser = localStorage.getItem("accessToken")
    return tokenUser;
};