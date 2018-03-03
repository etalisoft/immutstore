import { VALUE } from './constants';
import createImmut from './createImmut';
import Immut from './Immut';
import update from './update';

function ImmutObject(source, onChange) {
  function propChange(curr, next) {
    const newValue =
      this === curr
        ? // Object is being updated
          createImmut(next, _propChange)
        : // Single prop is being updated.  Need to create a new ImmutObject
          new ImmutObject(update(this[VALUE], {}, curr, next), onChange);
    onChange(this, newValue);
  }
  const _propChange = propChange.bind(this);

  const _source = {};
  for (let k in source) {
    const v = createImmut(source[k], _propChange);
    if (v) {
      _source[k] = v;
      Object.defineProperty(this, k.toString(), {
        enumerable: true,
        get() {
          return v;
        },
        set(value) {
          _propChange(v, value);
        },
      });
    }
  }

  Immut.call(this, _source, _propChange);
  Object.freeze(this);
}

ImmutObject.prototype = Object.create(Immut.prototype, {
  get: {
    value() {
      const o = {};
      const source = this[VALUE];
      for (let k in source) {
        o[k] = source[k].get();
      }
      return o;
    },
  },
  [Symbol.iterator]: {
    value: function*() {
      yield this[VALUE];
    },
  },
});

export default ImmutObject;
