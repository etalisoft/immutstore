import ImmutObject from './ImmutObject';

describe('ImmutObject', () => {
  it('immut.get() should return clone of obj', () => {
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
    expect(immut.get()).toEqual(init);
  });

  it('immut.set(obj) should call parent.set()', () => {
    const change = jest.fn();
    const immut = new ImmutObject({}, change);
    const identity = a => a;
    immut.set(identity);
    expect(change).toHaveBeenCalled();
  });
});
