import { VALUE } from './constants';
import createImmut from './createImmut';
import Immut from './Immut';
import update from './update';

function ImmutArray(source, onChange) {
  function itemChange(curr, next) {
    const newValue =
      this === curr
        ? // Array is being updated
          createImmut(next, _itemChange)
        : // Single item is being updated.  Need to create a new ItemArray
          new ImmutArray(update(this[VALUE], [], curr, next), onChange);
    onChange(this, newValue);
  }
  const _itemChange = itemChange.bind(this);

  const _source = [];
  for (let k in source) {
    const v = createImmut(source[k], _itemChange);
    if (v) {
      _source[k] = v;
      Object.defineProperty(this, k.toString(), {
        enumerable: true,
        get() {
          return v;
        },
        set(value) {
          _itemChange(v, value);
        },
      });
    }
  }

  Immut.call(this, _source, _itemChange);
  Object.freeze(this);
}

ImmutArray.prototype = Object.create(Immut.prototype, {
  get: {
    value() {
      const arr = [];
      const source = this[VALUE];
      for (let k in source) {
        arr[k] = source[k].get();
      }
      return arr;
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
