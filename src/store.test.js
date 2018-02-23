import Immut from './Immut';
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
  describe('ctor', () => {
    it('should create store', () => {
      initialState = {
        a: 'bob',
        b: 123,
        c: null,
        d: true,
      };
      const store = Store(initialState);
      expect(store.state).toBeInstanceOf(Immut);
      expect(store.state.a.value).toBe(initialState.a);
    });

    it('store should be frozen', () => {
      const store = Store(123);
      const mutateStore = () => {
        store.mutated = true;
      };
      expect(mutateStore).toThrow();
    });

    it('store.state should be frozen', () => {
      const mutateState = () => {
        store.state.mutated = true;
      };
      expect(mutateState).toThrow();
    });

    it('should not mutate when initial source changes', () => {
      initialState = {
        name: {
          first: 'Bob',
        },
      };
      const store = Store(initialState);
      expect(store.state.name.first.value).toBe('Bob');
      const curState = store.state.value;
      expect(curState).toEqual(initialState);
      initialState.name = { first: 'Joe' };
      expect(store.state.value).toEqual(curState);
    });
  });

  it('state.value should return the value', () => {
    const store = Store(123);
    expect(store.state.value).toBe(123);
  });

  it('state.value=x should update the value', () => {
    const store = Store(123);
    store.state.value = { a: 'a' };
    expect(store.state.value).toEqual({ a: 'a' });
  });

  it.skip('state.key.value=x should update the state', () => {
    const init = {
      a: 'a',
      b: 'b',
    };
    const store = Store(init);
    store.state.a.value = 123;
    expect(store.state.value).toEqual({
      a: 123,
      b: 'b',
    });
  });

  it('state.delete() should not allowed', () => {
    const store = Store(123);
    const deletion = () => {
      store.state.value.delete();
    };
    expect(deletion).toThrow();
  });
});
