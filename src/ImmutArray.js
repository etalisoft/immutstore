import Immut from './Immut';

function ImmutArray(source, onChange) {
  Immut.call(this, source, onChange);
  Object.freeze(this);
}

ImmutArray.prototype = Object.create(Immut.prototype);

export default ImmutArray;
