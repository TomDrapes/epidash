const User = require('../../models/User')

module.exports = (app) => {

    app.put('/api/account/shortlist/:id', (req, res) => {
        User.findByIdAndUpdate({_id: req.params.id}, {
            $push: {
                shortList: {
                    id: req.body.id,
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

    app.put('/api/account/shortlist/remove-item/:id', (req, res) => {
      console.log(req.body.id)
      User.findOneAndUpdate({_id: req.params.id}, {
        $pull: {
          shortList: {
            id: req.body.id
          }
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    })

    app.get('/api/account/shortlist/:id', (req, res) => {
        User.findById(req.params.id)
            .then(user => res.json(user.shortList))
            .catch(err => console.log(err))
    })
}
