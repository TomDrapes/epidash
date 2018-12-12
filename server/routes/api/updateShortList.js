const ShortList = require('../../models/ShortList')
const User = require('../../models/User')

module.exports = (app) => {

    app.put('/api/account/shortlist/', (req, res) => {
        const newShortList = new ShortList({
            user_id: req.body.user_id,
            items: req.body.items
        })
        res.send('ShortList Created')
        newShortList.save()
    })

    app.put('/api/account/shortlist/:id', (req, res) => {
        User.findByIdAndUpdate({_id: req.params.id}, {
            $push: {
                shortList: {
                    source: req.body.source,
                    competition: req.body.competition
                }
            }
        }, {new: true}, function(err, model) {
            if(err){
                res.send(err)
            } else {
                res.json(model)
            }
        })
    })
}