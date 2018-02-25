import ImmutObject from './ImmutObject';

describe('ImmutObject', () => {
  it('ImmutObject.key should return Immut for source.key', () => {
    const init = { a: 'a' };
    const immut = new ImmutObject(init);
    expect(immut.a.get()).toBe(init.a);
  });

  it('ImmutObject should be an iterator', () => {
    const init = { a: 'a' };
    const immut = new ImmutObject(init);
    expect(immut[Symbol.iterator]).toBeTruthy();
  });

  it('should remove keys for undefined values', () => {
    const init = { a: 'a', b: undefined, c: undefined, d: 'd' };
    const immut = new ImmutObject(init);
    expect(immut.get()).toEqual({ a: 'a', d: 'd' });
  });

  it('immut.get() should return clone of source', () => {
    const change = jest.fn();
    const init = { a: 'a' };
    const immut = new ImmutObject(init, change);
    expect(immut.get()).toEqual(init);
  });

  it('mutation of immut.get() object should not affect next immut.get()', () => {
    const change = jest.fn();
    const init = { a: 'a' };
    const immut = new ImmutObject(init, change);
    const result = immut.get();
    result.a = 'A';
    expect(immut.get()).toEqual({ a: 'a' });
  });

  it('immut.set(obj) should call parent.set()', () => {
    const change = jest.fn();
    const immut = new ImmutObject({}, change);
    const identity = a => a;
    immut.set(identity);
    expect(change).toHaveBeenCalled();
  });

  it('immut.key.set(obj) should call parent.set()', () => {
    const init = { key: 'abc' };
    const change = jest.fn();
    const immut = new ImmutObject(init, change);
    immut.key.set(() => 'def');
    expect(change).toHaveBeenCalledWith(immut, { key: 'def' });
  });

  it('immut.key = obj should call parent.set()', () => {
    const init = { key: 'abc' };
    const change = jest.fn();
    const immut = new ImmutObject(init, change);
    immut.key = 'def';
    expect(change).toHaveBeenCalledWith(immut, { key: 'def' });
  });
});
