let axios = require('axios')
let EBAY_URL = "http://svcs.ebay.com/services/search/FindingService/v1"
    EBAY_URL += "?OPERATION-NAME=findItemsByKeywords"
    EBAY_URL += "&SERVICE-VERSION=1.13.0"
    EBAY_URL += "&SECURITY-APPNAME=TomDrape-epidash-PRD-3c22b8256-c1a615b5"
    EBAY_URL += "&GLOBAL-ID=EBAY-AU"
    EBAY_URL += "&RESPONSE-DATA-FORMAT=JSON"
    EBAY_URL += "&REST-PAYLOAD"
    EBAY_URL += "&paginationInput.entriesPerPage=100"
    EBAY_URL += "&itemFilter(0).name=LocatedIn&itemFilter(0).value=AU"
    EBAY_URL += "&itemFilter(1).name=HideDuplicateItems&itemFilter(1).value=false"
    EBAY_URL += "&itemFilter(2).name=AvailableTo&itemFilter(2).value=AU"

module.exports = (app) => {


    app.post('/api/account/ebay/search', (req, res) => {
        
        EBAY_URL += `&keywords=${req.body.keyword}`
        EBAY_URL += `&paginationInput.pageNumber=${req.body.pageNumber}`
        let searchData = {
            items: [],
            itemCount: 0,
            ebayRes: {}
        }
        axios.get(EBAY_URL).then(response => {
      
            searchData.itemCount = response.data.findItemsByKeywordsResponse[0].paginationOutput[0].totalEntries
            searchData.ebayRes = response.data
      
            if(response.data.findItemsByKeywordsResponse[0].searchResult[0].item){
                searchData.items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item.map(item => {
                    return ({
                        'imageUrl': (item.galleryURL),
                        'title': (item.title),
                        'lotSize': 1,
                        'price': {
                            'currency': item.sellingStatus[0].currentPrice[0]['@currencyId'],
                            'value': item.sellingStatus[0].currentPrice[0]['__value__']
                        },
                        'id': item.itemId
                    })
      
                })
            }
                res.json(searchData)
          }).catch(err => console.log(err))
    })
}