import { VALUE, CHANGE } from './constants';
import Immut from './Immut';

function ImmutPrimitive(source, onChange) {
  Immut.call(this, source, onChange);
  Object.freeze(this);
}

ImmutPrimitive.prototype = Object.create(Immut.prototype, {
  set: {
    enumerable: true,
    value: function(map) {
      const oldValue = this[VALUE];
      const newValue = map(oldValue);
      if (oldValue != newValue) {
        this[CHANGE](this, newValue);
      }
    },
  },
});

export default ImmutPrimitive;
