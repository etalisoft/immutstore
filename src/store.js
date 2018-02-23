import createImmut from './createImmut';
import ImmutPrimitive from './ImmutPrimitive';

function Store(obj) {
  const actions = {
    set(immut, value) {
      state = createImmut(value);
    },
    delete(key, value) {
      throw new Error('Cannot delete root state');
    },
  };

  let state = createImmut(obj, actions);

  return Object.freeze({
    get state() {
      return state;
    },
  });
}

export default Store;
