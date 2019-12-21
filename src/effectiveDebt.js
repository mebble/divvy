const fromentries = require('fromentries');

module.exports = debtGraph => {
    const result = new Map();
    for (const { from, to, amount } of debtGraph) {
        const fromDebt = result.has(from)
            ? result.get(from) + amount
            : amount;
        const toDebt = result.has(to)
            ? result.get(to) - amount
            : -amount;

        result.set(from, fromDebt);
        result.set(to, toDebt);
    }

    return fromentries(result);
};
