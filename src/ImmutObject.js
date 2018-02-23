import Immut from './Immut';

const RESERVED = { value: true, delete: true };

export default function ImmutObject(source, parent) {
  var actions = {
    set(key, value) {
      throw new Error('Not implemented');
    },
    delete(key) {
      throw new Error('Not implemented');
    },
  };

  const immut = {
    get value() {
      return;
    },
    set value(value) {
      return parent.set(immut, value);
    },
    delete() {
      return parent.delete(immut);
    },
  };

  for (let k in source) {
    if (RESERVED[k]) throw new Error(`Key is reserved: ${k}`);
    immut[k] = Immut(value, actions);
  }

  return Object.freeze(immut);
}
