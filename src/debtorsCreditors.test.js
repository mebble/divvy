const test = require('tape');

const { debtorsCreditors, alignDescending } = require('./debtorsCreditors');

test('creditors and debtors are non-zero', assert => {
    const effectiveDebts = {
        'a': -10,
        'b': 0,
        'c': 10,
    };
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
    const effectiveDebts = {
        'a': 10,
        'b': -20,
        'c': 1e-2,
        'd': -2e-2,
        'e': 2e-3,
        'f': -2e-3,
    };
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

test('creditors and debtors are aligned in descending sorted order', assert => {
    const debtors = [
        { name: 'a', amount: 20 },
        { name: 'd', amount: 30 },
    ];
    const creditors = [
        { name: 'c', amount: 10 },
        { name: 'b', amount: 40 },
    ];
    const expected = [
        [
            { name: 'd', amount: 30 },
            { name: 'a', amount: 20 },
        ],
        [
            { name: 'b', amount: 40 },
            { name: 'c', amount: 10 }
        ]
    ];
    const actual = alignDescending(debtors, creditors);
    assert.deepEqual(actual, expected);
    assert.end();
});
