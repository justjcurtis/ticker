const DeltaEngine = require('./lib/deltasEngine')
const deltasEngine = new DeltaEngine()

const table = document.getElementById('companies')

const createRow = (company, body) => {
    const row = document.createElement('tr')
    row.classList.add('table-company')
    row.id = company.symbol
    const symbol = document.createElement('td')
    symbol.innerText = company.symbol
    const name = document.createElement('td')
    name.innerText = company.name
    const price = document.createElement('td')
    price.innerText = company.current().price
    const change = document.createElement('td')
    change.innerText = company.current().change
    const percentChange = document.createElement('td')
    percentChange.innerText = company.current().changePercent
    const marketCap = document.createElement('td')
    marketCap.innerText = company.current().marketCap

    row.appendChild(symbol)
    row.appendChild(name)
    row.appendChild(price)
    row.appendChild(change)
    row.appendChild(percentChange)
    row.appendChild(marketCap)
    body.appendChild(row)
}

const createTable = (companies) => {
    const header = document.createElement('tr')
    header.classList.add('table-header')
    const symbol = document.createElement('th')
    symbol.innerText = 'Symbol'
    const name = document.createElement('th')
    name.innerText = 'Name'
    const price = document.createElement('th')
    price.innerText = 'Price'
    const change = document.createElement('th')
    change.innerText = 'Change'
    const percentChange = document.createElement('th')
    percentChange.innerText = '% Change'
    const marketCap = document.createElement('th')
    marketCap.innerText = 'Market Cap'

    const body = document.createElement('tbody')

    header.appendChild(symbol)
    header.appendChild(name)
    header.appendChild(price)
    header.appendChild(change)
    header.appendChild(percentChange)
    header.appendChild(marketCap)
    table.appendChild(header)
    table.appendChild(body)

    for (const company of companies) {
        createRow(company, body)
    }
}

const updateCompanies = (companies) => {
    for (const company of companies) {
        const row = document.getElementById(company.symbol)
        const price = row.children[2]
        const change = row.children[3]
        const percentChange = row.children[4]
        const marketCap = row.children[5]

        const current = company.current()
        if (current.price > price.innerText) {
            row.classList.add('table-company-up')
            setTimeout(() => row.classList.remove('table-company-up'), Math.random() * 300 + 500)
        }
        if (current.price < price.innerText) {
            row.classList.add('table-company-down')
            setTimeout(() => row.classList.remove('table-company-down'), Math.random() * 300 + 500)
        }
        if (current.price) price.innerText = current.price
        if (current.change) change.innerText = current.change
        if (current.changePercent) percentChange.innerText = current.changePercent
        if (current.marketCap) marketCap.innerText = current.marketCap
    }
}

const updateDom = (companies) => {
    const firstRun = table.children.length === 0
    if (firstRun) {
        createTable(companies)
        return
    }
    updateCompanies(companies)
}

deltasEngine.registerSubscriber(updateDom)
deltasEngine.start()
