import { VALUE, CHANGE } from './constants';

function Immut(source, onChange) {
  this[VALUE] = source;
  this[CHANGE] = onChange;
}

Object.defineProperties(Immut.prototype, {
  get: {
    value() {
      return this[VALUE];
    },
  },
  set: {
    value(map) {
      this[CHANGE](this, map(this[VALUE]));
    },
  },
});

export default Immut;
