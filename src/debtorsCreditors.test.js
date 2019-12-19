const test = require('tape');

const debtorsCreditors = require('./debtorsCreditors');

test('creditors and debtors are in sorted order', assert => {
    const effectiveDebts = [
        { name: 'a', amount: 20 },
        { name: 'b', amount: -40 },
        { name: 'c', amount: -10 },
        { name: 'd', amount: 30 },
    ];
    const expected = [
        [
            { name: 'd', amount: 30 },
            { name: 'a', amount: 20 }
        ],
        [
            { name: 'b', amount: 40 },
            { name: 'c', amount: 10 }
        ]
    ];
    const actual = debtorsCreditors(effectiveDebts);
    assert.deepEqual(actual, expected);
    assert.end();
});

test('creditors and debtors are non-zero', assert => {
    const effectiveDebts = [
        { name: 'a', amount: -10 },
        { name: 'b', amount: 0 },
        { name: 'c', amount: 10 },
    ];
    const expected = [
        [
            { name: 'c', amount: 10 }
        ],
        [
            { name: 'a', amount: 10 }
        ]
    ];
    const actual = debtorsCreditors(effectiveDebts);
    assert.deepEqual(actual, expected);
    assert.end();
});

test('creditors and debtors are significantly-valued', assert => {
    const effectiveDebts = [
        { name: 'a', amount: 10 },
        { name: 'b', amount: -20 },
        { name: 'c', amount: 1e-2 },
        { name: 'd', amount: -2e-2 },
        { name: 'e', amount: 2e-3 },
        { name: 'f', amount: -2e-3 },
    ];
    const expected = [
        [
            { name: 'a', amount: 10 },
            { name: 'c', amount: 1e-2 },
        ],
        [
            { name: 'b', amount: 20 },
            { name: 'd', amount: 2e-2 },
        ]
    ];
    const actual = debtorsCreditors(effectiveDebts);
    assert.deepEqual(actual, expected);
    assert.end();
});
