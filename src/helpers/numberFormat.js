const formatNumber = (number) => {
    if (!number) return "-"
    const _number = parseFloat(number);
    return new Intl.NumberFormat("es", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(_number);
}

export default formatNumber