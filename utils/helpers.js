const checkNumericValue = (value, message = null) => {
    if(isNaN(value)) {
        return {
            success: 0, 
            message: message,
            data: null
        }
    }
}

module.exports = {
    checkNumericValue
}