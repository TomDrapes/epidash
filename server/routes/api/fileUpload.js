let axios = require('axios')

module.exports = (app) => {

    app.post('/upload', (req, res, next) => {
        console.log("Request ---", req.body)
        console.log("Request file ---", req.files)
        let uploadFile = req.files.file
        const fileName = req.files.file.name
        try{
            uploadFile.mv(
                `${__dirname}../../../public/files/${fileName}`,
                function (err) {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err)
                    }
    
                    res.json({
                        file: `public/${req.files.file.name}`,
                    })
                },
            )
        }catch(err){
            console.log(err)
        }
    })
}