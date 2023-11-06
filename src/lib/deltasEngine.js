const deltas = require('../data/Deltas.csv');
const snapshot = require('../data/snapshot.csv')
const Company = require('../models/company');
const companyCount = snapshot.length - 1;

class DeltasEngine {
    constructor() {
        this.index = 0;
        this.companies = [];
        this.subscribers = []
    }

    getNext() {
        const start = this.index * companyCount + this.index;
        const end = start + companyCount;
        if (end >= deltas.length) {
            this.index = 0;
            this.getNext();
            return
        }
        const rows = deltas.slice(start, end);
        const delay = deltas[end][0]
        this.index++;
        for (let i = 0; i < rows.length - 1; i++) {
            const row = rows[i];
            const company = this.companies[i]
            company.addDelta(row);
        }
        this.notifySubscribers();
        setTimeout(() => this.getNext(), delay);
    }

    start() {
        for (let i = 1; i < snapshot.length; i++) {
            const snapshotRow = snapshot[i];
            const company = new Company(snapshotRow[0], snapshotRow[1]);
            company.addDelta(snapshotRow);
            this.companies.push(company);
        }
        this.notifySubscribers();
        setTimeout(() => this.getNext(), Math.random() * 1000 + 1000);
    }

    registerSubscriber(subscriber) {
        this.subscribers.push(subscriber);
    }

    notifySubscribers() {
        for (const subscriber of this.subscribers) {
            subscriber(this.companies);
        }
    }
}

module.exports = DeltasEngine;
