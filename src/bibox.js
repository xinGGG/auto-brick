const puppeteer = require('puppeteer')

const sleep = require('es7-sleep')

const getBiboxPrice = () => {
    let sellNodeList = document.querySelectorAll('.depth-box-a:nth-child(2) tr')

    let buyNodeList = document.querySelectorAll('.depth-box-a:nth-child(4) tr')

    let transformNode2Data = (nodelist, order) => {
        let result = []

        let method = order ? 'unshift' : 'push'

        for (let tr of nodelist) {
            let [_, price, number, total] = [...tr.cells].map(v => v.innerText)

            result[method]([+price, +number, +total])
        }

        return result
    }

    let sellList = transformNode2Data(sellNodeList, true)

    let buyList = transformNode2Data(buyNodeList)

    return {
        sell: sellList,
        buy: buyList
    }

}

const biboxPriceList = async token => {
    try {
        let url = `https://www.bibox.com/exchange?coinPair=${token}_BTC`

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(url)

        await sleep(5000)

        let result = await page.evaluate(getBiboxPrice)

        await browser.close()

        return result
    } catch (e) {
        console.log(e)
    }
}

module.exports = biboxPriceList
