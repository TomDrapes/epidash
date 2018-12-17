const User = require('../../models/User')

module.exports = (app) => {

    app.put('/api/account/shortlist/:id', (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, {
            $push: {
                shortList: {
                    id: req.body.id,
                    source: req.body.source,
                    competition: req.body.competition
                }
            }
        })
        .then(model => res.json(model))
        .catch(err => res.send(err))
    })

    app.put('/api/account/shortlist/remove-item/:id', (req, res) => {
      User.findOneAndUpdate({_id: req.params.id}, {
        $pull: {
          shortList: {
            id: req.body.id
          }
        }
      })
      .then(model => res.json(model))
      .catch(err => res.send(err))
    })

    app.get('/api/account/shortlist/:id', (req, res) => {
        User.findOne({_id: req.params.id})
            .then(user => res.json(user.shortList))
            .catch(err => res.send(err))
    })
}
