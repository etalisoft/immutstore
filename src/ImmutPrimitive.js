import Immut from './Immut';

function ImmutPrimitive(value, parent) {
  Immut.call(this, value, parent);
  Object.freeze(this);
}

ImmutPrimitive.prototype = Object.create(Immut.prototype);

export default ImmutPrimitive;
