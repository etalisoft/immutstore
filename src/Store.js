import createImmut from './createImmut';

function Store(initialValue) {
  if (!new.target) return new Store(initialValue);
  let state;
  this.state = state;

  function onChange(_, value) {
    const immut = createImmut(value, onChange);
    if (!immut)
      throw new Error(
        [
          'Invalid initialValue for Store.',
          'Expected string, number, boolean, number, array, or object.',
          `Recieved ${typeof value}.`,
        ].join(' '),
      );
    state = immut;
  }

  onChange(undefined, initialValue);

  Object.defineProperty(this, 'state', {
    enumerable: true,
    get() {
      return state;
    },
    set(value) {
      onChange(undefined, value);
    },
  });

  Object.freeze(this);
}

export default Store;
