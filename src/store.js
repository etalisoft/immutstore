const assert = condition => error => {
  if (!condition) throw new Error(error);
};

export default function Store(obj) {
  assert(typeof obj === 'object')(`Invalid Store object: Expected object, recieved ${typeof obj}.`);

  let state = Object(obj);
  return { state };

  function ImmutObject(obj, actions) {
    const json = {};
    const o = {};

    function set(key, value) {
      throw new Error('Not implemented');
    }
    function remove(key, value) {
      throw new Error('Not implemented');
    }

    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (type === 'string' || type === 'number' || type === 'boolean' || type === null) {
        v = ImmutPrimitive(v, { set, remove });
      } else if (type === 'object') {
        v = ImmutObject(v, { set, remove });
      } else if (type instanceof Array) {
        throw new Error(`Type not supported: '${k}':${typeof v}.`);
      } else {
        throw new Error(`Type not supported: '${k}':${typeof v}.`);
      }
      o[k] = v;
    }

    const object = Object.freeze({
      ...o,
    });

    return object;
  }
}
