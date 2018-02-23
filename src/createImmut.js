import ImmutArray from './ImmutArray';
import ImmutObject from './ImmutObject';
import ImmutPrimitive from './ImmutPrimitive';

const PRIMITIVE = { string: true, number: true, boolean: true };

export default function(value, onChange) {
  const type = typeof value;
  if (value === null || PRIMITIVE[type]) return new ImmutPrimitive(value, onChange);
  if (Object.prototype.toString.call(value) === '[object Array]') return new ImmutArray(value, onChange);
  if (type === 'object') return new ImmutObject(value, onChange);
  throw new Error(`Invalid Immut type: ${type}`);
}
