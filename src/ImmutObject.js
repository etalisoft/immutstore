import { VALUE } from './constants';
import createImmut from './createImmut';
import Immut from './Immut';

function ImmutObject(source, onChange) {
  function itemChange(item, value) {
    const obj = this[VALUE];
    const key = Object.keys(obj).find(k => obj[k] === item);
    const result = this.get();
    result[key] = value;
    onChange(this, result);
  }
  const ic = itemChange.bind(this);

  const _source = Object.keys(source).reduce((o, k) => {
    o[k] = createImmut(source[k], ic);
    return o;
  }, {});

  for (let k in _source) {
    Object.defineProperty(this, k.toString(), {
      enumerable: true,
      get() {
        return _source[k];
      },
      set(value) {
        ic(_source[k], value);
      },
    });
  }

  Immut.call(this, _source, ic);
  Object.freeze(this);
}

ImmutObject.prototype = Object.create(Immut.prototype, {
  get: {
    value: function() {
      const source = this[VALUE];
      return Object.keys(source).reduce((o, k) => {
        const immut = source[k];
        if (immut) {
          o[k] = immut.get();
        }
        return o;
      }, {});
    },
  },
  [Symbol.iterator]: {
    value: function*() {
      yield* this[VALUE];
    },
  },
});

export default ImmutObject;
