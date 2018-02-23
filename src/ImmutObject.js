import { VALUE } from './symbols';
import createImmut from './createImmut';
import Immut from './Immut';

const RESERVED = { value: true, delete: true };

function ImmutObject(source, parent) {
  var actions = {
    set(key, value) {
      throw new Error('Not implemented');
    },
    delete(key) {
      throw new Error('Not implemented');
    },
  };

  var json = {};
  for (let k in source) {
    if (RESERVED[k]) throw new Error(`Key is reserved: ${k}`);
    const immut = createImmut(source[k], actions);
    json[k] = (this[k] = immut).value;
  }

  Immut.call(this, json, parent);

  Object.freeze(this);
}

ImmutObject.prototype = Object.create(Immut.prototype);

Object.defineProperty(ImmutObject.prototype, 'value', {
  enumerable: true,
  get() {
    return Object.keys(this).reduce((o, k) => {
      o[k] = this[k].value;
      return o;
    }, {});
  },
});

export default ImmutObject;
