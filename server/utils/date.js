
const getDate = (date) => {
    return new Promise((resolve, reject) => {
        try {
            const month = new Date(date).getMonth()+1
            const day = new Date(date).getDate()
            const year = new Date(date).getFullYear()
            resolve(`${month}/${day}/${year}`)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getDate: getDate,
}