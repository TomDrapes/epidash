let axios = require('axios')

module.exports = (app) => {

    app.post('/api/account/aliexpress/item-details', (req, res) => {
        axios({
            method: 'post',
            url: 'https://api.aliseeks.com/v1/products/details',
            data: {
                productId: req.body.productId,
                currency: 'AUD',
                locale: 'en_US'
            },
            headers: {
                'X-Api-Client-Id': 'FPVNMCTQKJOSZPCL'
            }
          })
          .then(data => {
              res.json(data.data)
          })
          .catch(err => res.send(err))
    })
}