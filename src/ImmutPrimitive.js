import { VALUE, CHANGE } from './constants';
import createImmut from './createImmut';
import Immut from './Immut';

function ImmutPrimitive(source, onChange) {
  Immut.call(this, source, onChange);
  Object.freeze(this);
}

ImmutPrimitive.prototype = Object.create(Immut.prototype, {
  set: {
    value: function(map) {
      const oldValue = this[VALUE];
      const newValue = map(oldValue);
      if (oldValue !== newValue) {
        const change = this[CHANGE];
        change(this, createImmut(newValue, change));
      }
    },
  },
});

export default ImmutPrimitive;
