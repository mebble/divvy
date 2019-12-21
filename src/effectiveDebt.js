const fromentries = require('fromentries');

const { roundTwoPlaces } = require('./utils');

module.exports = debtGraph => {
    const result = new Map();
    for (const { from, to, amount } of debtGraph) {
        const fromDebt = result.has(from)
            ? roundTwoPlaces(result.get(from) + amount)
            : amount;
        const toDebt = result.has(to)
            ? roundTwoPlaces(result.get(to) - amount)
            : -amount;

        result.set(from, fromDebt);
        result.set(to, toDebt);
    }

    return fromentries(result);
};
