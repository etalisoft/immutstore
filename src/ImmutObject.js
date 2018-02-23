import Immut from './Immut';

function ImmutObject(source, onChange) {
  Immut.call(this, source, onChange);
  Object.freeze(this);
}

ImmutObject.prototype = Object.create(Immut.prototype);

export default ImmutObject;
