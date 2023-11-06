const Delta = require('./delta.js');
class Company {
    constructor(symbol, name) {
        this.symbol = symbol;
        this.name = name;
        this.history = [];
    }
    addDelta(deltaCSV) {
        const delta = Delta.fromCsvRow([this.symbol, this.name, ...deltaCSV.slice(2)]);
        this.history.push(delta);
    }
    current() {
        return this.history[this.history.length - 1];
    }
}
module.exports = Company;
