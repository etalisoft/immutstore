import update from '../update';

describe('merge', () => {
  it('should merge arrays', () => {
    const prev = { a: 'a' };
    const source = [{}, prev, [], 123];
    const target = [];
    update(source, target, prev, { b: 'b' });
    expect(target).toEqual([{}, { b: 'b' }, [], 123]);
  });

  it('should merge objects', () => {
    const prev = { a: 'a' };
    const source = { a: {}, q: prev, b: [], c: 123 };
    const target = {};
    update(source, target, prev, { b: 'b' });
    expect(target).toEqual({ a: {}, q: { b: 'b' }, b: [], c: 123 });
  });
});
