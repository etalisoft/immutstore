import { VALUE, PARENT } from './symbols';

function Immut(value, parent) {
  this[VALUE] = value;
  this[PARENT] = parent;
}

Object.defineProperties(Immut.prototype, {
  value: {
    enumerable: true,
    get: function() {
      return this[VALUE];
    },
    set: function(value) {
      if (value !== this[VALUE]) {
        this[PARENT].set(this, value);
      }
    },
  },
  delete: {
    enumerable: true,
    value: function() {
      this[PARENT].delete(this);
    },
  },
});

export default Immut;
