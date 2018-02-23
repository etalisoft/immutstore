import createImmut from './createImmut';

function Store(obj) {
  let state = createImmut(obj);

  return Object.freeze({
    get state() {
      return state;
    },
  });
}

export default Store;
