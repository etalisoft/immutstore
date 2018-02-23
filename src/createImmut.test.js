import createImmut from './createImmut';
import ImmutArray from './ImmutArray';
import ImmutObject from './ImmutObject';
import ImmutPrimitive from './ImmutPrimitive';

describe('createImmut', () => {
  ['abc', 123, true, null].forEach(value => {
    it(`${value === null ? 'null' : typeof value} should return ImmutPrimimtive`, () => {
      const immut = createImmut(value);
      expect(immut).toBeInstanceOf(ImmutPrimitive);
    });
  });

  it('[] should return ImmutPrimimtive', () => {
    const immut = createImmut([]);
    expect(immut).toBeInstanceOf(ImmutArray);
  });

  it('{} should return ImmutObject', () => {
    const immut = createImmut({});
    expect(immut).toBeInstanceOf(ImmutObject);
  });
});
