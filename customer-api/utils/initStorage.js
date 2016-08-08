var storage = require('node-persist');
storage.initSync();
storage.setItem('1', {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    age: 34,
    address: {
        street: '123 Wisconsin Ave',
        city: 'Milwaukee',
        state: 'WI',
        zip: '53202'
    }
});
storage.setItem('2', {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    age: 33,
    address: {
        street: '123 Wisconsin Ave',
        city: 'Milwaukee',
        state: 'WI',
        zip: '53202'
    }
});
storage.setItem('3', {
    id: 3,
    firstName: 'Agnes',
    lastName: 'Bilford',
    age: 67,
    address: {
        street: 'S455 W23434234 Pheasant Cir',
        city: 'Boise',
        state: 'ID',
        zip: '26344'
    }
});