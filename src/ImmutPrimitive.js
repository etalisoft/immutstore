import Immut from './Immut';

function ImmutPrimitive(source, onChange) {
  Immut.call(this, source, onChange);
  Object.freeze(this);
}

ImmutPrimitive.prototype = Object.create(Immut.prototype);

export default ImmutPrimitive;
