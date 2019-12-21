const { SIGNIFICANCE } = require('./utils');

const comparatorDesc = (a, b) => {
    const { amount: amountA } = a;
    const { amount: amountB } = b;
    return amountB - amountA;
};

module.exports.debtorsCreditors = effectiveDebts => {
    const debtors = [];
    const creditors = [];

    for (const [ name, amount ] of Object.entries(effectiveDebts)) {
        if (Math.abs(amount) >= SIGNIFICANCE) {
            if (amount > 0) {
                debtors.push({ name, amount });
            } else {
                creditors.push({ name, amount: Math.abs(amount) });
            }
        }
    }

    return [ debtors, creditors ];
};

module.exports.alignDescending = (debtors, creditors) => {
    debtors = [...debtors].sort(comparatorDesc);
    creditors = [...creditors].sort(comparatorDesc);
    return [ debtors, creditors ];
};
