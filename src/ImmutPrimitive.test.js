import ImmutPrimitive from './ImmutPrimitive';

describe('ImmutPrimitive', () => {
  // new ImmutPrimitive(1).get() === 1
  it('primitive.get() should return value', () => {
    const value = 1;
    const immut = new ImmutPrimitive(value);
    expect(immut.get()).toBe(value);
  });

  it('primitive.set(a => b) should call parent.set()', () => {
    const change = jest.fn();
    const immut = new ImmutPrimitive(1, change);
    immut.set(_ => 2);
    expect(change).toHaveBeenCalledWith(immut, 2);
  });

  it('primitive.set(a => a) should NOT call parent.set()', () => {
    const change = jest.fn();
    const immut = new ImmutPrimitive(1, change);
    const identity = a => a;
    immut.set(identity);
    expect(change).not.toHaveBeenCalled();
  });
});
