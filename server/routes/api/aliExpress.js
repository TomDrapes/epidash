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
          .then(response => {
              res.json(response.data)
          })
          .catch(error => {
              console.log(error)
          })
    })

    app.post('/api/account/aliexpress/image-search', (req, res) => {
        axios({
            method: 'post',
            url: 'https://api.aliseeks.com/v1/search/image/upload',
            data: { url: req.body.image },
            headers: { 'X-Api-Client-Id': 'FPVNMCTQKJOSZPCL' }
        })
        .then(response => {
            axios({
                method: 'post',
                url: 'https://api.aliseeks.com/v1/search/image',
                data: {
                    uploadKey: response.data.uploadKey,
                    currency: 'AUD',
                    category: 22
                },
                headers: {  'X-Api-Client-Id': 'FPVNMCTQKJOSZPCL' }
            })
            .then(response => {
                res.json(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => console.log(error))
    })

    app.post('/api/account/aliexpress/search', (req, res) => {
        
        let searchData = {
            items: [],
            itemsCount: 0,
            aliRes: {}
        }

        axios({
            method: 'post',
            url: 'https://api.aliseeks.com/v1/search',
            data: {
                text: req.body.keyword,
                currency: 'AUD',
                scrollPagination: true,
                scrollIdentifier: req.body.scrollIdentifier
            },
            headers: {
                'X-Api-Client-Id': 'FPVNMCTQKJOSZPCL'
            }
          }).then(response => {
            searchData.itemsCount = response.data.aggregation.totalCount
            searchData.aliRes = response.data
            searchData.items = response.data.items
            res.json(searchData)
          }).catch(err => console.log(err))
    })
}