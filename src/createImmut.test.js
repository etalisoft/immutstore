import createImmut from './createImmut';
import Immut from './Immut';
import ImmutArray from './ImmutArray';
import ImmutObject from './ImmutObject';
import ImmutPrimitive from './ImmutPrimitive';

describe('createImmut', () => {
  ['abc', 123, true, null].forEach(value => {
    it(`${value === null ? 'null' : typeof value} should return ImmutPrimimtive`, () => {
      const immut = createImmut(value);
      expect(immut).toBeInstanceOf(Immut);
      expect(immut).toBeInstanceOf(ImmutPrimitive);
    });
  });

  it('[] should return ImmutArray', () => {
    const immut = createImmut([]);
    expect(immut).toBeInstanceOf(Immut);
    expect(immut).toBeInstanceOf(ImmutArray);
  });

  it('{} should return ImmutObject', () => {
    const immut = createImmut({});
    expect(immut).toBeInstanceOf(Immut);
    expect(immut).toBeInstanceOf(ImmutObject);
  });

  it('{}.toImmut should return ImmutObject', () => {
    const init = {
      a: 'a',
      toImmut: () => ({ b: 'b' }),
    };
    const immut = createImmut(init);
    expect(immut.get()).toEqual({ b: 'b' });
  });

  it('{}.toJSON should return ImmutObject', () => {
    const init = {
      a: 'a',
      toJSON: () => ({ b: 'b' }),
    };
    const immut = createImmut(init);
    expect(immut.get()).toEqual({ b: 'b' });
  });

  it('Date should return ImmutPrimitive', () => {
    const init = {
      a: 'a',
      toImmut: () => new Date(), // Date.prototype.toJSON returns a string
    };
    const immut = createImmut(init);
    expect(immut).toBeInstanceOf(ImmutPrimitive);
    expect(typeof immut.get()).toBe('string');
  });

  it('should otherwise return undefined', () => {
    const immut = createImmut(undefined);
    expect(immut).toBe(undefined);
  });
});
