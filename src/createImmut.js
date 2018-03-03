import Immut from './Immut';
import ImmutArray from './ImmutArray';
import ImmutObject from './ImmutObject';
import ImmutPrimitive from './ImmutPrimitive';

const PRIMITIVE = { string: true, number: true, boolean: true };

function createImmut(value, onChange) {
  if (value instanceof Immut) return value;
  const type = typeof value;
  if (value === null || PRIMITIVE[type]) return new ImmutPrimitive(value, onChange);
  if (Object.prototype.toString.call(value) === '[object Array]') return new ImmutArray(value, onChange);
  if (type === 'object') {
    if (typeof value.toImmut === 'function') return createImmut(value.toImmut());
    if (typeof value.toJSON === 'function') return createImmut(value.toJSON());
    return new ImmutObject(value, onChange);
  }
  return undefined;
}

export default createImmut;
