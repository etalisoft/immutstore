import ImmutPrimitive from './ImmutPrimitive';
import ImmutObject from './ImmutObject';

const PRIMITIVE = { string: true, number: true, boolean: true };

export default function(value, parent) {
  const type = typeof value;
  if (type === null || PRIMITIVE[type]) return ImmutPrimitive(value, parent);
  else if (value instanceof Array) throw new Error(`Type not supported: ${k}:${t}`);
  else if (type === 'object') return ImmutObject(value, parent);
  else throw new Error(`Type not supported: ${k}:${t}`);
}
