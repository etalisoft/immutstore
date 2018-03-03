export default (source, target, prev, next) => {
  for (let k in source) {
    const v = source[k];
    target[k] = v === prev ? next : v;
  }
  return target;
};
