import ImmutObject from './ImmutObject';

describe('ImmutObject', () => {
  it('support primitives', () => {
    const init = {
      string: 'abc',
      number: 123,
      boolean: true,
      null: null,
    };
    var obj = new ImmutObject(init);
    expect(obj.string.value).toBe(init.string);
    expect(obj.number.value).toBe(init.number);
    expect(obj.boolean.value).toBe(init.boolean);
    expect(obj.null.value).toBe(init.null);
  });

  it('support objects', () => {
    const init = {
      object: {
        number: 123,
      },
    };
    const obj = new ImmutObject(init);
    expect(obj.object.number.value).toBe(123);
  });

  ['value', 'delete'].forEach(k => {
    it(`key '${k}' throws error`, () => {
      const init = { [k]: '' };
      const create = () => new ImmutObject(init);
      expect(create).toThrow();
    });
  });

  it('object.value returns json', () => {
    const init = {
      string: 'abc',
      number: 123,
      boolean: true,
      null: null,
      object: {
        string: 'abc',
        number: 123,
        boolean: true,
        null: null,
      },
    };
    const immut = new ImmutObject(init, {});
    expect(immut.value).not.toBe(init);
    expect(immut.value).toEqual(init);
  });
});
