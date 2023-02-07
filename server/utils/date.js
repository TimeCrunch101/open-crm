
const getDate = (date) => {
    return new Promise((resolve, reject) => {
        try {
            const month = new Date(date).getUTCMonth()+1
            const day = new Date(date).getUTCDate()
            const year = new Date(date).getUTCFullYear()
            resolve(`${month}/${day}/${year}`)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getDate: getDate,
}