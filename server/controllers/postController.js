import "./databaseController.js"

export const rootPath = (req, res) => {
    res.status(200).json({message: 'Got Post Req'})
}
