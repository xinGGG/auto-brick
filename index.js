let biboxPriceList = require('./src/bibox')
let kucoinPriceList = require('./src/kucoin')

let main = async () => {
    let promiseBibox = biboxPriceList('CAT')
    let promiseKucoin = kucoinPriceList('CAT')

    let biboxList = await promiseBibox
    let kucoinList = await promiseKucoin

    // 等待全部结束
    console.log(biboxList, kucoinList)

    // 从bibox往kucoin搬运
    if (biboxList.sell[0][0] < kucoinList.buy[0][0]) {
        console.log(1);
        analyse(biboxList.sell, kucoinList.buy)
    } else if (biboxList.buy[0][0] < kucoinList.sell[0][0]) {
        console.log(2);
        analyse(kucoinList.sell, biboxList.buy)
    } else {
        console.log('此时不满足搬运条件')
    }
}

function analyse(from, to) {
    // 找出来可以搬运的部分

    let provBuy = to[0][0]
    let provSell = from[0][0]

    let availableSell = from.filter(item => item[0] < provBuy)

    let availableBuy = to.filter(item => item[0] > provSell)

    console.log(availableSell, availableBuy)

    // 卖单为主 判断量级

    let total = availableSell.reduce((all, cur) => all + cur[2], 0)

    let sellOrder = 1

    // 卖完第几个

    // 策略分析 TODO

    let report = []
}

main()
