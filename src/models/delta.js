class Delta {
    constructor(symbol, name, price, change, changePercent, marketCap) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.change = change;
        this.changePercent = changePercent;
        this.marketCap = marketCap;
    }
    static fromCsvRow(row) {
        return new Delta(row[0], row[1], row[2], row[3], row[4], row[5]);
    }
}
module.exports = Delta;
