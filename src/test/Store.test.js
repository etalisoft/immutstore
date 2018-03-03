import Immut from '../Immut';
import Store from '../Store';

describe('Store', () => {
  it('should be Store', () => {
    expect(new Store('abc')).toBeInstanceOf(Store);
  });

  it('should auto new', () => {
    expect(Store('abc')).toBeInstanceOf(Store);
  });

  it('should throw an error if initialValue is not supported', () => {
    const create = () => new Store();
    expect(create).toThrow();
  });

  it('should be frozen', () => {
    const store = new Store(123);
    const mutate = () => {
      store.mutated = true;
    };
    expect(mutate).toThrow();
  });

  it('should have a state object', () => {
    const store = new Store(123);
    expect(store.state).toBeInstanceOf(Immut);
  });

  it('store.state=value should update the state', () => {
    const store = new Store(123);
    store.state = 'a';
    expect(store.state.get()).toBe('a');
  });

  it('store.state.set(map) should update the state', () => {
    const store = new Store(123);
    store.state.set(() => 'a');
    expect(store.state.get()).toBe('a');
  });

  it('store.key.key.key=value should update the state', () => {
    const init = {
      user: {
        name: {
          first: 'bob',
          last: 'bob',
        },
      },
    };
    const store = new Store(init);
    store.state.user.name.first = 'Bob';
    expect(store.state.get()).toEqual({
      user: {
        name: {
          first: 'Bob',
          last: 'bob',
        },
      },
    });
  });
});
