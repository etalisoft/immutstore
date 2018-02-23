import { PARENT, VALUE } from './constants';
import createImmut from './createImmut';
import Immut from './Immut';

function ImmutArray(source, onChange) {
  function itemChange(item, value) {
    const result = this[VALUE].map(v => v.get());
    result[this[VALUE].indexOf(item)] = value;
    onChange(this, result);
  }
  const ic = itemChange.bind(this);

  const _source = source.map(v => createImmut(v, ic));
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
      return this[VALUE].map(v => (v ? v.get() : undefined));
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
