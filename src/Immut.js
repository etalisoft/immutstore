import { CHANGE, VALUE } from './constants';

function Immut(source, onChange) {
  this[VALUE] = source;
  this[CHANGE] = onChange;
}
Object.defineProperties(Immut.prototype, {
  get: {
    enumerable: true,
    value: function() {
      return this[VALUE];
    },
  },
  set: {
    enumerable: true,
    value: function(map) {
      this[CHANGE](this, map(this[VALUE]));
    },
  },
});

export default Immut;
