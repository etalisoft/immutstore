import createImmut from './createImmut';
import Immut from './Immut';
import ImmutObject from './ImmutObject';
import ImmutPrimitive from './ImmutPrimitive';

describe('createImmut', () => {
  ['abc', 123, true, null].forEach(value => {
    it(`${value === null ? 'null' : typeof value} is ImmutPrimitive`, () => {
      const immut = createImmut(value, {});
      expect(immut).toBeInstanceOf(Immut);
      expect(immut).toBeInstanceOf(ImmutPrimitive);
    });
  });

  it(`object is ImmutObject`, () => {
    const immut = createImmut({}, {});
    expect(immut).toBeInstanceOf(Immut);
    expect(immut).toBeInstanceOf(ImmutObject);
  });
});
