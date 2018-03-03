import ImmutArray from '../ImmutArray';

describe('ImmutArray', () => {
  it('ImmutArray.length should return source.length', () => {
    const init = ['a', 1];
    const immut = new ImmutArray(init);
    expect(immut.length).toBe(init.length);
  });

  it('ImmutArray[i] should return Immut for source[i]', () => {
    const init = ['a', 'b'];
    const immut = new ImmutArray(init);
    expect(immut[1].get()).toBe(init[1]);
  });

  it('ImmutArray should be an iterator', () => {
    const init = [1, 2];
    const immut = new ImmutArray(init);
    for (let value of immut) {
      expect(value).toBeTruthy();
    }
  });

  it('should remove keys for undefined values', () => {
    const init = ['a', false, null, undefined, 0, {}, []];
    const immut = new ImmutArray(init);
    expect(Object.keys(immut)).toEqual(['0', '1', '2', '4', '5', '6']);
  });

  it('immut.get() should return clone of source', () => {
    const init = ['a', 1];
    init[5] = true;
    const immut = new ImmutArray(init);
    expect(immut.get()).toEqual(init);
  });

  it('mutation of immut.get() object should not affect next immut.get()', () => {
    const init = ['a', 1];
    const immut = new ImmutArray(init);
    const result = immut.get();
    result[1] = 'b';
    expect(immut.get()).toEqual(['a', 1]);
  });

  it('immut.set(obj) should call parent.set()', () => {
    const init = ['a', 1];
    const change = jest.fn();
    const immut = new ImmutArray(init, change);
    const identity = a => a;
    immut.set(identity);
    expect(change.mock.calls[0][0]).toBe(immut);
    expect(change.mock.calls[0][1].get()).toEqual(['a', 1]);
  });

  it('immut[i].set(obj) should call parent.set()', () => {
    const init = ['a', 1];
    const change = jest.fn();
    const immut = new ImmutArray(init, change);
    immut[1].set(() => 'b');
    expect(change.mock.calls[0][0]).toBe(immut);
    expect(change.mock.calls[0][1].get()).toEqual(['a', 'b']);
  });

  it('immut[i] = obj should call parent.set()', () => {
    const init = ['a', 1];
    const change = jest.fn();
    const immut = new ImmutArray(init, change);
    immut[1] = 'b';
    expect(change.mock.calls[0][0]).toBe(immut);
    expect(change.mock.calls[0][1].get()).toEqual(['a', 'b']);
  });
});
