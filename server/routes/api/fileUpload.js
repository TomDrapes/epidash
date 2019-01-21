const User = require('../../models/User')

module.exports = (app) => {

    app.post('/api/account/images/upload/:id', (req, res, next) => {
        console.log("Request ---", req.body)
        console.log("Request file ---", req.files)
        let uploadFile = req.files.file
        const fileName = req.files.file.name        
       
        User.findOneAndUpdate({_id: req.body.userId}, {
            $push: {
                uploadedImages: {
                    name: fileName,
                    file: uploadFile,
                }
            }
        })
        .then(model => res.json(model))
        .catch(err => res.send(err))
    })

    app.get('/api/account/images/:id', (req, res) => {
        User.findOne({_id: req.params.id})
        .then(user => res.json(user.uploadedImages))
        .catch(err => res.send(err))
    })
}