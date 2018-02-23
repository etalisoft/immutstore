import ImmutObject from './ImmutObject';

describe('ImmutObject', () => {
  test('support primitives', () => {
    const init = {
      string: 'abc',
      number: 123,
      boolean: true,
      null: null,
    };
    var obj = ImmutObject(init);
    expect(obj.string.value).toBe(init.string);
    expect(obj.number.value).toBe(init.number);
    expect(obj.boolean.value).toBe(init.boolean);
    expect(obj.null.value).toBe(init.null);
  });

  test('support objects', () => {
    const init = {
      object: {
        number: 123,
      },
    };
    const obj = ImmutObject(init);
    expect(obj.object.number.value).toBe(123);
  });

  ['value', 'delete'].forEach(k => {
    test(`key '${k}' throws error`, () => {
      const init = { [k]: '' };
      const create = () => ImmutObject(init);
      expect(create).toThrow();
    });
  });

  test('object.value returns value', () => {
    const init = { string: 'abc' };
    const obj = ImmutObject(init, parent);
    expect(obj.value).toEqual(init);
  });

  test('object.value=x calls parent.set', () => {
    const init = { string: 'abc' };
    const parent = { set: jest.fn() };
    const obj = ImmutObject(init, parent);
  });
});
