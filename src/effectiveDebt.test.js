const test = require('tape');

const effectiveDebt = require('./effectiveDebt');

test('simple graph', assert => {
    const debtGraph = [
        { from: 'a', to: 'b', amount: 10 },
        { from: 'b', to: 'c', amount: 10 },
    ];
    const expected = {
        'a': 10,
        'b': 0,
        'c': -10
    };
    const actual = effectiveDebt(debtGraph);
    assert.deepEqual(actual, expected);

    const sum = Object.values(actual)
        .reduce((acc, x) => acc + x);
    assert.equal(sum, 0, 'sum of effective debts should be zero');

    assert.end();
});

test('cyclic graph', assert => {
    const debtGraph = [
        { from: 'a', to: 'b', amount: 10 },
        { from: 'b', to: 'c', amount: 15 },
        { from: 'c', to: 'a', amount: 20 },
    ];
    const expected = {
        'a': -10,
        'b': 5,
        'c': 5
    };
    const actual = effectiveDebt(debtGraph);
    assert.deepEqual(actual, expected);

    const sum = Object.values(actual)
        .reduce((acc, x) => acc + x);
    assert.equal(sum, 0, 'sum of effective debts should be zero');

    assert.end();
});

test('fractional effective debts', assert => {
    const debtGraph = [
        { from: 'a', to: 'b', amount: 9.99 },
        { from: 'b', to: 'c', amount: 10 },
        { from: 'c', to: 'a', amount: 9.989 },
    ];
    const expected = {
        'a': 0,
        'b': 0.01,
        'c': -0.01
    };
    const actual = effectiveDebt(debtGraph);
    assert.deepEqual(actual, expected, 'insignificant effective debts should be zeroed');

    const sum = Object.values(actual)
        .reduce((acc, x) => acc + x);
    assert.equal(sum, 0, 'sum of effective debts should be zero');

    assert.end();
});
