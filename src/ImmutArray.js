import { PARENT, VALUE } from './constants';
import createImmut from './createImmut';
import Immut from './Immut';

function ImmutArray(source, onChange) {
  function itemChange(item, value) {
    const result = this.get();
    result[this[VALUE].indexOf(item)] = value;
    onChange(this, result);
  }
  const ic = itemChange.bind(this);

  const _source = source.reduce((a, v, i) => {
    const immut = createImmut(v, ic);
    if (immut) {
      a[i] = immut;
    }
    return a;
  }, []);

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

ImmutArray.prototype = Object.create(Immut.prototype, {
  get: {
    value: function() {
      return this[VALUE].map(v => v.get());
    },
  },
  length: {
    get() {
      return this[VALUE].length;
    },
  },
  [Symbol.iterator]: {
    value: function*() {
      yield* this[VALUE];
    },
  },
});

export default ImmutArray;
