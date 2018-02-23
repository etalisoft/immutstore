import Store from './store';

let initialState;
beforeEach(() => {
  initialState = {
    id: 123,
    name: {
      first: 'Bob',
      last: 'Smith',
      things: ['abc', 123, { a: 'a' }, null],
    },
  };
});

describe('Store', () => {
  it('should', () => {
    initialState = {
      a: 'bob',
      b: 123,
      c: null,
      d: true,
    };
    const store = Store(initialState);
  });
});
