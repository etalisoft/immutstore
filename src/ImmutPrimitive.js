export default function ImmutPrimitive(value, parent) {
  const immut = {
    get value() {
      return value;
    },
    set value(value) {
      parent.set(immut, value);
    },
    delete() {
      parent.delete(immut);
    },
  };
  return Object.freeze(immut);
}
