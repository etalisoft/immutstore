import ImmutObject from './ImmutObject';
import ImmutPrimitive from './ImmutPrimitive';

const PRIMITIVE = { string: true, number: true, boolean: true };

export default function createImmut(value, parent) {
  const type = typeof value;
  if (value === null || PRIMITIVE[type]) return new ImmutPrimitive(value, parent);
  else if (value instanceof Array) throw new Error(`Type not supported: ${k}:${t}`);
  else if (type === 'object') return new ImmutObject(value, parent);
  else throw new Error(`Type not supported: ${k}:${t}`);
}
