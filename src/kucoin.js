const r2 = require('r2')

const kucoinPriceList = async token => {
    try {
        let sellList = await r2.get(`https://kitchen-2.kucoin.com/v1/${token}-BTC/open/orders-sell?limit=15&group=1&c=&lang=zh_CN`).json
        let buyList = await r2.get(`https://kitchen-2.kucoin.com/v1/${token}-BTC/open/orders-buy?limit=15&group=1&c=&lang=zh_CN`).json

        if (!sellList.success || !buyList.success) {
            throw new Error(`${token}: get sell/buy data failed`)
        }

        return {
            sell: sellList.data,
            buy: buyList.data
        }
    } catch (e) {
        console.log(e);
        return
    }
}

module.exports = kucoinPriceList
