import ImmutPrimitive from './ImmutPrimitive';

describe('ImmutPrimitive', () => {
  it('primitive.get() should return value', () => {
    const immut = new ImmutPrimitive(1);
    expect(immut.get()).toBe(1);
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
