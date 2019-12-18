const test = require('tape');

const repayments = require('./repayments');

test('one creditor', assert => {
    const creditors = [
        { name: 'ccc', amount: 120 },
    ];
    const debtors = [
        { name: 'aaa', amount: 60 },
        { name: 'bbb', amount: 60 },
    ];
    const expected = [
        { from: 'aaa', to: 'ccc', amount: 60 },
        { from: 'bbb', to: 'ccc', amount: 60 },
    ];
    const actual = repayments(debtors, creditors);
    assert.deepEqual(actual, expected);
    assert.end();
});

test('multiple creditors', assert => {
    const creditors = [
        { name: 'ccc', amount: 70 },
        { name: 'ddd', amount: 50 },
        { name: 'eee', amount: 30 },
    ];
    const debtors = [
        { name: 'aaa', amount: 100 },
        { name: 'bbb', amount: 50 },
    ];
    const expected = [
        { from: 'aaa', to: 'ccc', amount: 70 },
        { from: 'aaa', to: 'ddd', amount: 30 },
        { from: 'bbb', to: 'ddd', amount: 20 },
        { from: 'bbb', to: 'eee', amount: 30 },
    ];
    const actual = repayments(debtors, creditors);
    assert.deepEqual(actual, expected);
    assert.end();
});

test('presense of equally-sized creditors and debtors', assert => {
    const creditors = [
        { name: 'aaa', amount: 100 },
        { name: 'bbb', amount: 50 },
    ];
    const debtors = [
        { name: 'ccc', amount: 100 },
        { name: 'ddd', amount: 30 },
        { name: 'eee', amount: 20 },
    ];
    const expected = [
        { from: 'ccc', to: 'aaa', amount: 100 },
        { from: 'ddd', to: 'bbb', amount: 30 },
        { from: 'eee', to: 'bbb', amount: 20 },
    ];
    const actual = repayments(debtors, creditors);
    assert.deepEqual(actual, expected);
    assert.end();
});

test('same number of creditors and debtors', assert => {
    const creditors = [
        { name: 'aaa', amount: 20 },
        { name: 'bbb', amount: 10 },
    ];
    const debtors = [
        { name: 'ccc', amount: 25 },
        { name: 'ddd', amount: 5 },
    ];
    const expected = [
        { from: 'ccc', to: 'aaa', amount: 20 },
        { from: 'ccc', to: 'bbb', amount: 5 },
        { from: 'ddd', to: 'bbb', amount: 5 },
    ];
    const actual = repayments(debtors, creditors);
    assert.deepEqual(actual, expected);
    assert.end();
});

test('fractional (up to 2 places) payments', assert => {
    const creditors = [
        { name: 'aaa', amount: 99.99 },
        { name: 'bbb', amount: 50.25 },
    ];
    const debtors = [
        { name: 'ccc', amount: 100.01 },
        { name: 'ddd', amount: 50.23 },
    ];
    const expected = [
        { from: 'ccc', to: 'aaa', amount: 99.99 },
        { from: 'ccc', to: 'bbb', amount: 0.02 },
        { from: 'ddd', to: 'bbb', amount: 50.23 },
    ];
    const actual = repayments(debtors, creditors);
    assert.deepEqual(actual, expected);
    assert.end();
});
