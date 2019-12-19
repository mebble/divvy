const { SIGNIFICANCE } = require('./utils');

const round = num => {
    /**
     * https://stackoverflow.com/a/11832950
     */
    return Math.round(num * 100) / 100;
};

module.exports = (debtors, creditors) => {
    const payments = [];
    while (debtors.length) {
        const { name: debtName, amount: debt } = debtors[0];
        const { name: credName, amount: cred } = creditors[0];

        const remaining = round(Math.abs(cred - debt));
        if (remaining < SIGNIFICANCE) {
            [_, ...debtors] = debtors;
            [_, ...creditors] = creditors;
            payment = debt;  // debt == cred
        } else if (cred > debt) {
            [ _, ...debtors ] = debtors;
            creditors[0] = { name: credName, amount: remaining };
            payment = debt;
        } else {
            [ _, ...creditors ] = creditors;
            debtors[0] = { name: debtName, amount: remaining };
            payment = cred;
        }

        payments.push({
            from: debtName,
            to: credName,
            amount: payment
        });
    }
    return payments;
};
